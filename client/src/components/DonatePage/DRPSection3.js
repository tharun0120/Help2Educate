import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import HistoryDonationCard from "./HistoryDonationCard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDonations,
  selectDonations,
  clearDonationState,
  updateDonation,
} from "../../features/donations/donationSlice";
import { Fade } from "react-reveal";
// import { isLoggedIn } from "../../features/users/userSlice";

function DRPSection3() {
  const dispatch = useDispatch();
  const { donations, isSuccess, isError, error } = useSelector(selectDonations);

  useEffect(() => {
    dispatch(getUserDonations());
    if (donations.length > 0)
      if (isSuccess) {
        toast.success("User Donations Fetched!!!");
      }
  }, []); //eslint-disable-line

  useEffect(() => {
    // if (donations) {
    //   toast.success("User Donations Fetched!!!");
    // }
    if (isError) {
      toast.error(error);
      dispatch(clearDonationState());
      return;
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const changeDonate = (id) => {
    // console.log("changeDonate");
    console.log(id);
    dispatch(updateDonation(id));
    if (isSuccess) {
      toast.success("updated successfully");
    }
  };

  return (
    <div>
      <Container
        fluid="full"
        style={{
          backgroundColor: "#153A2D",
          height: "100%",
          paddingBottom: "40px",
        }}>
        <Fade up>
          <Container fluid="xxl">
            <div
              className="px-md-5 py-5 mb-3 mx-auto"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <h1 style={{ color: "white" }} className="mb-3">
                History of Donations
              </h1>
            </div>
            {donations &&
              donations.map((i) => {
                return (
                  <HistoryDonationCard
                    name={i.item_name}
                    date={i.item_type}
                    status={i.isDonated}
                    key={i._id}
                    changeDonate={() => changeDonate(i._id)}
                  />
                );
              })}
          </Container>
        </Fade>
      </Container>
    </div>
  );
}

export default DRPSection3;
