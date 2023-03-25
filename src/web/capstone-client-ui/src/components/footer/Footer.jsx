import React from "react";
import { Container } from "react-bootstrap";
import { Facebook } from "react-bootstrap-icons";

export default function Footer() {
  return (
      <Container fluid className="footer" style={{width: "100%"}}>
           <p>Capstone library copyright &copy; by team</p>
           <p><span className="contact">Liên hệ</span><a href="#"><Facebook/></a></p>
      </Container>
  );
}
