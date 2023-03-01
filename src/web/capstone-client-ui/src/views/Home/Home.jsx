import Slider from "../../components/slider/Slider";
import img_1 from "../../assets/img/skill-book.jpg";
import ListBookItem from "../../components/listBookItem/ListBookItem";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";
export default function Home() {
  return (
    <>
      <Slider />
      <Container className="self-header wrapper ta-l">
        <p className="categories-title">Khám phá danh mục</p>
        <div className="list-categories">
          {[...Array(14)].map((x, index) => {
            return (
              <div className="category-item" key={index}>
                <div className="img-wrapper">
                  <img src={img_1} alt="" />
                </div>
                <p>Sach ky nang</p>
              </div>
            );
          })}
        </div>
      </Container>
      <ListBookItem title={"Tin đăng mới"} />
      <Container className="self-header">
        <p className="key-word-title">Các từ khóa phổ biến</p>
        <ul className="key-words">
          <Row>
            {[...Array(15)].map((item, index) => {
              return (
                <Col md={3} key={index}>
                  <li className="key-word-item ">
                    <a href="#">Sách kỹ năng</a>
                  </li>
                </Col>
              );
            })}
          </Row>
        </ul>
      </Container>
    </>
  );
}
