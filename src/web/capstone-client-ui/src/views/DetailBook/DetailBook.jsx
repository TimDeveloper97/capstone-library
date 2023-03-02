import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./detailbook.css";
import img_1 from "../../assets/img/img_1.jpeg";
import img_2 from "../../assets/img/img_2.jpeg";
import img_3 from "../../assets/img/img_3.jpeg";

export default function DetailBook() {
  let { id } = useParams();
  return (
    <Container className="self-header ta-l body-content profile">
      <Row>
        <Col md={8} className="main-detail">
          <Carousel className="detail-carousel">
            <Carousel.Item className="detail-item">
              <img className="book-img" src={img_1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item className="detail-item">
              <img className="book-img" src={img_2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item className="detail-item">
              <img className="book-img" src={img_3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}
