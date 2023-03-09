import React, { useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./detailbook.css";
import img_1 from "../../assets/img/img_1.jpeg";
import img_2 from "../../assets/img/img_2.jpeg";
import img_3 from "../../assets/img/img_3.jpeg";
import { Basket, Chat, Coin, GeoAlt, Telephone } from "react-bootstrap-icons";
import SlideItem from "../../components/SlideItem/SlideItem";

export default function DetailBook() {
  let { id } = useParams();
  const [isShown, setIsShown] = useState(true);
  const showContact = () => {
    setIsShown(!isShown);
  };

  const hideNumber = (inputNumber) => {
    let first6 = inputNumber.slice(0, 7);
    return first6 + "***";
  };
  return (
    <>
      <Container className="self-header ta-l body-content profile">
        <Row>
          <Col md={8} className="main-detail">
            <Carousel className="detail-carousel">
              <Carousel.Item>
                <img className="book-img" src={img_1} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="book-img" src={img_2} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="book-img" src={img_3} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
            <p className="book-title">Harry potter and half blood prince</p>
            <p className="author">J.K Rowling</p>
            <p className="book-price">
              <Coin color="green" /> 100.000 d
            </p>
            <h6>Danh sách</h6>
            <div className="list-book-selected">
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                </div>
            <h6>Mô tả</h6>
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
            <h6>Địa điểm</h6>
            <p className="location">
              <GeoAlt /> Phuong Thanh Xuan Nam, Quan Thanh Xuan, Ha Noi
            </p>
          </Col>
          <Col md={4} style={{ position: "relative" }}>
            <div className="contact-rent">
              <div className="login-out">
                <Link to={"/login"} className="item-link">
                  <span className="default-user"></span>
                  <span style={{ fontWeight: "500" }}>Nguyen Van A</span>
                </Link>
              </div>
              <Button
                variant="success"
                className="contact-button"
                onClick={showContact}
              >
                <span>
                  <Telephone />{" "}
                  {isShown ? hideNumber("0123456789") : "0123456789"}{" "}
                </span>
                {isShown && <span>Bấm để hiện số</span>}
              </Button>
              <Link to={"/chat"}>
                <Button variant="outline-secondary" className="contact-button">
                  <span>
                    <Chat />
                  </span>{" "}
                  <span>Chat với người bán</span>
                </Button>
              </Link>
              <Button variant="primary" className="contact-button">
                  <span>
                    <Basket />
                  </span>{" "}
                  <span>Thuê sách</span>
                </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <SlideItem title={"Sách cùng người đăng"} />
      <SlideItem title={"Sách cùng thể loại"} />
    </>
  );
}
