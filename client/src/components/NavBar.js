import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signOut } from "../features/users/userSlice";
import { toast } from "react-toastify";

function NavBar(props) {
  const { user, isSuccess } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showlogin, setshowlogin] = useState(true);

  useEffect(() => {
    if (user) setshowlogin(true);
    if (isSuccess) setshowlogin(false);
  }, [user, showlogin]); //eslint-disable-line

  const onSignOut = () => {
    dispatch(signOut());
    if (isSuccess) {
      setshowlogin(true);
      toast.success("Logged out Successfully!!!");
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
              {user && showlogin ? (
                <Link
                  to="/signin"
                  style={{ color: "#153A2D", textDecoration: "none" }}>
                  <button
                    onClick={() => {
                      console.log(showlogin);
                      setshowlogin(false);
                    }}
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
                    console.log(showlogin);
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
