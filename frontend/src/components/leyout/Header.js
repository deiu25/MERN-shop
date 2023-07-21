import React, { Fragment } from "react";
import { Search } from "./Search";
import "../../App.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Dropdown } from "react-bootstrap";

export const Header = () => {
  const notifyError = (message) => {
    toast.error(message);
  };

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    notifyError("Logged out successfully");
  };

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const showDropdown = (e) => {
    setDropdownOpen(true);
  };

  const hideDropdown = (e) => {
    setDropdownOpen(false);
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              {/* <img src="./images/logo.png" /> */}
              <h1>Shop</h1>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>

          {user ? (
            <Dropdown
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
              show={dropdownOpen}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="custom-dropdown"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user && user.role !== "admin" ? (
                  <Dropdown.Item href="/orders/me">Orders</Dropdown.Item>
                ) : (
                  <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                )}
                <Dropdown.Item href="/me">Profile</Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};
