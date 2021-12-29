import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import imag from "./Assets/present-5442902_1920.png";
import image from "./Assets/pencils.png";

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [donation, setDonation] = useState();
  useEffect(() => {
    const getDonation = async () => {
      const response = await fetch(`/api/donations/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response) {
        await response.json().then((data) => [setDonation(data)]);
      } else history.push("/nope");
    };
    getDonation();
  }, []); //eslint-disable-line
  return (
    <Container
      fluid="full"
      style={{ backgroundColor: "#153A2D"}}>
      <NavBar />
      <Container fluid="xxl">
        <Row>
          <Col md={8} sm={12} className="order-xs-2 px-md-5 mt-3">
            <h1 style={{ color: "white", fontWeight: "600" }}>Details</h1>
            <Carousel variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image}
                  alt="First slide"
                  style={{ maxHeight: "300px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image}
                  alt="Second slide"
                  style={{ maxHeight: "300px" }}
                />
              </Carousel.Item>
            </Carousel>
            <div
              className="info"
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "10px",
              }}>
              <div className="h2 itemName">{donation?.item_name}</div>
              <br />
              <div className="donorName">
                Donor Name : &nbsp; {donation?.donor_name}
              </div>
              <div className="cat">
                Category : &nbsp; {donation?.item_type}
              </div>
              <div className="addr">Address : &nbsp; {donation?.address}</div>
              <div className="email">Email : &nbsp; {donation?.email}</div>
              <div className="phone">Phone : &nbsp; {donation?.contact}</div>
            </div>
            {/* <div className="sendMail">
              <div
                className="h2"
                style={{ marginTop: "10px", marginBottom: "10px" }}>
                Send Mail
              </div>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter your mail id"
                style={{ marginTop: "10px", marginBottom: "10px" }}></input>
              <textarea
                className="form-control"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Type in description"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}></textarea>
              <div className="btn btn-warning">Send</div>
            </div> */}
          </Col>

          <Col
            md={4}
            sm={12}
            className=""
            style={{ backgroundColor: "#153A2D" }}>
            <div
              className="d-flex align-items-center">
              <div>
                <img src={imag} className="img-fluid" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </Container>
  );
};

export default Detail;
