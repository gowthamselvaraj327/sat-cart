import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from "../../actions/productActions";
import MetaData from "../../utils/MetaData";
import Loader from "../layouts/loader/Loader";
import Product from "../products/Product";
import './Home.css';
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';


const Home = () => { 

    const dispatch = useDispatch();

    const {products, loading, error, productsCount,resPerPage} = useSelector((state)=> state.productsState)
    const [currentPage, setcurrentPage]=useState(1);
    const setcurrentPageNo = (pageNo) => {
        setcurrentPage(pageNo);
    }
    useEffect(() => {
        if(error){
            return toast.error(error,{
                position:toast.POSITION.BOTTOM_CENTER,
            })

        }
        dispatch(getProducts(null, null, null, null, currentPage));
        
    }, [dispatch,error,currentPage]);

    return (
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <MetaData title={'Home'}/>
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        { products && products.map(product =>(
                            <Product col={3} key={product._id} product={product} />
                        ))}
                    </div>
                </section>
                {productsCount>0 && productsCount > resPerPage?
                <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setcurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                </div> : null
                }
            </Fragment>
        }
        </Fragment>
    )
}

export default Home;


