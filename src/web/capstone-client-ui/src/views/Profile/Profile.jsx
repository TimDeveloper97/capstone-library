import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import img from "../../assets/img/default_user.png";
import img_dollar from "../../assets/img/dollar-sign-won-and-dollar-signs-comd-19.png";

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setUserInfo(checkFieldEmpty(userInfo, formDataObj));
    setEditable(true);
  };

  const checkFieldEmpty = (oldObj, newObj) => {
    for (let prop in newObj) {
      if (newObj[prop].trim() === "") {
        newObj[prop] = oldObj[prop];
      }
    }
    return newObj;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="self-header ta-l body-content profile">
      <h4>Thông tin cá nhân</h4>
      <Row>
        <Col md={3} className="avatar-col">
          <div className="avatar-wrapper">
            <img src={img} alt="user" />
            <PencilSquare size={30} color="blue" onClick={handleEdit} />
          </div>
        </Col>
        <Col md={6} className="edit-field">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFullname" className="edit-group">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.fullName}
                disabled={editable}
                name="fullName"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhonenumber" className="edit-group">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.phoneNumber}
                disabled={editable}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="edit-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.email}
                disabled={editable}
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress" className="edit-group">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder={userInfo.address}
                disabled={editable}
                name="address"
              />
            </Form.Group>
            {!editable && (
              <Button variant="primary" type="submit">
                Lưu thay đổi
              </Button>
            )}
          </Form>
        </Col>
        <Col md={3}>
          <div className="account-balance">
            <img src={img_dollar} alt="account balance" />
            <div style={{ width: "150px" }}>
              <p style={{ fontWeight: "bold" }}>Tài khoản hiện tại</p>
              <p>30000</p>
            </div>
          </div>
          <div style={{width: "100%"}}>
          <Button style={{margin: "20px 40px"}} variant="success" onClick={handleShow}>
            Nạp tiền ngay
          </Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nạp tiền vào tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Để nạp tiền, vui lòng chuyển khoản theo cú pháp sau
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Xong
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
