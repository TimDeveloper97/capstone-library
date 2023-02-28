import React from "react";
import { Container } from "react-bootstrap";
import { Facebook } from "react-bootstrap-icons";
import "./footer.css";

export default function Footer() {
  return (
      <Container fluid className="footer" style={{width: "100%"}}>
           <p>Capstone library copyright &copy; by team</p>
           <p><span className="contact">Liên hệ</span><a href="https://www.facebook.com/thang.duongvan.963"><Facebook/></a></p>
      </Container>
  );
}