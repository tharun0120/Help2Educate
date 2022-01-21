import React from "react";
import FRPSection1 from "./ReceivePage/FRPSection1";
import FRPSection2 from "./ReceivePage/FRPSection2";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";

const FindResourePage = ({ currentUser }) => {
  const { user } = useSelector(selectUser);
  return (
    <div>
      <NavBar name="FRP" currentUser={currentUser || user} />
      <FRPSection1 />
      <FRPSection2 currentUser={currentUser || user} />
      <Footer />
    </div>
  );
};

export default FindResourePage;
