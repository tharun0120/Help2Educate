import React from "react";
import imag from "../Assets/help.png";
import { Container, Col, Row } from "react-bootstrap";

function LPSection2() {
  return (
    <div>
      <Container fluid="xxl ">
        <Row className="mb-3">
          <Col md="5" sm="12">
            <img
              src={imag}
              alt=""
              className="img-fluid my-5"
              style={{ borderRadius: "50%" }}
            />
          </Col>

          <Col
            md="7"
            sm="12"
            className="d-flex align-items-center pe-md-4 pe-xl-4 pe-xxl-4"
            style={{ color: "#153A2D" }}>
            <div>
              <h1>Our Mission</h1>
              <h3 className="my-3">
                Our mission is to help to educate the underprevilaged by
                connecting them to people who would wish to donate used or new
                education based materials to those who are in need.
              </h3>
              <div
                className="d-flex flex-row justify-content-around mt-5"
                style={{ width: "100%" }}>
                <p
                  className="d-flex flex-column align-items-center"
                  style={{ lineHeight: "2px" }}>
                  <h1>18</h1>
                  <div>States</div>
                </p>
                <p
                  className="d-flex flex-column align-items-center"
                  style={{ lineHeight: "2px" }}>
                  <h1>1M</h1>
                  <div>Individuals</div>
                </p>
                <p
                  className="d-flex flex-column align-items-center"
                  style={{ lineHeight: "2px" }}>
                  <h1>2M</h1>
                  <div>Donations</div>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LPSection2;
