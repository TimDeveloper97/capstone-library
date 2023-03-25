import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
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
import { Link } from "react-router-dom";
import DetailAccount from "./DetailAccount";
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
                  <div className="header-item">
                    <Link to={"/"} className="item-link">
                      <HouseDoor size={iconSize} />
                      Trang chủ
                    </Link>
                  </div>
                  <div className="header-item" href="#action2">
                    <a href="./">
                    <FilePerson size={iconSize} />
                    Quản lí tin
                    </a>
                  </div>
                  <div className="header-item" href="#action3">
                    <BagCheckFill size={iconSize} />
                    Đơn hàng
                  </div>
                  <div className="header-item" href="#action4">
                    <ChatLeftText size={iconSize} />
                    Chat
                  </div>
                  <div className="header-item" href="#action5">
                    <BellFill size={iconSize} />
                    Thông báo
                  </div>
                  <div className="header-item account">
                    <PersonCircle size={iconSize} />
                    Tài khoản
                    <CaretDownFill />
                    <DetailAccount isLogged={true} />
                  </div>
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
            <Link to={"/user/write-post"}>
              <button className="btn-login">
                <PencilSquare size={20} style={{ marginRight: "10px" }} />
                Đăng tin
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
