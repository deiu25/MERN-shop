import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:4000";

const root = createRoot(document.getElementById('root')); 
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);