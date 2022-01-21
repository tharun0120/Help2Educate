import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section>
      <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
        <Container fluid="xxl">
          <Row
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: "15px",
              padding: "20px",
            }}>
            <Col md={6} xxl={6} xs={6}>
              <Link
                to="/attributions"
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "15px",
                  textDecoration: "none",
                }}>
                Attributions
              </Link>
            </Col>
            <Col md={6} xxl={6} xs={6} className="d-flex flex-row-reverse">
              Developer Contact
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Footer;
