import Carousel from "react-bootstrap/Carousel";
import img_1 from "../../assets/img/img_1.jpeg";
import img_2 from "../../assets/img/img_2.jpeg";
import img_3 from "../../assets/img/img_3.jpeg";
import img_4 from "../../assets/img/image.png";
import { Container } from "react-bootstrap";

export default function Slider() {
  return (
    <Container className="self-header wrapper">
      <Carousel>
        <Carousel.Item className="slider-item" interval={1000}>
          <img className="d-block w-100" src={img_1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className="slider-item" interval={1000}>
          <img className="d-block w-100" src={img_2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item className="slider-item" interval={1000}>
          <img className="d-block w-100" src={img_3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <div className="sub-menu">
        {[...Array(7)].map((x, index) => {
          return (
            <div className="sub-menu-item" key={index}>
              <img src={img_4} alt="" />
              <p>Capstone sale</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
