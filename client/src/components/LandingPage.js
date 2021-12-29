import React from "react";
import LPSection1 from "./LandingPage/LPSection1";
import LPSection2 from "./LandingPage/LPSection2";
import LPSection3 from "./LandingPage/LPSection3";
import LPSection4 from "./LandingPage/LPSection4";
import Footer from "./Footer";

function LandingPage() {
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
