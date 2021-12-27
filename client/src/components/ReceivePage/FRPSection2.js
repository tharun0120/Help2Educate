import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import image from "../Assets/pencils.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getDonations,
  selectDonations,
  clearDonationState,
} from "../../features/donations/donationSlice";
import { Link } from "react-router-dom";

const FRPSection2 = () => {
  const dispatch = useDispatch();
  const { allDonations, isSuccess, isError, error } =
    useSelector(selectDonations);
  const donationKeys = Object.keys(allDonations);
  // console.log(allDonations);

  useEffect(() => {
    dispatch(getDonations());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isSuccess) {
      toast.success("Donations Fetched!!!");
    }
    if (isError) {
      toast.error(error);
      dispatch(clearDonationState());
      return;
    }
  }, [isSuccess, isError]); //eslint-disable-line

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
                    <Card className="mt-3">
                      <Card.Img variant="top" src={image} />
                      <Card.Body>
                        <Card.Title>{item.item_name}</Card.Title>
                        <Link to={`/donation/${item._id}`}>
                          <Button variant="warning">Know More</Button>
                        </Link>
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
