import './App.css';
import Footer from './components/layouts/footer/Footer';
import Header from './components/layouts/header/header';
import Home from './components/home/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/products/productdetail/ProductDetail';
import ProductSearch from './components/products/ProductSearch';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import { useEffect, useState } from 'react';
import store from './utils/Store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/profile/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/updateProfile/UpdateProfile';
import UpdatePassword from './components/user/updatePassword/UpdatePassword';
import ForgotPassword from './components/user/forgotPassword/ForgotPassword';
import ResetPassword from './components/user/resetPassword/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/shipping/Shipping';
import ConfirmOrder from './components/cart/confirmOrder/ConfirmOrder';
import Payment from './components/cart/payment/Payment';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/orderSuccess/OrderSuccess';
import UserOrders from './components/order/userOrders/UserOrders';
import OrderDetail from './components/order/orderDetail/OrderDetail';
import Dashboard from './components/admin/dashboard/Dashboard';
import ProductList from './components/admin/product_list/ProductList';
import NewProduct from './components/admin/new_product/NewProduct';
import UpdateProduct from './components/admin/updateProduct/UpdateProduct';
import OrderList from './components/admin/order_list/OrderList';
import UpdateOrder from './components/admin/update_order/UpdateOrder';
import UserList from './components/admin/user_list/UserList';
import UpdateUser from './components/admin/update_user/UpdateUser';
import ReviewList from './components/admin/review_list/ReviewList';

function App() {

  const [stripeApiKey, setStripeApiKey]= useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
          <div className='container container-fluid'>
            <ToastContainer theme='dark'/>
            <Routes>
              <Route path='/' element= {<Home/>} />
              <Route path='/product/:id' element= {<ProductDetail/>} />
              <Route path='/search/:keyword' element= {<ProductSearch/>} />
              <Route path='/login' element= {<Login/>} />
              <Route path='/register' element= {<Register/>} />
              <Route path='/myprofile' element= {<ProtectedRoute><Profile/></ProtectedRoute> } />
              <Route path='/myprofile/update' element= {<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
              <Route path='/myprofile/update/password' element= {<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
              <Route path='/password/forgot' element= {<ForgotPassword/>} />
              <Route path='/password/reset/:token' element= {<ResetPassword/>} />
              <Route path='/cart' element= {<Cart/>} />
              <Route path='/shipping' element= {<ProtectedRoute><Shipping/></ProtectedRoute>} />
              <Route path='/order/confirm' element= {<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
              {stripeApiKey &&
              <Route path='/payment' element= {<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>} />}
              <Route path='/order/success' element= {<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
              <Route path='/myorders' element= {<ProtectedRoute><UserOrders/></ProtectedRoute>} />
              <Route path='/order/:id' element= {<ProtectedRoute><OrderDetail/></ProtectedRoute>} />
            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route path='admin/dashboard' element= {<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
            <Route path='admin/products' element= {<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} />
            <Route path='admin/product/create' element= {<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} />
            <Route path='admin/product/:id' element= {<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />
            <Route path='admin/orders' element= {<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>} />
            <Route path='admin/order/:id' element= {<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />
            <Route path='admin/users' element= {<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>} />
            <Route path='admin/user/:id' element= {<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />
            <Route path='admin/reviews' element= {<ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute>} />


          </Routes>
          <Footer/> 
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
