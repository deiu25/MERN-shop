import "./App.css";
import { Home } from "./components/Home";
import { Footer } from "./components/leyout/Footer";
import { Header } from "./components/leyout/Header";

import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import { Payment } from "./components/cart/Payment";
import { OrderSuccessProcess } from "./components/cart/OrderSuccessProcess";

import { ListOrders } from "./components/order/ListOrders";
import { OrderDetails } from "./components/order/OrderDetails";

import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { useEffect, useState } from "react";
import axios from "axios";

import { loadUser } from "./actions/userActions";
import store from "./store";
import { Profile } from "./components/user/Profile";
import { PrivateComponent } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ProductDetails } from "./components/product/ProductDetails";

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  const stripePromise = loadStripe(stripeApiKey);
  
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
            <Route path="/payment" element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            } />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/orders/me" element={<PrivateComponent element={ListOrders} />} />
            <Route path="/order/:id" element={<PrivateComponent element={OrderDetails} />} />
            <Route path="/me" element={<PrivateComponent element={Profile} />} />
            <Route path="/me/update" element={<PrivateComponent element={UpdateProfile} />} />
            <Route path="/password/update" element={<PrivateComponent element={UpdatePassword} />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

