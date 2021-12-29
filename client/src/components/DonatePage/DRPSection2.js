import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createDonation,
  selectDonations,
  clearDonationState,
} from "../../features/donations/donationSlice";
// import axios from "axios";

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
  const [image, setImage] = useState([]);
  const [imageBuffer, setImageBuffer] = useState([]);

  const onAddImage = (e) => {
    setImageBuffer([...imageBuffer, e.target.files[0]]);
    const imageNow = URL.createObjectURL(e.target.files[0]);
    setImage([...image, imageNow]);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(clearDonationState());
      return;
    }
  }, [isError, isSuccess, image]); //eslint-disable-line

  const setDonations = (donations, files) => {
    dispatch(createDonation({ donations, files }));
    if (isSuccess) {
      toast.success("Donation Enlisted Successfully!!!");
    }
  };

  const onListDonation = async (e) => {
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

    const formData = new FormData();
    for (let i = 0; i < imageBuffer.length; i++) {
      formData.append("donationImages", imageBuffer[i]);
    }
    // console.log(formData.getAll("donationImages"));

    // axios
    //   .post("/api/user/me/avatar", formData, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    setDonations(
      {
        donor_name,
        item_name,
        description,
        item_type,
        email,
        address,
        contact,
        isDonated: false,
      },
      formData
    );
    setDonorName("");
    setItemName("");
    setDescription("");
    setAddress("");
    setItemType("");
    setContact("");
    setEmail("");
    setImage([]);
    setImageBuffer([]);
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                flexDirection: "column",
              }}>
              {image && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexWrap: "wrap",
                    width: "100vw",
                  }}>
                  {image.map((i) => {
                    return (
                      <img
                        src={i}
                        key={i}
                        alt={i}
                        style={{
                          objectFit: "contain",
                          width: "150px",
                          height: "150px",
                        }}
                      />
                    );
                  })}
                </div>
              )}
              {/* <input
                type="file"
                className="btn btn-primary mt-2"
                onChange={onAddImage}
                style={{
                  backgroundColor: "#FFC107",
                  borderColor: "#FFC107",
                  color: "#153A2D",
                  fontWeight: "600",
                  width: "25%",
                  fontSize: "20px",
                }}
              /> */}
              <input
                type="file"
                id="files"
                onChange={onAddImage}
                style={{ display: "none" }}
              />
              <label
                for="files"
                className="btn btn-primary mt-2"
                style={{
                  backgroundColor: "#FFC107",
                  borderColor: "#FFC107",
                  color: "#153A2D",
                  fontWeight: "600",
                  width: "25%",
                  fontSize: "20px",
                }}>
                Add Images
              </label>
            </div>
            <br />
            <button
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
            </button>
          </Col>
        </Container>
      </Container>
    </div>
  );
}

export default DRPSection2;
