import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react'
import { Link } from 'react-router-dom'

export const Product = ({product, col}) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.images[0].url}
              alt=''
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h5>
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
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
  )
}
