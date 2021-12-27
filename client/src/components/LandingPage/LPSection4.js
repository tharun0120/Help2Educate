import React from "react";
import { Alert, Col, Container, Row, Button } from "react-bootstrap";
import imag from "../Assets/love.png";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import { Link } from "react-router-dom";

function LPSection4() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Container fluid="xxl ">
        <Row className="my-4">
          <Col
            md={7}
            sm={12}
            style={{ color: "#153A2D" }}
            className="d-flex mt-xs-3">
            <div className="align-self-center justify-content-sm-center mx-2">
              <h1>Help Us</h1>
              <h4 className="my-3  text-xs-center">
                Help us with our mission by donating or by refering a donor or a
                receiver about our page.
              </h4>
              <Link to="/DRP">
                <Button
                  className="btn btn-primary mt-2"
                  style={{
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    color: "#153A2D",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}>
                  Donate
                </Button>
              </Link>
              <CopyToClipboard text="Hello!">
                <Button
                  className="btn btn-primary mt-2 mx-3"
                  onClick={() => setShow(true)}
                  style={{
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    color: "#153A2D",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}>
                  Share
                </Button>
              </CopyToClipboard>
              <Alert show={show} variant="success" className="mt-2">
                <div className="d-flex flex-row justify-content-between">
                  <Alert.Heading>Copied Successfully!</Alert.Heading>
                  <Button
                    onClick={() => setShow(false)}
                    variant="outline-success">
                    Close
                  </Button>
                </div>
              </Alert>
            </div>
          </Col>
          <Col md={5} sm={12}>
            <img src={imag} alt="" className="img-fluid my-4" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LPSection4;
