import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./header.css";
import { Search } from "react-bootstrap-icons";
export default function Header() {
  return (
    <Container className="bg-header" fluid>
      <Container>
        <Row>
          <Col md={2}>
            <div className="logo-brand">capstone</div>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3 search-header">
              <Form.Control
                placeholder="Tìm sách..."
                aria-label="Tìm sách..."
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <Search />
              </Button>
            </InputGroup>
          </Col>
          <Col md={2}>

          </Col>
          <Col md={2}>
            <button className="btn-login">Đăng nhập</button>
            <button className="btn-login">Đăng ký</button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
