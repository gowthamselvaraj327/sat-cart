const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
    name:'product',
    initialState: {
        loading : false,
        product:{},
        isReviewSubmitted:false,
        isProductCreated : false,
        isProductDeleted: false,
        isProductUpdated: false,
        isReviewDeleted: false,
        reviews:[]
    },
    reducers:{
        productRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        productSuccess(state, action){
            return {
                ...state,
                loading : false,
                product:action.payload.product
            }
        },
        productFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        createReviewRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading : false,
                isReviewSubmitted:true
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearError(state, action){
            return{
                ...state,
                error:null
            }
        },
        clearReviewSubmitted(state, action){
            return {
                ...state,
                isReviewSubmitted:false
            }
        },
        clearProduct(state, action){
            return {
                ...state,
                product:{}
            }
        },
        newproductRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        newproductSuccess(state, action){
            return {
                ...state,
                loading : false,
                product:action.payload.product,
                isProductCreated: true
            }
        },
        newproductFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload,
                isProductCreated: false
            }
        },
        clearProductCreated(state, action){
            return {
                ...state,
                isProductCreated: false

            }
        },
        deleteproductRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteproductSuccess(state, action){
            return {
                ...state,
                loading : false,
                isProductDeleted: true
            }
        },
        deleteproductFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload,
                isProductDeleted: false
            }
        },
        clearProductDelted(state, action){
            return {
                ...state,
                isProductCreated: false

            }
        },

        updateProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        reviewsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading : false,
                reviews:action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading : false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload,
                isProductDeleted: false
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },
    }
})

const {actions, reducer} = productSlice;

export const {
    productRequest,
    productSuccess,
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newproductFail,
    newproductRequest,
    newproductSuccess,
    clearProductCreated,
    deleteproductRequest,
    deleteproductSuccess,
    deleteproductFail,
    clearProductDelted,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    clearProductUpdated,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearReviewDeleted

} = actions;

export default reducer;