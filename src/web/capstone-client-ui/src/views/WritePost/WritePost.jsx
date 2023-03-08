import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { DashCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import img from "../../assets/img/skill-book.jpg";

export default function WritePost() {
  const [arrangeItem, setArrangeItem] = React.useState("");

  const handleChange = (event) => {
    setArrangeItem(event.target.value);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
  };
  return (
    <Container className="self-header ta-l body-content">
      <Row>
        <Col md={6}>
          <h6>Sách trong kho</h6>
          <Row className="input-field">
            <Col md={6}>
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
            <Col md={4}></Col>
          </Row>
          <div className="mybook-list">
            {[...Array(5)].map((item, index) => {
              return (
                <Row key={index} className="mybook-item post">
                  <Col md={1}>
                    <div className="check-book">
                      <Checkbox {...label} />
                    </div>
                  </Col>
                  <Col md={3}>
                    <img src={img} alt="" className="thumbnail-book" />
                  </Col>
                  <Col md={6} style={{ padding: 0 }}>
                    <p className="mybook-title">
                      Harry Potter and halfblood prince
                    </p>
                    <div className="mybook-subtitle">
                      <p className="price">100.000 đ</p>
                      <p className="quantity">Còn lại trong kho: 5</p>
                    </div>
                  </Col>
                  <Col md={2} style={{ padding: 0 }}>
                    <div className="number-col">
                      <Button className="btn-adj">
                        <PlusCircleFill size={20} />
                      </Button>
                      <Form.Control type="number" style={{ width: "41px" }} />
                      <Button className="btn-adj">
                        <DashCircleFill size={20} />
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Col>
        <Col md={6} style={{position: 'relative'}}>
          <h6>Nội dung tin</h6>
          <div className="post-content">
            <Form
              className=""
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <div className="">
                <Grid container columnSpacing={2} rowSpacing={2}>
                  <Grid item md={12}>
                    <TextField
                      required
                      id="filled-basic"
                      label="Tiêu đề tin"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      required
                      id="filled-basic"
                      label="Địa điểm"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Cho phép cho thuê"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="filled-basic"
                      label="Thể loại"
                      variant="filled"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Mô tả về tin"
                      multiline
                      rows={3}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <div className="list-book-selected">
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                    <div className="book-selected">
                        <span>Harry potter and halfblood prince</span>
                        <span>x4</span>
                    </div>
                </div>
                <div className="sum-price">
                    <span className="price">Tổng giá: 300.000đ</span>
                <Button
                  className="input-mg btn-pd"
                  variant="primary"
                  type="submit"
                >
                  Đăng tin
                </Button>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
