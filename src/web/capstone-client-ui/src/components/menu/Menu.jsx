import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { House } from "react-bootstrap-icons";

export default function Menu() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <House />
            </Nav.Link>
            <Nav.Link href="#action2">Truyện HOT</Nav.Link>
            <NavDropdown title="Thể loại" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Tất cả</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Tình yêu</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Kinh dị</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
