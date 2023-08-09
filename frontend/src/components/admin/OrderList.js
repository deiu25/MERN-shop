import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

export const OrderList = ({history}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            navigate('/admin/orders')
            dispatch({ type: DELETE_ORDER_RESET })
        }
        
    }, [dispatch, alert, error, navigate, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        }
        )

        return data;
    }


    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <Table striped bordered hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>No of Items</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders && orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderItems.length}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.orderStatus && String(order.orderStatus).includes('Delivered')
                                                ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                                                : <p style={{ color: 'red' }}>{order.orderStatus}</p>
                                            }</td>

                                            <td>
                                                <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
                                                    <i className="fa fa-eye"></i>
                                                </Link>

                                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
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