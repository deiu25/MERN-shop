import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants'

export const UsersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { error: deleteError, isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            navigate('/admin/users')
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, error, deleteError, isDeleted, navigate])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <>
          <MetaData title={'All Users'} />
          <div className="row">
              <div className="col-12 col-md-2 sidebar-no-margin">
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
                                              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
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