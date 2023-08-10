import { useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { getProductReviews, deleteReview, clearErrors} from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

export const ProductReviews = () => {

    const [productId, setProductId] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, reviews } = useSelector(state => state.productReviews);
    const { error: deleteError, isDeleted } = useSelector(state => state.review)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Review deleted successfully');
            navigate('/admin/reviews')
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, error, productId, deleteError, isDeleted, navigate])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

  return (
    <>
        <MetaData title={'Product Reviews'} />
        <div className="row">
            <div className="col-12 col-md-2 sidebar-no-margin">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <>
                    <h1 className="my-5">Product Reviews</h1>

                    <div className="row d-flex justify-content-center align-items-center flex-column">
                        <div className="col-12 col-md-5 mb-4">
                            <div className="form-group">
                                <label htmlFor="productId_field">Enter Product ID</label>
                                <input
                                    type="text"
                                    id="email_field"
                                    className="form-control"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-2 mt-4 mt-md-0 d-flex justify-content-center">
                            <button
                                id="search_button"
                                className="btn btn-primary mb-5"
                                onClick={submitHandler}
                            >
                                SEARCH
                            </button>
                        </div>
                    </div>

                    {loading ? <Loader /> : (
                        <>
                            {reviews && reviews.length > 0 ? (
                                <Table striped bordered hover responsive className="table-sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>RATING</th>
                                            <th>COMMENT</th>
                                            <th>USER</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {reviews && reviews.map(review => (
                                            <tr key={review._id}>
                                                <td>{review._id}</td>
                                                <td>{review.rating}</td>
                                                <td>{review.comment}</td>
                                                <td>{review.name}</td>

                                                <td>
                                                    <button
                                                        className="btn btn-danger py-1 px-2 ml-2"
                                                        onClick={() => deleteReviewHandler(review._id)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <h4 className="mt-5 text-center">No Reviews</h4>
                            )}
                        </>
                    )}
                </>
            </div>
        </div>
    </>
  )
}
