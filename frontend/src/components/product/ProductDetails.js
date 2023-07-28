import '@fortawesome/fontawesome-free/css/all.css';
import { toast } from 'react-toastify';
import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { Loader } from "../leyout/Loader";
import { MetaData } from "../leyout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { useParams } from "react-router-dom";
import ListReviews from '../review/ListReviews';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProductDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [modalShow, setModalShow] = useState(false);
  
  const notifyError = (message) => {
    toast.error(message);
  };

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const { loading, error, product, rating: productRating } = useSelector(state => state.productDetails) || {};
  const { user } = useSelector(state => state.auth) || {};
  const { error: reviewError, success } = useSelector(state => state.newReview) || {};  

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      notifyError(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      notifySuccess('Review posted successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, error, id, reviewError, success]);

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');
  
    stars.forEach((star, index) => {
      star.starValue = index + 1;
  
      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
  
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');
  
            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }
  
        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }
  
        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();
  
    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', id);
  
    dispatch(newReview(formData));
    setModalShow(false);
  }

const addToCart = () => {
  dispatch(addItemToCart(id, quantity));
  notifySuccess('Item Added to Cart');
};

const handleRating = (rate) => {
  setRating(rate);
};

  return (
    <>
        {loading ? <Loader /> : (
            <>
                <MetaData title={product.name} />
                <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <Carousel pause='hover'>
                            {product.images && product.images.map(image => (
                                <Carousel.Item key={image.public_id}>
                                    <img className="d-block w-100" src={image.url} alt={product.title} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product # {product._id}</p>

                        <hr />

                        <div className="rating-outer">
                          {
                            [...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <i
                                  key={i}
                                  className={
                                    `bi ${ratingValue <= product.ratings ? 'bi-star-fill' : 'bi-star'}`
                                  }
                                ></i>
                              );
                            })
                          }
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                        <hr />

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                            <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <Button type="Button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</Button>

                        <hr />

                        <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                        <>
                            {user ? (
                                <Button id="review_btn" className="btn btn-primary d-inline mt-4" onClick={() => setModalShow(true)}>
                                    Submit Your Review
                                </Button>
                            ) : (
                                <div className="alert alert-danger mt-5" type='alert'>
                                    Login to post your review.
                                </div>
                            )}
                            <Modal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                backdrop="static"
                                keyboard={false}
                                >
                                <Modal.Header closeButton>
                                  <Modal.Title >Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <ul className="stars" >
                                      {[...Array(5)].map((star, i) => {
                                          return <li className={`star ${rating > i ? 'orange' : ''}`} onClick={() => handleRating(i + 1)}><i className="fa fa-star"></i></li>
                                      })}
                                  </ul>

                                      <textarea
                                          name="review"
                                          id="review" className="form-control mt-3"
                                          value={comment}
                                          onChange={(e) => setComment(e.target.value)}
                                      >
                                      </textarea>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={() => setModalShow(false)}>
                                      Close
                                  </Button>
                                  <Button variant="primary" onClick={reviewHandler}>Submit</Button>
                                </Modal.Footer>
                             </Modal>
                        </>

                    </div>
                </div>

                {product.reviews && product.reviews.length > 0 && (
                    <ListReviews reviews={product.reviews} />
                )}

            </>
        )}
    </>
  );
};