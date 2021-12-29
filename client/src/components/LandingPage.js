import React, { useEffect } from "react";
import LPSection1 from "./LandingPage/LPSection1";
import LPSection2 from "./LandingPage/LPSection2";
import LPSection3 from "./LandingPage/LPSection3";
import LPSection4 from "./LandingPage/LPSection4";
// import Loading from "./Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";
import Footer from "./Footer";

function LandingPage() {
  const { isLoggedIn } = useSelector(selectUser);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Logged in Successfully!!!");
    }
  }, [isLoggedIn]);

  return (
    <section>
      <LPSection1 />
      <LPSection2 />
      <LPSection3 />
      <LPSection4 />
      <Footer />
    </section>
  );
}

export default LandingPage;
