import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imag from "../Assets/post.png";

function LPSection3() {
  return (
    <div>
      <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
        <Container fluid="xxl">
          <Row className="py-3">
            <Col
              md={7}
              sm={12}
              style={{ color: "white" }}
              className="d-flex mt-sm-3 py-5 align-items-center pe-md-4 pe-xl-4 pe-xxl-4">
              <div className="ps-2">
                <h1>About Us</h1>
                <h3 className="my-3">
                  Help2Educate is a charitable organisation headquartered at
                  Banglore, India and operating throughout India since 2019 with
                  a vision of satisifying educational needs of the needy.
                </h3>
                <div
                  className="d-flex flex-row justify-content-around mt-5"
                  style={{ width: "100%" }}>
                  <p
                    className="d-flex flex-column align-items-center"
                    style={{ lineHeight: "2px" }}>
                    <h1>16</h1>
                    <div>Centers</div>
                  </p>
                  <p
                    className="d-flex flex-column align-items-center"
                    style={{ lineHeight: "2px" }}>
                    <h1>98</h1>
                    <div>Volunteers</div>
                  </p>
                  <p
                    className="d-flex flex-column align-items-center"
                    style={{ lineHeight: "2px" }}>
                    <h1>10</h1>
                    <div>Programs</div>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={5} sm={12}>
              <img src={imag} alt="" className="img-fluid my-4" />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default LPSection3;
