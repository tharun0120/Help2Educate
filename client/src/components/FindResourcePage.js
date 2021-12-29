import React from "react";
import FRPSection1 from "./ReceivePage/FRPSection1";
import FRPSection2 from "./ReceivePage/FRPSection2";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";

const FindResourePage = () => {
  const { isLoggedIn } = useSelector(selectUser);

  return (
    <div>
      <FRPSection1 />
      <FRPSection2 isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
};

export default FindResourePage;
