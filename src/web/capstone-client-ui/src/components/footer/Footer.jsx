import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Facebook } from "react-bootstrap-icons";
import "./footer.css";

export default function Footer() {
  return (
    <>
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
      <Container fluid className="footer" style={{width: "100%"}}>
           <p>Capstone library copyright &copy; by team</p>
           <p><span className="contact">Liên hệ</span><a href="https://www.facebook.com/thang.duongvan.963"><Facebook/></a></p>
      </Container>
    </>
  );
}
