import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { MetaData } from "../leyout/MetaData";
import { Loader } from "../leyout/Loader";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Your Profile"} />

          <Container>
            <h2 className="mt-5 ml-5">My Profile</h2>
            <Row className="justify-content-around mt-5 user-info">
              <Col xs={12} md={3}>
                <figure className="avatar avatar-profile">
                  {user && user.avatar ? (
                    <Image
                      className="rounded-circle img-fluid"
                      src={user.avatar.url}
                      alt={user.name}
                    />
                  ) : (
                    <Loader />
                  )}
                </figure>
                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </Link>
              </Col>

              <Col xs={12} md={5}>
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                {user.role !== "admin" && (
                  <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                    My Orders
                  </Link>
                )}

                <Link
                  to="/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  Change Password
                </Link>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
