import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Modal,
  Row,
  Col,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  signOut,
  deleteUser,
  updateUser,
} from "../features/users/userSlice";
import { toast } from "react-toastify";
// import axios from "axios";

function NavBar(props) {
  const { isSuccess, user } = useSelector(selectUser);
  // const [thisUser, setThisUser] = useState(user);
  // console.log(user);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  // useEffect(() => {}, [thisUser]); //eslint-disable-line
  // useEffect(() => {
  //   dispatch(isLoggedIn());
  // }, []); //eslint-disable-line

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDeleteAccount = () => {
    dispatch(deleteUser());
    if (isSuccess) {
      toast.success("Account deleted successfully");
      setShow(false);
    }
    // axios
    //   .delete("/api/user/me", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     toast.success("Account deleted successfully");
    //     dispatch(clearState);
    //     setShow(false);
    //   });
  };

  const onAddAddress = () => {
    if (address) {
      dispatch(updateUser({ address: address }));
      if (isSuccess) {
        toast.success("Address added successfully");
        setAddress("");
        // setShow(false);
      }
    }
    // axios
    //   .patch(
    //     "/api/user/me",
    //     { address: address },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     toast.success("Address added successfully");
    //     setAddress("");
    //     setShow(false);
    //   });
    else toast.warn("Please enter the address");
  };
  const onAddContact = () => {
    if (contact) {
      dispatch(updateUser({ contact: contact }));
      if (isSuccess) {
        toast.success("Contact added successfully");
        setContact("");
        // setShow(false);
      }
    }
    // axios
    //   .patch(
    //     "/api/user/me",
    //     { contact: contact },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     toast.success("Contact added successfully");
    //     setContact("");
    //     setShow(false);
    //   });
    else toast.warn("Please enter the contact");
  };

  const onSignOut = () => {
    dispatch(signOut());
    if (isSuccess) {
      toast.success("Logged out Successfully!!!");
      handleClose();
    }
  };

  return (
    <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
      <Container fluid="xxl">
        <Navbar
          className="d-flex justify-content-md-between navbar-dark"
          expand="sm">
          <div>
            <Navbar.Brand href="" style={{ color: "white", fontWeight: "700" }}>
              Help2Educate
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse
            className="justify-content-end"
            style={{ display: "flex", alignItems: "center" }}>
            <Nav
              className="ml-auto"
              style={{ display: "flex", alignItems: "center" }}>
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
                  HOME
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
                  DONATE
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
                  RECEIVE
                </Link>
              </Nav.Link>{" "}
              <Nav.Link href="">
                {!props.currentUser ? (
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
                      onClick={handleShow}
                      style={{
                        backgroundColor: "#FFC107",
                        borderColor: "#FFC107",
                        color: "#153A2D",
                        fontWeight: "600",
                        lineHeight: "16px",
                      }}>
                      Account
                    </Button>
                    <Modal
                      show={show}
                      backdrop="static"
                      size="lg"
                      keyboard={false}
                      centered
                      onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Hello, {user?.displayName}!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row
                          g-2
                          style={{
                            textAlign: "start",
                            padding: "25px",
                            fontSize: "1.5rem",
                          }}>
                          <Col
                            md
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                            }}>
                            <label>First Name</label>
                            <label>Last Name</label>
                            <label>Email</label>
                            <label>Contact</label>
                            <label>Address</label>
                          </Col>
                          <Col
                            md
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                            }}>
                            <span>{user?.firstName}</span>
                            <span>{user?.lastName}</span>
                            <span>{user?.email}</span>
                            {user?.contact ? (
                              <span>{user?.contact}</span>
                            ) : (
                              <InputGroup>
                                <FormControl
                                  placeholder="Phone"
                                  aria-label="Recipient's username"
                                  aria-describedby=""
                                  value={contact}
                                  onChange={(e) => setContact(e.target.value)}
                                />
                                <Button
                                  variant="secondary"
                                  onClick={onAddContact}>
                                  ADD
                                </Button>
                              </InputGroup>
                            )}
                            {user?.address ? (
                              <span>{user?.address}</span>
                            ) : (
                              <InputGroup>
                                <FormControl
                                  placeholder="Address"
                                  aria-label="Recipient's username"
                                  aria-describedby=""
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                                <Button
                                  variant="secondary"
                                  onClick={onAddAddress}>
                                  ADD
                                </Button>
                              </InputGroup>
                            )}
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={onDeleteAccount}>
                          Delete Account
                        </Button>
                        <Button variant="primary" onClick={onSignOut}>
                          Logout
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* <div
                  class="modal fade"
                  id="account"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true">
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div
                      className="modal-content"
                      style={{ backgroundColor: "#153A2D", color: "white" }}>
                      <div className="modal-header">
                        <h5 className="modal-title">
                        Hello, {user?.displayName}!
                        </h5>
                      </div>
                      <div className="modal-body">
                      <table width="100%" style={{ fontSize: "large" }}>
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
                                onClick={onAddAddress}
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
                                onClick={onAddPhone}
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
                                </tr> 
                                </table>
                                </div>
                                <div className="modal-footer">
                                <Button
                                type="button"
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
                                </Button>
                        <Button
                          type="button"
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
                  </div> */}
                  </div>
                )}
              </Nav.Link>
              {}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
}

export default NavBar;
