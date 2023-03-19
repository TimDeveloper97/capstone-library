import { TextField } from "@mui/material";
import React from "react";
import "./addBook.css";

export default function AddBook() {
  return (
    <section className="question-area pt-40px pb-40px">
      <div className="container">
        <div className="filters pb-40px d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="fs-22 fw-medium mr-0">Thêm mới sách</h3>
        </div>
        <form action="#" className="row">
          <div className="col-lg-8">
            <div className="card card-item">
              <div className="card-body">
                <div className="form-group">
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên sách"
                    variant="filled"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên tác giả"
                    variant="filled"
                    fullWidth
                  />
                </div>
                <div className="row">
                  <div className="form-group col-md-3">
                    <TextField
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      id="filled-basic"
                      label="Số lượng"
                      variant="filled"
                      type={"number"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <TextField
                      id="filled-basic"
                      label="Nhà xuất bản"
                      variant="filled"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <TextField
                      id="filled-basic"
                      label="Năm xuất bản"
                      variant="filled"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <TextField
                      id="filled-basic"
                      label="Giá"
                      variant="filled"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <TextField
                    id="filled-multiline-flexible"
                    label="Mô tả về sách"
                    multiline
                    rows={3}
                    variant="filled"
                    fullWidth
                  />
                </div>
                <div className="form-group mb-0">
                  <button className="btn theme-btn" type="submit">
                    Đăng sách
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card-item">
              <div className="card-body">
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-20">
                    Thể loại
                  </label>
                  <select className="custom-select custom--select">
                    <option value="0">Chọn thể loại sách</option>
                    <option value="1">Uncategorized</option>
                    <option value="2">Work</option>
                  </select>
                </div>
                <div className="form-group mb-0"></div>
              </div>
            </div>
            <div className="card card-item">
              <div className="card-body">
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-20">
                    Chọn ảnh
                  </label>
                  <div className="file-upload-wrap file-upload-layout-2">
                    <input
                      type="file"
                      name="files[]"
                      className="multi file-upload-input"
                      multiple
                    />
                    <span className="file-upload-text d-flex align-items-center justify-content-center">
                      <i className="la la-cloud-upload mr-2 fs-24"></i>Thả file
                      hoặc click để đăng ảnh.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
