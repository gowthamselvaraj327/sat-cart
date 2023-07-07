import axios from 'axios';
import { 
    adminProductsFail, 
    adminProductsRequest, 
    adminProductsSuccess, 
    productsFail, 
    productsRequest, 
    productsSuccess } from '../slices/ProductsSlice';
import { 
    createReviewFail, 
    createReviewRequest, 
    createReviewSuccess, 
    deleteReviewFail, 
    deleteReviewRequest, 
    deleteReviewSuccess, 
    deleteproductFail, 
    deleteproductRequest, 
    deleteproductSuccess, 
    newproductFail, 
    newproductRequest, 
    newproductSuccess, 
    productFail, 
    productRequest, 
    productSuccess, 
    reviewsFail, 
    reviewsRequest, 
    reviewsSuccess, 
    updateProductFail, 
    updateProductRequest, 
    updateProductSuccess, 

} from '../slices/ProductSlice';

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {
    try {
        dispatch(productsRequest())
        var link = `/api/v1/products?page=${currentPage}`;
        if (keyword){
            link += `&keyword=${keyword}`
        }
        if (price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category){
            link += `&category=${category}`
        }
        if (rating){
            link += `&ratings=${rating}`
        }
        const {data} = await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        dispatch(productsFail(error.response.data.message))
    }
    
}


export const getProduct = id => async (dispatch) => {
    try {
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
    
}
 

export const createReview = reviewData => async (dispatch) => {
    try {
        dispatch(createReviewRequest())
        const config = {
            headers : {
                'content-type' : 'application/json',
            }
        }
        const {data} = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message))
    }
    
}


export const getAdminProducts = async (dispatch) => {
    try {
        dispatch(adminProductsRequest())
        const {data} = await axios.get('/api/v1/admin/products');
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}
 

export const createNewProduct = productData => async (dispatch) => {
    try {
        dispatch(newproductRequest())
        const {data} = await axios.post('/api/v1/admin/product/new', productData);
        dispatch(newproductSuccess(data))
    } catch (error) {
        dispatch(newproductFail(error.response.data.message))
    }
    
}


export const deleteProduct = id => async (dispatch) => {
    try {
        dispatch(deleteproductRequest())
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteproductSuccess())
    } catch (error) {
        dispatch(deleteproductFail(error.response.data.message))
    }
    
}


export const updateProduct  =  (id, productData) => async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}

export const getReviews = id => async (dispatch) => {
    try {
        dispatch(reviewsRequest())
        const {data} = await axios.get(`/api/v1/admin/reviews`,{params:{id}});
        dispatch(reviewsSuccess(data))
    } catch (error) {
        dispatch(reviewsFail(error.response.data.message))
    }
    
}


export const deleteReview = (productId, id) => async (dispatch) => {
    try {
        dispatch(deleteReviewRequest())
        await axios.delete(`/api/v1/admin/review`,{params:{productId, id}});
        dispatch(deleteReviewSuccess())
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}