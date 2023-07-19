import React, { Fragment, useEffect, useState } from "react";
import { MetaData } from "./leyout/MetaData";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Product } from "./product/Product";
import { Loader } from "./leyout/Loader";

export const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null); // NEW STATE

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.products);


  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      return setErrorMessage(error); // CHANGED TO USE setErrorMessage
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : errorMessage ? ( // NEW CONDITION TO CHECK IF THERE IS AN ERROR
          <div className="alert alert-danger">{errorMessage}</div> // NEW COMPONENT TO DISPLAY THE ERROR
        ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
