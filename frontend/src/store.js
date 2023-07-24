import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { productReducers, productDetailsReducer } from './reducers/productReducers';
import { authReducer, userReducer } from './reducers/userReducers';

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer
});

let initialState = {};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
