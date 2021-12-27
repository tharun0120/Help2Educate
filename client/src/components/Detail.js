import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Carousel, Container } from "react-bootstrap";
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
      style={{ backgroundColor: "#153A2D", minWidth: "100%" }}>
      <Container fluid="xxl">
        <NavBar />

        <Container className="content" style={{ padding: "1vmin" }}>
          <h1 style={{ color: "white", fontWeight: "600" }}>Details</h1>
          <div
            className="d-flex flex-row justify-content-center pb-5"
            style={{ color: "white", fontWeight: "600", display: "block" }}>
            <div className="span3" style={{ maxWidth: "60%", minWidth: "60%" }}>
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
              <div className="sendMail">
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
              </div>
            </div>
            <div className="span6">
              <div className="d-flex flex-row justify-content-center">
                <img
                  src={imag}
                  alt=""
                  className="img-fluid my-2"
                  style={{ width: "25%", height: "50%" }}
                />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Detail;
