import Carousel from 'react-bootstrap/Carousel';
import './slider.css';
import img_1 from '../../assets/img/img_1.jpeg';
import img_2 from '../../assets/img/img_2.jpeg';
import img_3 from '../../assets/img/img_3.jpeg';
import { Container } from 'react-bootstrap';

export default function Slider() {
  return (
    <Container className='self-header'>
      <Carousel>
      <Carousel.Item className='home-slider' interval={1000}>
        <img
          className="d-block w-100"
          src={img_1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className='home-slider' interval={500}>
        <img
          className="d-block w-100"
          src={img_2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className='home-slider'>
        <img
          className="d-block w-100"
          src={img_3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}
