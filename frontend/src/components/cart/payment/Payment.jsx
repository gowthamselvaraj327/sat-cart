import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidateShipping } from "../shipping/Shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../../slices/CartSlice";
import MetaData from "../../../utils/MetaData";
import CheckOutSteps from "../checkoutsteps/CheckOutSteps";
import { Fragment, useEffect } from 'react';
import {createOrder} from '../../../actions/OrderActions';
import { clearOrderError } from "../../../slices/OrderSlice";

const Payment = () => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); 
    const { user } = useSelector(state => state.authState);
    const { items:cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error:orderError} = useSelector(state => state.orderState);
    const paymentData = {
        "amount" : Math.round(orderInfo.totalPrice * 100),
        "shipping":{
            "name" : user.name,
            "address": {
                "city": shippingInfo.city,  
                "postal_code": shippingInfo.postalCode,
                "country": shippingInfo.country,
                "state" : shippingInfo.state,
                "line1" : shippingInfo.address
                },
            "phone": shippingInfo.phoneNo
    }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(()=> {
        ValidateShipping(shippingInfo, navigate)
        if(orderError){
            toast(orderError, {
                position:toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=> {dispatch(clearOrderError())}
            })
        }
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled=true;
        try{
            const {data} = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method : {
                    card : elements.getElement(CardNumberElement),
                    billing_details : {
                        name : user.name,
                        email : user.email
                    }
                }
            })

            if(result.error){
                toast(result.error.message, {
                    type : 'error',
                    position : toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('#pay_btn').disabled=false;
            }else{
                if(result.paymentIntent.status === 'succeeded'){
                    toast('Payment Success', {
                        type : 'success',
                        position : toast.POSITION.BOTTOM_CENTER
                    })
                    order.paymentInfo ={
                        id : result.paymentIntent.id,
                        status : result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))
                    navigate('/order/success')
                }else {
                    toast('Please try again', {
                        type : 'warning',
                        position : toast.POSITION.BOTTOM_CENTER
                    })
                    document.querySelector('#pay_btn').disabled=false;
                }
            }

        }catch(error){
            
        }
    }
    

    return(
        <Fragment>
            <MetaData title={'Payment'}/>
            <CheckOutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"
            
                        />
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
        
                        />
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                            value=""
                        />
                        </div>
            
                    
                        <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        Pay - {`$${orderInfo && orderInfo.totalPrice}`}
                        </button>
            
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment;