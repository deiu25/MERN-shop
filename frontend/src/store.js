import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { productReducers } from './reducers/productReducers';

const reducer = combineReducers({
    products: productReducers,
});

let initialState = {};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
