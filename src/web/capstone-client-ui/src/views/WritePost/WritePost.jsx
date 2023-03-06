import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { XCircle, XCircleFill } from "react-bootstrap-icons";
import Input from "../../components/Input/Input";
import "./writepost.css";

export default function WritePost() {
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray);
  };

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
    <Container className="body-content self-header ta-l">
      <Row style={{ padding: "10px" }}>
        <Col md={4}>
          <h6>Ảnh sách</h6>
          <label className="upload-img">
            Thêm ảnh
            <br />
            <span>Tối đa 5 ảnh</span>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png, image/jpeg, image/webp"
            />
          </label>
          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={index} className="image">
                    <img src={image} height="200" alt="upload" />
                    <button
                      onClick={() =>
                        setSelectedImages(
                          selectedImages.filter((e) => e !== image)
                        )
                      }
                    >
                      <XCircleFill color="red" size={30} />
                    </button>
                  </div>
                );
              })}
          </div>
        </Col>
        <Col md={8}>
          <h6>Thông tin sách
          </h6>
          <Form
        className=""
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="">
          <Input
            type="text"
            placeholder="Nhập tên sách"
            required={true}
            errorMessage="Tên sách không được để trống"
            name="bookName"
          />
          <Input
            type="text"
            placeholder="Tên tác giả"
            required={false}
            errorMessage="SĐT không được để trống"
            name=""
          />
          <InputGroup>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
          <Button variant="primary" type="submit">
            Đăng sách
          </Button>
          
        </div>
      </Form>
        </Col>
      </Row>
    </Container>
  );
}
