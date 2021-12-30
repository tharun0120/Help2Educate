import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import img from "../Assets/pencils.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDonations,
  selectDonations,
  clearDonationState,
} from "../../features/donations/donationSlice";
import { Link } from "react-router-dom";

const FRPSection2 = ({ currentUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { allDonations, isSuccess, isError, error } =
    useSelector(selectDonations);
  const donationKeys = Object.keys(allDonations);
  let image;

  const onKnowMore = (id) => {
    if (currentUser) history.push(`/donation/${id}`);
    else {
      toast.error("Login to Know More");
      history.push("/signin");
    }
  };

  useEffect(() => {
    dispatch(getDonations());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isSuccess) {
      // toast.success("Donations Fetched!!!");
    }
    if (isError) {
      toast.error(error);
      dispatch(clearDonationState());
      return;
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const arrayBufferToBase64 = (buffer) => {
    if (buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer.data));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      const temp = window.btoa(binary);
      // console.log(temp);
      image = temp;
    }
  };

  return (
    donationKeys &&
    donationKeys.map((type) => {
      return (
        <Container
          fluid="full"
          className="my-5"
          style={{ backgroundColor: "#FFF" }}
          key={type}>
          <Container fluid="xxl">
            <h3>{type}</h3>
            <Row xs={1} md={3} className="">
              {allDonations[type] &&
                allDonations[type].map((item) => (
                  <Col key={item._id}>
                    {arrayBufferToBase64(item.images[0])}
                    <Card className="mt-3">
                      {image ? (
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${image}`}
                        />
                      ) : (
                        <Card.Img variant="top" src={img} />
                      )}

                      <Card.Body>
                        <Card.Title>{item.item_name}</Card.Title>
                        <Button
                          variant="warning"
                          onClick={() => onKnowMore(item._id)}>
                          Know More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </Container>
      );
    })
  );
};

export default FRPSection2;
