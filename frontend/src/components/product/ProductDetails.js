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
  
            setRating(this.starValue); // Modificarea aici
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
}

const addToCart = () => {
  dispatch(addItemToCart(id, quantity));
  notifySuccess('Item Added to Cart');
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
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                        <hr />

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

                        <hr />

                        <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                        {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" onClick={() => setModalShow(true)}>Submit Your Review</button>
                            : <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>}

                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">

                            <div className={`modal fade ${modalShow ? 'show' : ''}`} id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true" style={{display: modalShow ? 'block' : 'none'}}>

                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <ul className="stars" >
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                </ul>

                                                <textarea
                                                    name="review"
                                                    id="review" className="form-control mt-3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                >

                                                </textarea>

                                                <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
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



// import { Carousel } from "react-bootstrap";
// import React, { useEffect } from "react";
// import { Loader } from "../leyout/Loader";
// import { MetaData } from "../leyout/MetaData";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductDetails, clearErrors, newReview } from "../../actions/productActions";
// import { useParams } from "react-router-dom";
// import { addItemToCart } from "../../actions/cartActions";


// export const ProductDetails = ({ match }) => {

//   const dispatch = useDispatch();

//   const [reviewText, setReviewText] = React.useState("");

//   const [quantity, setQuantity] = React.useState(1);
  
//   const notifyError = (message) => {
//     toast.error(message);
//   };

//   const notifySuccess = (message) => {
//     toast.success(message);
//   };

//   const rating = useSelector((state) => state.newReview?.rating);

//   const { id } = useParams();

//   const { loading, error, product } = useSelector(
//     (state) => state.productDetails
//   );

//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getProductDetails(id));

//     if (error) {
//       notifyError(error);
//       dispatch(clearErrors());
//     }

//     return () => {
//       dispatch(clearErrors());
//     };
//   }, [dispatch, error, id]);

//   const addToCartHandler = () => {
//     dispatch(addItemToCart(match.params.id, quantity));
//     notifySuccess("Item Added to Cart");
//   };

//   const incraseQty = () => {
//     const count = document.querySelector(".count");

//     if (count.valueAsNumber >= product.stock) return;

//     const qty = count.valueAsNumber + 1;
//     setQuantity(qty);
//   };

//   const decraseQty = () => {
//     const count = document.querySelector(".count");

//     if (count.valueAsNumber <= 1) return;

//     const qty = count.valueAsNumber - 1;
//     setQuantity(qty);
//   };

//   const handleReviewChange = (e) => {
//     setReviewText(e.target.value);
//   };

//   const reviewSubmitHandler = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.set("rating", rating);
//     formData.set("comment", reviewText);
//     formData.set("productId", match.params.id);

//     dispatch(newReview(formData));
//   };

//   const reviewHandler = () => {
//     document.querySelector(".star").addEventListener("click", function () {
//       document.querySelector(".star").classList.toggle("orange");
//     });
//   };

//   const setUserRatings = () => {
//     const stars = document.querySelectorAll(".star");

//     stars.forEach((star, index) => {
//       star.starValue = index + 1;

//       ["click", "mouseover", "mouseout"].forEach(function (e) {
//         star.addEventListener(e, showRatings);
//       });
//     });

//     function showRatings(e) {
//       stars.forEach((star, index) => {
//         if (e.type === "click") {
//           if (index < this.starValue) {
//             star.classList.add("orange");

//             setQuantity(index + 1);
//           } else {
//             star.classList.remove("orange");
//           }
//         }

//         if (e.type === "mouseover") {
//           if (index < this.starValue) {
//             star.classList.add("yellow");
//           } else {
//             star.classList.remove("yellow");
//           }
//         }

//         if (e.type === "mouseout") {
//           star.classList.remove("yellow");
//         }
//       });
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>

//           <MetaData title={product.name} />
//           <div className="row f-flex justify-content-around">
//             <div className="col-12 col-lg-5 img-fluid" id="product_image">
//               <Carousel pause="hover">
//                 {product.images &&
//                   product.images.map((image) => (
//                     <Carousel.Item key={image.public_id}>
//                       <img
//                         className="d-block w-100"
//                         src={image.url}
//                         alt={product.title}
//                       />
//                     </Carousel.Item>
//                   ))}
//               </Carousel>
//             </div>

//             <div className="col-12 col-lg-5 mt-5">
//               <h3>{product.name}</h3>
//               <p id="product_id">Product # {product._id}</p>

//               <hr />

//               <div className="rating-outer">
//                 <div
//                   className="rating-inner"
//                   style={{ width: `${(product.ratings / 5) * 100}%` }}
//                 ></div>
//               </div>
//               <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

//               <hr />

//               <p id="product_price">${product.price}</p>
//               <div className="stockCounter d-inline">
//                 <span
//                   className="btn btn-danger minus"
//                   onClick={decraseQty}
//                 >
//                   -
//                 </span>

//                 <input
//                   type="number"
//                   className="form-control count d-inline"
//                   value={quantity}
//                   readOnly
//                 />

//                 <span
//                   className="btn btn-primary plus"
//                   onClick={incraseQty}
//                 >
//                   +
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 id="cart_btn"
//                 className="btn btn-primary d-inline ml-4"
//                 disabled={product.stock === 0}
//                 onClick={addToCartHandler}
//               >
//                 Add to Cart
//               </button>

//               <hr />

//               <p>
//                 Status:{" "}
//                 <span
//                   id="stock_status"
//                   className={product.stock > 0 ? "greenColor" : "redColor"}
//                 >
//                   {product.stock > 0 ? "In Stock" : "Out of Stock"}
//                 </span>
//               </p>

//               <hr />

//               <h4 className="mt-2">Description:</h4>
//               <p>{product.description}</p>
//               <hr />
//               <p id="product_seller mb-3">
//                 Sold by: <strong>{product.seller}</strong>
//               </p>

//               {user ? (
//                 <button
//                 id="review_btn"
//                 type="button"
//                 className="btn btn-primary mt-4"
//                 data-toggle="modal"
//                 data-target="#ratingModal"
//                 onClick={() => {
//                   reviewHandler();
//                   console.log("review button clicked");
//                 }}
//               >
//                 Submit Your Review
//               </button>
              
//               ) : (
//                 <div className="alert alert-danger mt-5" type="alert">
//                   Login to post your review.
//                 </div>
//               )}

//               <div className="row mt-2 mb-5">
//                 <div className="rating w-50">
//                   <div
//                     className="modal fade"
//                     id="ratingModal"
//                     tabIndex="-1"
//                     role="dialog"
//                     aria-labelledby="ratingModalLabel"
//                     aria-hidden="true"
//                   >
//                     <div className="modal-dialog" role="document">
//                       <div className="modal-content">
//                         <div className="modal-header">
//                           <button
//                             type="button"
//                             className="close"
//                             data-dismiss="modal"
//                             aria-label="Close"
//                           >
//                             <span aria-hidden="true">&times;</span>
//                           </button>
//                           <h5
//                             className="modal-title"
//                             id="ratingModalLabel"
//                           >
//                             Submit Review
//                           </h5>
//                         </div>
//                         <div className="modal-body">
//                           <ul className="stars" onClick={setUserRatings}>
//                             <li className="star">
//                               <i className="bi bi-star"></i>
//                             </li>
//                             <li className="star">
//                               <i className="bi bi-star"></i>
//                             </li>
//                             <li className="star">
//                               <i className="bi bi-star"></i>
//                             </li>
//                             <li className="star">
//                               <i className="bi bi-star"></i>
//                             </li>
//                             <li className="star">
//                               <i className="bi bi-star"></i>
//                             </li>
//                           </ul>

//                           <textarea
//                             name="review"
//                             id="review"
//                             className="form-control mt-3"
//                             value={reviewText}
//                             onChange={handleReviewChange}
//                           ></textarea>

//                           <button
//                             className="btn my-3 float-right review-btn px-4 text-white"
//                             data-dismiss="modal"
//                             aria-label="Close"
//                             onClick={reviewSubmitHandler}
//                           >
//                             Submit
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* <ListReviews reviews={product.reviews} /> */}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };