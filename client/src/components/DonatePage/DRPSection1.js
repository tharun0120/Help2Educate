import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../NavBar";
import image from "../Assets/dob.png";

function DRPSection1() {
  return (
    <div>
      <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
        <Container fluid="xxl">
          <NavBar name="DRP" />

          <div className="d-flex flex-row justify-content-center">
            <div>
              <img src={image} className="img-fluid my-2" alt="" />
            </div>
          </div>

          <div
            className="d-flex flex-row justify-content-center pb-5"
            style={{ color: "white", fontWeight: "600" }}>
            <h3>
              <center>
                Our gratitude knows no bounds.
                <br />
                Thank you.
                <br />
                Please continue by filling some details about your donations.
              </center>
            </h3>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default DRPSection1;
