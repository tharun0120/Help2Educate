import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function ErrorPage() {
  return (
    <section>
      <Container
        fluid="full"
        style={{ backgroundColor: "#153A2D", height: "100vh" }}>
        <Container fluid="xxl" style={{ height: "100%" }}>
          <div
            className="d-flex flex-column align-items-center justify-content-center my-auto"
            style={{ height: "100%", marginTop: "50%", marginEnd: "50%" }}>
            <h1 style={{ color: "#FFF", textAlign: "center" }}>
              Seems Like you are lost.Let's get back home
            </h1>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                height: "",
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
                  width: "",
                  marginLeft: "50%",
                }}>
                Home
              </Button>
            </Link>
          </div>
        </Container>
      </Container>
    </section>
  );
}

export default ErrorPage;
