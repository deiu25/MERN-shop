import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions';
import { Table } from 'react-bootstrap';


export const ListOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error])

    const setOrders = () => {
        const data = []

        orders.forEach(order => {
            data.push({
                OrderId: order._id,
                NumItems: order.orderItems.length,
                TotalPrice: order.totalPrice,
                Status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                OrderedOn: order.createdAt.substring(0, 10),
                Details: <Link to={`/order/${order._id}`} className="btn btn-primary">Details</Link>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <Loader /> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Num of Items</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Ordered On</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.orderItems.length}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderStatus && String(order.orderStatus).includes('Delivered')

                                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>
                                }</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>
                                    <Link to={`/order/${order._id}`} className="btn btn-primary">Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
