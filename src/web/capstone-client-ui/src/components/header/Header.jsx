import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./header.css";
import {
  HouseDoor,
  Search,
  FilePerson,
  BagCheckFill,
  ChatLeftText,
  BellFill,
  PersonCircle,
  CaretDownFill,
  PencilSquare,
} from "react-bootstrap-icons";
export default function Header() {
  let iconSize = 26;
  return (
    <Container className="bg-header" fluid>
      <Container className="self-header">
        <Row>
          <Navbar expand="lg">
            <Container>
              <Nav className="logo-brand me-auto my-2 my-lg-0">capstone</Nav>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="justify-content-end flex-grow-1"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link className="header-item" href="#action2">
                    <HouseDoor size={iconSize} />
                    Trang chủ
                  </Nav.Link>
                  <Nav.Link className="header-item" href="#action2">
                    <FilePerson size={iconSize} />
                    Quản lí tin
                  </Nav.Link>
                  <Nav.Link className="header-item" href="#action2">
                    <BagCheckFill size={iconSize} />
                    Đơn hàng
                  </Nav.Link>
                  <Nav.Link className="header-item" href="#action2">
                    <ChatLeftText size={iconSize} />
                    Chat
                  </Nav.Link>
                  <Nav.Link className="header-item" href="#action2">
                    <BellFill size={iconSize} />
                    Thông báo
                  </Nav.Link>
                  <Nav.Link className="header-item" href="#action2">
                    <PersonCircle size={iconSize} />
                    Tài khoản
                    <CaretDownFill />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col md={10}>
            <InputGroup className="mb-3 search-header">
              <Form.Control
                placeholder="Tìm kiếm sách"
                aria-label="Tìm kiếm sách"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <Search />
              </Button>
            </InputGroup>
          </Col>
          <Col md={2}>
            <button className="btn-login">
              <PencilSquare size={20} style={{ marginRight: "10px" }} />
              Đăng tin
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
