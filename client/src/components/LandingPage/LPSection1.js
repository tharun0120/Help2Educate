import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import image from "../Assets/friends.png";
import NavBar from "../NavBar";
import { Fade } from "react-reveal";

function LPSection1() {
  return (
    <div>
      <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
        <Container fluid="xxl">
          <NavBar name="HOM" />
          <Row className="mt-3">
            <Col
              md={7}
              sm={12}
              style={{ color: "white" }}
              className="d-flex mt-xs-3">
              <div className="align-self-center justify-content-sm-center mx-2">
                <h1>Help2Educate</h1>
                <h4 className="my-3  text-xs-center">
                  An initative to support the needful and upraise them with the
                  essentials for their education
                </h4>
                <Button
                  className="btn btn-primary mt-2"
                  style={{
                    backgroundColor: "#FFC107",
                    borderColor: "#FFC107",
                    color: "#153A2D",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}>
                  Know More
                </Button>
              </div>
            </Col>
            <Col md={5} sm={12}>
              <Fade right>
                <img src={image} alt="" className="img-fluid my-4" />
              </Fade>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default LPSection1;
