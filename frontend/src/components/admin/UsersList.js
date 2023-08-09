import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { allUsers, clearErrors } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants'

export const UsersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.allUsers);
    //const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        // if (isDeleted) {
        //     navigate('/admin/users')
        //     dispatch({ type: DELETE_USER_RESET })
        // }

    }, [dispatch, alert, error, navigate])

    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions:
                    <>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        }
        )

        return data;
    }

  return (
    <>
        <MetaData title={'All Users'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <>
                    <h1 className="my-5">All Users</h1>

                    {loading ? <Loader /> : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users && users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>

                                        <td>
                                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                                                <i className="fa fa-pencil"></i>
                                            </Link>
                                            <button className="btn btn-danger py-1 px-2 ml-2">
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
