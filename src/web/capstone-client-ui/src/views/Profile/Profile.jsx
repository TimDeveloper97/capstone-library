import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { PencilSquare, PersonVcard } from "react-bootstrap-icons";
import "./profile.css";
import img from "../../assets/img/default_user.png";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    fullName: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    email: "Chưa có thông tin",
    address: "Chưa có thông tin",
  });
  const [editable, setEditable] = useState(true);
  const handleEdit = () => {
    setEditable(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setUserInfo(formDataObj);
    setEditable(true);
  }

  return (
    <Container className="self-header ta-l body-content profile">
      <p>Thông tin cá nhân</p>
      <Row>
        <Col md={3} className="avatar-col">
          <div className="avatar-wrapper">
            <img src={img} alt="user" />
            <PencilSquare size={30} color="blue" onClick={handleEdit} />
          </div>
        </Col>
        <Col md={9}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFullname">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.fullName}
                disabled={editable}
                name="fullName"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhonenumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.phoneNumber}
                disabled={editable}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.email}
                disabled={editable}
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.address}
                disabled={editable}
                name="address"
              />
            </Form.Group>
            {!editable && <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
