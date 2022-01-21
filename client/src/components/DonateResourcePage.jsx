import React, { useEffect } from "react";
import DRPSection1 from "./DonatePage/DRPSection1";
import DRPSection2 from "./DonatePage/DRPSection2";
import DRPSection3 from "./DonatePage/DRPSection3";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";

function DonateResourcePage({ currentUser }) {
  const { user, isLoggedIn } = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn || !currentUser || !user) {
      toast.error("You have to be logged in to enlist donations");
      history.push("/signin");
    }
  }, [isLoggedIn]); //eslint-disable-line

  return (
    <section>
      <NavBar name="DRP" currentUser={currentUser || user} />
      <DRPSection1 />
      <DRPSection2 />
      <DRPSection3 />
      <Footer />
    </section>
  );
}

export default DonateResourcePage;
