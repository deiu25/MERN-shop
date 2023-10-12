import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export const Product = ({ product, col }) => {
  const [quantity, setQuantity] = useState(1);
  const productName = product.name.padEnd(86, " ");
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-1 rounded">
        <Link to={`/product/${product._id}`}>
          <img
            className="card-img-top mx-auto"
            src={product.images[0].url}
            alt=""
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{productName}</Link>
          </h5>
          <div className="rating-outer">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <i
                  key={i}
                  className={`bi ${
                    ratingValue <= product.ratings ? "bi-star-fill" : "bi-star"
                  }`}
                ></i>
              );
            })}
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          <div className="price-and-cart-button">
            <p className="card-text">${product.price}</p>
            <AddToCartButton
              id={product._id}
              quantity={quantity}
              productStock={product.stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
