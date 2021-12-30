import { Container } from "react-bootstrap";
import image from "../Assets/find.png";

const FRPSection1 = () => {
  return (
    <Container fluid="full" style={{ backgroundColor: "#153A2D" }}>
      <Container fluid="xxl">
        <div className="d-flex flex-row justify-content-center">
          <div>
            <img src={image} alt="" className="img-fluid my-2" />
          </div>
        </div>

        <div
          className="d-flex flex-row justify-content-center pb-5"
          style={{ color: "white", fontWeight: "600" }}>
          <h3>
            <center>FIND RESOURSES TO BE DONATED HERE</center>
          </h3>
        </div>
      </Container>
    </Container>
  );
};

export default FRPSection1;
