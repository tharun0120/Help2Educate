import React, { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, selectUser, signOut } from "../features/users/userSlice";
import { toast } from "react-toastify";

function NavBar(props) {
  const { isLoggedIn, isSuccess } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn, isSuccess]); //eslint-disable-line

  const onSignOut = () => {
    dispatch(signOut());
    if (isLoggedIn) {
      toast.success("Logged out Successfully!!!");
      dispatch(clearState());
    }
  };
  return (
    <Navbar className="d-flex justify-content-md-between" expand="sm">
      <div>
        <Navbar.Brand href="" style={{ color: "white", fontWeight: "700" }}>
          Help2Educate
        </Navbar.Brand>
      </div>

      <div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="me-auto">
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
            &nbsp;&nbsp;
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
            &nbsp;&nbsp;
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
            &nbsp;&nbsp;
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
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onSignOut();
                  }}
                  style={{
                    color: "#153A2D",
                    fontWeight: "600",
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    lineHeight: "16px",
                  }}>
                  Log Out
                </button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
