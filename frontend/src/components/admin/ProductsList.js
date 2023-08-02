import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { getAdminProducts, clearErrors } from '../../actions/productActions';

export const ProductsList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error])

    const setProducts = () => {
        const data = []

        products.forEach(product => {
            data.push({
                ProductId: product._id,
                Name: product.name,
                Price: product.price,
                Stock: product.stock,
                action: <>
                    <Link to={`/admin/products/${product._id}`} className="btn btn-primary">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger mx-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
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
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Link to={`/admin/products/${product._id}`} className="btn btn-primary">
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <button className="btn btn-danger mx-2">
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