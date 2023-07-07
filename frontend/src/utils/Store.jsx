import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productsReducer from '../slices/ProductsSlice';
import productReducer from '../slices/ProductSlice';
import authReducer from '../slices/AuthSlice';
import cartReducer from '../slices/CartSlice';
import orderReducer from '../slices/OrderSlice';
import userReducer from '../slices/UserSlice';


const reducer = combineReducers({
    productsState : productsReducer,
    productState : productReducer,
    authState : authReducer,
    cartState : cartReducer,
    orderState : orderReducer,
    userState : userReducer

})

const store = configureStore ({
    reducer,
    middleware:[thunk]
})

export default store;