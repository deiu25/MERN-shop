import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { MetaData } from "../leyout/MetaData";

import { toast } from "react-toastify";

import { resetPassword, clearErrors } from "../../actions/userActions";

export const NewPassword = ({ match }) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notifyError = (message) => {
        toast.error(message);
        }

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    useEffect(() => {
                
                if (error) {
                    notifyError(error);
                    dispatch(clearErrors());
                }
        
                if (success) {
                    toast.success("Password updated successfully");
                    navigate("/login");
                }
            }, [dispatch, error, success, navigate]);
            
            const { token } = useParams();

            const submitHandler = (e) => {
              e.preventDefault();

        const formData = new FormData();
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, formData));
    }

    return (
        <>
            <MetaData title={"New Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}