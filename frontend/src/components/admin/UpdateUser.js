import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { MetaData } from "../leyout/MetaData";
import { Sidebar } from "./Sidebar";

import { toast } from "react-toastify";

import { updateUser, clearErrors, getUserDetails } from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

export const UpdateUser = () => {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        role: ""
    });    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const { id: userId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.user);

    const notifyError = (message) => {
        toast.error(message);
    };

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else if (!loading && user && user.name && user.email && user.role) {
            setFormState({
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
    
        if (error) {
            notifyError(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            notifyError(updateError);
            dispatch(clearErrors());
        }
    
        if (isUpdated) {
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    
    }, [dispatch, error, isUpdated, navigate, updateError, user, userId, loading]);

    const submitHandler = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.set("name", formState.name);
        formData.set("email", formState.email);
        formData.set("role", formState.role);
    
        dispatch(updateUser(user._id, formData));
    };    
    
  return (
    <>
        <MetaData title="Update User" />
        <div className="row">
            <div className="col-12 col-md-2 sidebar-no-margin">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={formState.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={formState.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role_field">Role</label>

                                <select
                                    id="role_field"
                                    className="form-control"
                                    name='role'
                                    value={formState.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn update-btn btn-block mt-4 mb-3"
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );  
}
