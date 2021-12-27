import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createDonation,
  selectDonations,
  clearDonationState,
} from "../../features/donations/donationSlice";

function DRPSection2() {
  const dispatch = useDispatch();
  const { isSuccess, isError, error } = useSelector(selectDonations);
  const [donor_name, setDonorName] = useState("");
  const [item_name, setItemName] = useState("");
  const [item_type, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(clearDonationState());
      return;
    }
  }, [isError, isSuccess]); //eslint-disable-line

  const setDonations = (donation) => {
    dispatch(createDonation(donation));
    if (isSuccess) {
      toast.success("Donation Enlisted Successfully!!!");
    }
  };

  const onListDonation = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!contact) {
      toast.warn("Please enter a contact");
      return;
    }
    if (!donor_name) {
      toast.warn("Please enter the donor name");
      return;
    }

    if (!item_name) {
      toast.warn("Please enter the item name");
      return;
    }
    if (!item_type) {
      toast.warn("Please enter the item type");
      return;
    }

    if (!address) {
      toast.warn("Please enter the address");
      return;
    }
    if (!description) {
      toast.warn("Please enter a description");
      return;
    }

    setDonations({
      donor_name,
      item_name,
      description,
      item_type,
      email,
      address,
      contact,
      isDonated: false,
    });
    setDonorName("");
    setItemName("");
    setDescription("");
    setAddress("");
    setItemType("");
    setContact("");
    setEmail("");
  };
  return (
    <div>
      <Container fluid="full" style={{ backgroundColor: "#FFF" }}>
        {/* <div className="d-flex flex-row justify-content-center">
                <div><img src={imag} className='img-fluid my-2'/></div>
            </div> */}
        <Container fluid="xxl">
          <Col className="py-5 px-md-5 my-3">
            <Form.Floating className="my-2">
              <Form.Control
                id="DRPDonorName"
                type="Name"
                value={donor_name}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Name"
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Donor's Name
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPCommName"
                type="Name"
                placeholder="Name"
                value={item_name}
                onChange={(e) => setItemName(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Commodity's Name (E.g Pencils)
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPDonationCategory"
                type="Name"
                placeholder="Name"
                value={item_type}
                onChange={(e) => setItemType(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Category of Donation
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPDonationDescription"
                type="name"
                placeholder="Name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Description
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPAddress"
                type="Name"
                placeholder="Name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Address at which donation can be picked
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPEmail"
                type="Name"
                placeholder="Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Email ID of the donor
              </label>
            </Form.Floating>

            <Form.Floating className="my-2">
              <Form.Control
                id="DRPContact"
                type="Name"
                placeholder="Name"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <label
                htmlFor="floatingInputCustom"
                style={{ color: "darkgrey" }}>
                Contact Number of the donor (optional)
              </label>
            </Form.Floating>

            <Button
              className="btn btn-primary mt-2"
              style={{
                backgroundColor: "#FFC107",
                borderColor: "#FFC107",
                color: "#153A2D",
                fontWeight: "600",
                fontSize: "20px",
              }}>
              Add a Display Image
            </Button>
            <br />
            <Button
              onClick={onListDonation}
              className="btn btn-primary mt-3"
              style={{
                width: "100%",
                backgroundColor: "#FFC107",
                borderColor: "#FFC107",
                color: "#153A2D",
                fontWeight: "600",
                fontSize: "20px",
              }}>
              List Donation
            </Button>
          </Col>
        </Container>
      </Container>
    </div>
  );
}

export default DRPSection2;