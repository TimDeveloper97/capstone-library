import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";

export default function UploadBook() {
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
          <h6>Thông tin sách</h6>
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
                    label="Tên sách"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên tác giả"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="filled-basic"
                    label="Số lượng"
                    variant="filled"
                    type={"number"}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    id="filled-basic"
                    label="Nhà xuất bản"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    id="filled-basic"
                    label="Năm xuất bản"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField id="filled-basic" label="Giá" variant="filled" required />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    label="Thể loại"
                    variant="filled"
                    placeholder="Có thể nhập nhiều thể loại, cách nhau bởi dấu ','"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    id="filled-multiline-flexible"
                    label="Mô tả về sách"
                    multiline
                    rows={3}
                    variant="filled"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button
                className="input-mg btn-pd"
                variant="primary"
                type="submit"
              >
                Đăng sách
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
