import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MetaData } from "../leyout/MetaData";

import { toast } from "react-toastify";

import { forgotPassword, clearErrors } from "../../actions/userActions";

export const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notifyError = (message) => {
        toast.error(message);
        }

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    useEffect(() => {
                
                if (error) {
                    notifyError(error);
                    dispatch(clearErrors());
                }
        
                if (message) {
                    toast.success(message);
                    navigate("/login");
                }
            }
        , [dispatch, error, message, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("email", email);

        dispatch(forgotPassword(formData));
    }

    return (
        <>  
            <MetaData title={"Forgot Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Send Email
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}