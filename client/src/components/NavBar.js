import React, { useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, selectUser, signOut } from "../features/users/userSlice";
import { toast } from "react-toastify";

function NavBar(props) {
  const { isLoggedIn, isSuccess, user } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => { }, [isLoggedIn, isSuccess]); //eslint-disable-line

  const onSignOut = () => {
    dispatch(signOut());
    if (isLoggedIn) {
      toast.success("Logged out Successfully!!!");
      dispatch(clearState());
    }
  };
  return (
    <Navbar
      className="d-flex justify-content-md-between navbar-dark"
      expand="sm">
      <div>
        <Navbar.Brand href="" style={{ color: "white", fontWeight: "700" }}>
          Help2Educate
        </Navbar.Brand>
      </div>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link
            href=""
            style={{
              color: props.name === "HOM" ? "orange" : "white",
              fontWeight: "600",
            }}>
            <Link
              style={{
                textDecoration: "none",
                color: props.name === "HOM" ? "orange" : "white",
              }}
              to="/">
              Home
            </Link>
          </Nav.Link>{" "}
          <Nav.Link
            href=""
            style={{
              color: props.name === "DRP" ? "orange" : "white",
              fontWeight: "600",
            }}>
            <Link
              style={{
                textDecoration: "none",
                color: props.name === "DRP" ? "orange" : "white",
              }}
              to="/donate">
              Donate
            </Link>
          </Nav.Link>{" "}
          <Nav.Link
            href=""
            style={{
              color: props.name === "FRP" ? "orange" : "white",
              fontWeight: "600",
            }}>
            <Link
              style={{
                textDecoration: "none",
                color: props.name === "FRP" ? "orange" : "white",
              }}
              to="/receive">
              Recieve
            </Link>
          </Nav.Link>{" "}
          <Nav.Link href="">
            {!isLoggedIn ? (
              <Link
                to="/signin"
                style={{ color: "#153A2D", textDecoration: "none" }}>
                <button
                  className="btn btn-primary"
                  style={{
                    color: "#153A2D",
                    fontWeight: "600",
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    lineHeight: "16px",
                  }}>
                  Login
                </button>
              </Link>
            ) : (
              <div>
                <Button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#account"
                  style={{
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    color: "#153A2D",
                    fontWeight: "600",
                    lineHeight: "16px",
                  }}>
                  Account
                </Button>
                <div
<<<<<<< HEAD
                  class="modal fade"
                  id="account"
                  // data-bs-backdrop="static"
                  // data-bs-keyboard="false"
=======
                  className="modal fade"
                  id="account"
>>>>>>> 1d3b511d91fd5ec8ba94c7d9bf886601ad85e300
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true">
<<<<<<< HEAD
                  <div className="modal-dialog">
                    <div
                      className="modal-content"
                      style={{ backgroundColor: "#153A2D", color: "white" }}>
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Hello, {user?.displayName}!
                        </h5>
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <table width="100%" style={{ fontSize: "large" }}>
=======
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content"
                      style={{ backgroundColor: '#153A2D', color: 'white' }}>
                      <div className="modal-header">
                        <h5 className="modal-title">Hello, {"Jacob"}!</h5>
                      </div>
                      <div className="modal-body">
                        <table width="100%" style={{ fontSize: 'large' }}>
>>>>>>> 1d3b511d91fd5ec8ba94c7d9bf886601ad85e300
                          <tr>
                            <th width="50%"></th>
                            <th width="50%"></th>
                          </tr>
                          <tr>
                            <td className="fname">First Name</td>
                            <td className="fname">{user?.firstName}</td>
                          </tr>
                          <tr>
                            <td className="lname">Last Name</td>
                            <td className="lname">{user?.lastName}</td>
                          </tr>
                          <tr>
                            <td className="addr">Address</td>
                            <td className="addr">
                              <Button
                                className="btn btn-warning"
                                style={{
                                  backgroundColor: "#FFC107",
                                  borderColor: "#FFC107",
                                  color: "#153A2D",
                                  fontWeight: "600",
                                  lineHeight: "16px",
                                }}>
                                Add Address
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="mail">E-Mail</td>
                            <td className="mail">{user?.email}</td>
                          </tr>
                          <tr>
                            <td className="phone">Phone</td>
                            <td className="phone">
                              <Button
                                className="btn btn-warning"
                                style={{
                                  backgroundColor: "#FFC107",
                                  borderColor: "#FFC107",
                                  color: "#153A2D",
                                  fontWeight: "600",
                                  lineHeight: "16px",
                                }}>
                                Add Phone
                              </Button>
                            </td>
                          </tr>
                          {/* <tr>
                            <td>
                              <button
                                type="button"
                                class="btn btn-warning"
                                style={{
                                  backgroundColor: "#FFC107",
                                  borderColor: "#FFC107",
                                  color: "#153A2D",
                                  fontWeight: "600",
                                  lineHeight: "16px",
                                }}>
                                Register as Charity
                              </button>
                            </td>
                          </tr> */}
                        </table>
                      </div>
<<<<<<< HEAD
                      <div class="modal-footer">
                        <button
                          type="button"
=======
                      <div className="modal-footer">
                      <Button type="button"
>>>>>>> 1d3b511d91fd5ec8ba94c7d9bf886601ad85e300
                          class="btn btn-warning"
                          data-bs-dismiss="modal"
                          style={{
                            backgroundColor: "#FFC107",
                            borderColor: "#FFC107",
                            color: "#153A2D",
                            fontWeight: "600",
                            lineHeight: "16px",
                          }}>
                          Close
<<<<<<< HEAD
                        </button>
                        <button
                          type="button"
=======
                        </Button>
                        <Button type="button"
>>>>>>> 1d3b511d91fd5ec8ba94c7d9bf886601ad85e300
                          class="btn btn-warning"
                          onClick={onSignOut}
                          style={{
                            backgroundColor: "#FFC107",
                            borderColor: "#FFC107",
                            color: "#153A2D",
                            fontWeight: "600",
                            lineHeight: "16px",
                          }}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Nav.Link>
          {}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
