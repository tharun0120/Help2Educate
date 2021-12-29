import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import imag from "./Assets/game.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser, signUp, clearState } from "../features/users/userSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";
// import Footer from "./Footer";

function SignUpPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isError, isSuccess, isFetching, error } = useSelector(selectUser); //isfetching
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registered Successfully!!!");
      history.push("/");
    }
    if (isError) {
      toast.error(error);
      if (error) {
        toast.error(error);
        return dispatch(clearState());
      }
      error.errors.map((error) => {
        return toast.error(error);
      });
      dispatch(clearState());
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const setUser = (firstName, lastName, email, password) => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signUp(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      toast.warn("Please enter a user name");
      return;
    }

    if (!lastName) {
      toast.warn("Please enter a user name");
      return;
    }

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Password does not match");
      return;
    }

    setUser(firstName, lastName, email, password);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return isFetching ? (
    <Loading />
  ) : (
    <section>
      <Container
        fluid="full"
        style={{ backgroundColor: "#153A2D", height: "100vh" }}>
        <Container fluid="xxl">
          <Row>
            <Col md={8} sm={12} className="order-xs-2 px-md-5">
              <div
                className="d-flex align-items-md-center"
                style={{ height: "100%", width: "100%" }}>
                <div className="" style={{ width: "100%" }}>
                  <h2 className="my-3" style={{ color: "white" }}>
                    Let's get you Onboard!
                  </h2>
                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SUPFName"
                      type="Text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      First Name
                    </label>
                  </Form.Floating>

                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SUPLName"
                      type="Text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      Last Name
                    </label>
                  </Form.Floating>

                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SUPEmail"
                      type="Email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      Email Address
                    </label>
                  </Form.Floating>

                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SUPPassword"
                      type="Password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      Password
                    </label>
                  </Form.Floating>

                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SUPCnfrmPassword"
                      type="Password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      Confirm Password
                    </label>
                  </Form.Floating>
                  <Button
                    className="btn btn-primary mt-2"
                    onClick={onSubmit}
                    style={{
                      backgroundColor: "#FFC107",
                      borderColor: "#FFC107",
                      color: "#153A2D",
                      fontWeight: "600",
                      fontSize: "20px",
                      width: "100%",
                    }}>
                    Sign Up
                  </Button>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      height: "100%",
                      width: "100%",
                    }}>
                    <Button
                      className="btn btn-primary mt-2"
                      style={{
                        backgroundColor: "#FFC107",
                        borderColor: "#FFC107",
                        color: "#153A2D",
                        fontWeight: "600",
                        fontSize: "20px",
                        width: "100%",
                      }}>
                      Home
                    </Button>
                  </Link>
                  <center>
                    <i
                      className=""
                      style={{
                        fontWeight: "600",
                        color: "#FFF",
                        textAlign: "center",
                      }}>
                      <br />
                      <Link
                        to="/signin"
                        style={{ textDecoration: "none", color: "#FFF" }}>
                        Aldready have an account ? Sign In.
                      </Link>
                    </i>
                  </center>
                </div>
              </div>
            </Col>

            <Col
              md={4}
              sm={12}
              className=""
              style={{ backgroundColor: "#153A2D" }}>
              <div
                className="d-flex align-items-center"
                style={{ height: "100vh" }}>
                <div>
                  <img src={imag} className="img-fluid" alt="Gaming man" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* <Footer /> */}
    </section>
  );
}

export default SignUpPage;
