import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Home } from "./components/Home";
import { Footer } from "./components/leyout/Footer";
import { Header } from "./components/leyout/Header";

// Cart Imports
import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import { Payment } from "./components/cart/Payment";
import { OrderSuccessProcess } from "./components/cart/OrderSuccessProcess";

// Order Imports
import { ListOrders } from "./components/order/ListOrders";
import { OrderDetails } from "./components/order/OrderDetails";

// Auth or User Imports
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { Profile } from "./components/user/Profile";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";

// Admin Imports
import { Dashboard } from "./components/admin/Dashboard";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'

import { loadUser } from "./actions/userActions";
import store from "./store";

import { PrivateComponent } from "./components/route/ProtectedRoute";


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ProductDetails } from "./components/product/ProductDetails";
import { ProductsList } from "./components/admin/ProductsList";
import { NewProduct } from "./components/admin/NewProduct";


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/search/:keyword" element={<Home />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/cart/:id?" element={<Cart />}/>
            <Route path="/shipping" element={<PrivateComponent element={Shipping} />} />
            <Route path="/order/confirm" element={<PrivateComponent element={ConfirmOrder} />} />
            <Route path="/success" element={<PrivateComponent element={OrderSuccessProcess} />} />
             {stripeApiKey && (
              <Route path="/payment" element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PrivateComponent element={Payment} />
                </Elements>
              } />
            )}
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/me" element={<PrivateComponent element={Profile} />} />
            <Route path="/me/update" element={<PrivateComponent element={UpdateProfile} />} />
            <Route path="/password/update" element={<PrivateComponent element={UpdatePassword} />} />
            
            <Route path="/orders/me" element={<PrivateComponent element={ListOrders} />} />
            <Route path="/order/:id" element={<PrivateComponent element={OrderDetails} />} />
          </Routes>
          </div>
        <Routes>
            <Route path="/dashboard" isAdmin={true} element={<PrivateComponent element={Dashboard} />} />
            <Route path="/admin/products" isAdmin={true} element={<PrivateComponent element={ProductsList} />} />
            <Route path="/admin/product" isAdmin={true} element={<PrivateComponent element={NewProduct} />} />
        </Routes>
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
      <Footer />
    )}
    </div>
    </Router>
  );
}

export default App;

