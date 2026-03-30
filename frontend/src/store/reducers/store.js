import {configureStore} from '@reduxjs/toolkit';
import { ProductReducer } from './ProductReducer';
import { errorReducer } from './errorReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { paymentMethodReducer } from './paymentMethodReducer';
import { adminReducer } from './adminReducer';

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];


const initialState = {
    carts: { cart: cartItems },
    auth: { user: user, selectUserCheckoutAddress },
};

export const store = configureStore({
    reducer:{
         products:ProductReducer,
         errors:errorReducer,
         carts:cartReducer,
         auth:authReducer,
         payment: paymentMethodReducer,
         admin:adminReducer,
    },
    preloadedState: initialState,
});

export default store;