import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import imag from "./Assets/game.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  signIn,
  selectUser,
  clearState,
  // signInWithGoogle,
} from "../features/users/userSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";
// import Footer from "./Footer";

function SignInPage({ currentUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isFetching, error } =
    useSelector(selectUser); // isFetching
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      toast.success("Logged in Successfully");
      history.push("/");
    }
  }, [isSuccess]); //eslint-disable-line

  useEffect(() => {
    if (isError) {
      if (error) {
        if (error.error) {
          toast.error(error.error);
          return dispatch(clearState());
        }
        error.errors.map((error) => {
          return toast.error(error);
        });
      }
      dispatch(clearState());
    }
  }, [isError]); //eslint-disable-line

  const setUser = (email, password) => {
    // console.log(email, password);
    const user = {
      email,
      password,
    };
    dispatch(signIn(user));
    if (isSuccess) {
      toast.success("Logged in Successfully");
      history.push("/");
    }
  };

  // const signInGoogle = () => {
  //   dispatch(signInWithGoogle());
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    setUser(email, password);
    setEmail("");
    setPassword("");
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
                    Welcome Back
                  </h2>
                  <Form.Floating className="my-2">
                    <Form.Control
                      id="SINEmail"
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
                      id="SINPassword"
                      type="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <label
                      htmlFor="floatingInputCustom"
                      style={{ color: "darkgrey" }}>
                      Password
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
                    Sign In
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
                  {/* <Button
                    className="btn btn-primary mt-2"
                    onClick={signInGoogle}
                    style={{
                      backgroundColor: "#FFF",
                      borderColor: "black",
                      color: "#153A2D",
                      fontWeight: "600",
                      fontSize: "20px",
                      width: "100%",
                    }}>
                    Sign in with Google
                  </Button> */}

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
                        to="/signup"
                        style={{ textDecoration: "none", color: "#FFF" }}>
                        Don't have an account ? Sign Up.
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
        {/* <Footer /> */}
      </Container>
    </section>
  );
}

export default SignInPage;
