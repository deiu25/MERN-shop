import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";

import { CheckoutSteps } from './CheckoutSteps';
import React from 'react'
import { useSelector } from 'react-redux'

export const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);


    const navigate = useNavigate();

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
    
        console.log(data);
    
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    }

    const confirm = {
        address: shippingInfo.address,
        city: shippingInfo.city,
        phoneNo: shippingInfo.phoneNo,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
    }

    const checkoutHandler = () => {
        processToPayment();
    }

    return (
        <>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {confirm.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {confirm.address}, {confirm.city}, {confirm.postalCode}, {confirm.country}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <div key={item.product} className="cart-item my-1">
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} className='product-image' />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="cart_btn btn btn-primary btn-block" onClick={checkoutHandler}>Proceed to Payment</button>
                    </div>
                </div>
            </div>

        </>
    )
}