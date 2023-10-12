import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../actions/cartActions';
import { FaCartPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

const AddToCartIcon = ({ id, quantity, productStock }) => {
    const dispatch = useDispatch();

    const notifySuccess = (message) => {
        toast.success(message);
    };

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        notifySuccess('Item Added to Cart');
    };

    return (
        <Button
            className={`cart_btn ${productStock === 0 ? 'disabled' : ''}`}
            onClick={addToCart}
            disabled={productStock === 0}
        >
            <FaCartPlus />
        </Button>
    );
}

export default AddToCartIcon;