import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../../assets/img/skill-book.jpg";
export default function MyBook() {
  const [arrangeItem, setArrangeItem] = React.useState("");

  const handleChange = (event) => {
    setArrangeItem(event.target.value);
  };
  return (
    <Container className="self-header ta-l body-content">
      <h6>Sách của tôi</h6>
      <Row className="input-field">
        <Col md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={arrangeItem}
              label="Sắp xếp"
              onChange={handleChange}
            >
              <MenuItem value={10}>A-Z</MenuItem>
              <MenuItem value={20}>Giá giảm dần</MenuItem>
              <MenuItem value={30}>Số lượng còn lại</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col md={4}>
          <Link to={'/upload-book'}>
          <Button variant="success">Thêm sách mới</Button>
          </Link>
        </Col>
      </Row>
      <div className="mybook-list">
        {[...Array(3)].map((item, index) => {
          return (
            <Row key={index} className="mybook-item">
              <Col md={3}>
                <img src={img} alt="" className="thumbnail-book" />
              </Col>
              <Col md={6}>
                <p className="mybook-title">
                  Harry Potter and halfblood prince
                </p>
                <div className="mybook-subtitle">
                  <p className="price">100.000 đ</p>
                  <p className="quantity">Còn lại trong kho: 5</p>
                </div>
              </Col>
              <Col md={3} className="mybook-option">
                <Button variant="info">Xem chi tiết/sửa</Button>
                <Button variant="danger">Xóa</Button>
              </Col>
            </Row>
          );
        })}
      </div>
    </Container>
  );
}
