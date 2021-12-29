import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function HistoryDonationCard(props) {
  return (
    <Card
      className="py-1 px-3 mx-md-5 mx-sm-2 my-3"
      style={{
        borderRadius: "10px",
        backgroundColor: "white",
        color: "#153A2D",
      }}>
      <Row>
        <Col md={9} sm={9}>
          <Row>
            <h4>{props.name}</h4>
          </Row>
          <Row>
            <h6>{props.date}</h6>
          </Row>
        </Col>

        <Col md={3} sm={3}>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ width: "100%", height: "100%" }}>
            {props.status ? (
              <span
                style={{
                  color: "darkgray",
                  fontWeight: "bold",
                  fontSize: "larger",
                  maxWidth: "200px",
                }}>
                Donated
              </span>
            ) : (
              <button
                className="btn btn-warning mt-sm-2"
                style={{
                  color: "#153A2D",
                  fontWeight: "bold",
                  fontSize: "larger",
                  maxWidth: "200px",
                }}
                onClick={props.changeDonate}>
                Donate
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default HistoryDonationCard;
