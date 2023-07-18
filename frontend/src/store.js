import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { productReducers, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducer,
});

let initialState = {};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
