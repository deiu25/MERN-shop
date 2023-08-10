import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

export const ProductsList = () => {

    const notifyError = (message) => {
        toast.error(message);
      };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            navigate('/admin/products')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, error, deleteError, isDeleted, navigate])

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
        notifyError('Product deleted successfully');
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2 sidebar-no-margin">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <Table striped bordered hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products && products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}