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

      <Container className="content" style={{ padding: "1vmin" }}>
        <NavBar />
        <h1 style={{ color: "white", fontWeight: "600" }}>Details</h1>
        <div
          className="d-flex flex-row justify-content-center pb-5"
          style={{ color: "white", fontWeight: "600", display: "block" }}>
          <Container>
            <Col>
              <Carousel
                variant="dark"
                style={{ width: "300px", height: "300px" }}>
                {donation ? (
                  donation?.images.map((item) => {
                    return (
                      <Carousel.Item>
                        { }
                        <img
                          className="d-block "
                          src={`data:image/png;base64,${arrayBufferToBase64(
                            item
                          )}`}
                          alt="First slide"
                          style={{ maxHeight: "300px", objectFit: "contain" }}
                        />
                      </Carousel.Item>
                    );
                  })
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block "
                      src={image}
                      alt="First slide"
                      style={{ maxHeight: "300px", objectFit: "contain" }}
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
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}>
                <div
                  className="info"
                  style={{
                    width: "90%",
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
                  <Container>
                    <Row>
                      <Col sm={4}>
                        Donor Name
                      </Col>
                      <Col sm={8}>
                        {donation?.donor_name}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        Category
                      </Col>
                      <Col sm={8}>
                        {donation?.item_type}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        Description
                      </Col>
                      <Col sm={8}>
                        {donation?.description}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        Address
                      </Col>
                      <Col sm={8}>
                        {donation?.address}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        Email
                      </Col>
                      <Col sm={8}>
                        {donation?.email}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        Contact
                      </Col>
                      <Col sm={8}>
                        {donation?.contact}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
          </Container>
        </div>
      </Container>
    </Container>
  );
};

export default Detail;
