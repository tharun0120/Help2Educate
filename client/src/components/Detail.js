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

    // if (donation) {
    //   donation?.images.forEach((img) => {
    //     tempImagesStore.push(arrayBufferToBase64(img));
    //   });
    // }
  }, []); //eslint-disable-line

  const arrayBufferToBase64 = (buffer) => {
    if (buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer.data));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      const temp = window.btoa(binary);
      // console.log(temp);
      // image = temp;
      return temp;
      // console.log(images);
      // return temp;
    }
  };

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
            <div className="col-lg-9 col-md-12">
              <Carousel variant="dark">
                {donation ? (
                  donation?.images.map((item) => {
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={`data:image/png;base64,${arrayBufferToBase64(
                            item
                          )}`}
                          alt="First slide"
                          style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    );
                  })
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt="First slide"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </Carousel.Item>
                )}
                {/* <Carousel.Item>
                  <img
                    className="d-block "
                    src={image}
                    alt="First slide"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block"
                    src={image}
                    alt="Second slide"
                    style={{ maxHeight: "300px" }}
                  />
                </Carousel.Item> */}
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
                  fontSize: "1.5rem",
                }}>
                <h2
                  className="itemName"
                  style={{ textAlign: "center", fontSize: "2rem" }}>
                  {donation?.item_name}
                </h2>
                <br />
                {/* <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}>
                  <div>
                    <label>Donor Nme: </label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.donor_name}
                    </span>
                  </div>
                  <div>
                    <label>Categor: </label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.item_type}
                    </span>
                  </div>
                  <div>
                    <label>Descripion: </label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.description}
                    </span>
                  </div>
                  <div>
                    <label>Address </label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.address}
                    </span>
                  </div>
                  <div>
                    <label>Email: /label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.email}
                    </span>
                  </div>
                  <div>
                    <label>Contact </label>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.contact}
                    </span>
                  </div>
                </div> */}
                <Row className="g-2">
                  <Col
                    md
                    className="mb-3"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "start",
                    }}>
                    <label>Donor Name </label>
                    <label>Category</label>
                    <label>Descripion </label>
                    <label>Address </label>
                    <label>Email </label>
                    <label>Contact </label>
                  </Col>
                  <Col
                    md
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.donor_name}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.item_type}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.description}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.address}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.email}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {donation?.contact}
                    </span>
                  </Col>
                </Row>
              </div>

              {/* <div className="sendMail">
                <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Send Mail
                </h2>
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
            </div>
            <Row>
              <Col md sm={12}>
                <img src={imag} alt="" className="img-fluid my-4" />
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Detail;
