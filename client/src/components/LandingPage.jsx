import React from "react";
import LPSection1 from "./LandingPage/LPSection1";
import LPSection2 from "./LandingPage/LPSection2";
import LPSection3 from "./LandingPage/LPSection3";
import LPSection4 from "./LandingPage/LPSection4";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";

function LandingPage({ currentUser }) {
  const { user } = useSelector(selectUser);
  return (
    <section>
      <NavBar name="HOM" currentUser={currentUser || user} />
      <LPSection1 />
      <LPSection2 />
      <LPSection3 />
      <LPSection4 />
      <Footer />
    </section>
  );
}

export default LandingPage;
