import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./addBook.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { addBook } from "../../actions/book";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { defaultImg } from "./defaultBase64";
import { listPublisher } from "./listPublisher";

const schema = yup.object({
  name: yup.string().required("Tên sách không được để trống"),
  author: yup.string().required("Tên tác giả không được để trống"),
  price: yup
    .number()
    .typeError("giá phải là số nguyên")
    .integer("giá phải là số nguyên")
    .min(1, "Tối thiểu 1 đồng")
    .required("Giá không được để trống"),
  quantity: yup
    .number()
    .typeError("Số lượng phải là số nguyên")
    .integer("Số lượng phải là số nguyên")
    .min(1, "Tối thiểu 1 cuốn")
    .required("Số lượng không được để trống"),
  publishYear: yup
    .number()
    .typeError("Năm phải là số nguyên")
    .integer("Năm phải là số nguyên")
    .min(1800, "Năm trong khoảng 1800-2023")
    .max(2023, "Năm trong khoảng 1800-2023")
    .required("Năm xuất bản không được để trống"),
});

export default function AddBook() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((state) => state.category);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data, e) => {
    e.preventDefault();
    data.publisher = publisher;
    data.categories = listCategories.map((lc) => lc.nameCode);
    if (imgs.length === 0) {
      imgs.push({ fileName: "default_img", data: defaultImg });
    }
    data.imgs = imgs;
    const res = await dispatch(addBook(data));
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 1000);
      resetData();
    } else {
      NotificationManager.error(res.message, "Lỗi", 1000);
    }
  };

  const resetData = () => {
    resetField("name");
    resetField("author");
    resetField("publishYear");
    resetField("price");
    resetField("quantity");
    resetField("description");
    setListCategories([]);
    setSelectedImages([]);
  };
  const [listCategories, setListCategories] = useState([]);
  const [cate, setCate] = useState("chinhtri_phapluat");

  const handleChangeSelect = (event) => {
    let cateSelected = categories.filter(
      (cate) => cate.nameCode === event.target.value
    )[0];
    setCate(event.target.value);
    if (!listCategories.find((lc) => lc.nameCode === cateSelected.nameCode)) {
      setListCategories([...listCategories, cateSelected]);
    }
  };

  const handleDeleteCate = (code) => {
    let list = listCategories.filter((lc) => lc.nameCode !== code);
    setListCategories(list);
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [imgs, setImgs] = useState([]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let imgArr = [];
    console.log(selectedFilesArray);
    selectedFilesArray.forEach(async (file, index) => {
      let data = await toBase64(file);
      data = data.split(",")[1];
      imgArr.push({ fileName: file.name, data });
    });
    setImgs(imgArr);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray);
  };
  const [publisher, setPublihser] = useState("");

  return (
    <section className="question-area pt-40px pb-40px">
      <NotificationContainer />
      <div className="container">
        <div className="filters pb-40px d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="fs-22 fw-medium mr-0" style={{ color: "#fff" }}>
            Thêm mới sách
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-8" style={{ position: "relative" }}>
            <form
              noValidate
              onSubmit={handleSubmit(submitForm)}
              style={{ position: "sticky", top: "100px" }}
            >
              <div className="card card-item">
                <div className="card-body">
                  <div className="form-group">
                    <TextField
                      required
                      id="filled-basic"
                      label="Tên sách"
                      variant="filled"
                      fullWidth
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="error-message" role="alert">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <TextField
                      required
                      id="filled-basic"
                      label="Tên tác giả"
                      variant="filled"
                      fullWidth
                      {...register("author")}
                    />
                    {errors.author && (
                      <span className="error-message" role="alert">
                        {errors.author?.message}
                      </span>
                    )}
                  </div>
                  <div className="row">
                    <div className="form-group col-md-3">
                      <TextField
                        required
                        id="filled-basic"
                        label="Số lượng"
                        variant="filled"
                        {...register("quantity")}
                      />
                      {errors.quantity && (
                        <span className="error-message" role="alert">
                          {errors.quantity?.message}
                        </span>
                      )}
                    </div>
                    <div
                      className="form-group col-md-3"
                      style={{ height: "60px" }}
                    >
                      <TextField
                        id="filled-basic"
                        label="Nhà xuất bản"
                        variant="filled"
                        value={publisher}
                        onChange={(e) => setPublihser(e.target.value)}
                      />
                      <div className="dropdown">
                        {listPublisher
                          .filter((item) => {
                            const searchTerm = publisher?.toLowerCase();
                            const searchItem = item.toLowerCase();
                            return (
                              searchTerm !== "" &&
                              searchItem.startsWith(searchTerm) &&
                              searchItem !== searchTerm
                            );
                          })
                          .map((p, index) => {
                            return (
                              <div
                                className="dropdown-row"
                                key={index}
                                onClick={() => setPublihser(p)}
                              >
                                {p}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        required
                        id="filled-basic"
                        label="Năm xuất bản"
                        variant="filled"
                        {...register("publishYear")}
                      />
                      {errors.publishYear && (
                        <span className="error-message" role="alert">
                          {errors.publishYear?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Giá"
                        variant="filled"
                        required
                        {...register("price")}
                      />
                      {errors.price && (
                        <span className="error-message" role="alert">
                          {errors.price?.message}
                        </span>
                      )}
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
                      {...register("description")}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button className="btn theme-btn" type="submit">
                      Đăng sách
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="card card-item">
              <div className="card-body">
                <div
                  className="form-group"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label className="fs-14 text-black fw-medium lh-20">
                    Thể loại
                  </label>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cate}
                    name="categories"
                    label="Thể loại"
                    onChange={handleChangeSelect}
                  >
                    {categories &&
                      categories.map((cate, index) => (
                        <MenuItem
                          value={cate.nameCode}
                          name={cate.nameCode}
                          key={index}
                        >
                          {cate.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <div className="list-cate-select">
                    {listCategories.map((lc, index) => {
                      return (
                        <div className="cate-select" key={index}>
                          {lc.name}{" "}
                          <button onClick={() => handleDeleteCate(lc.nameCode)}>
                            <FontAwesomeIcon icon={faXmark} size={"xs"} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
                      className="multi file-upload-input"
                      multiple
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      accept="image/png, image/jpeg, image/webp"
                    />
                    <span className="file-upload-text d-flex align-items-center justify-content-center">
                      <i className="la la-cloud-upload mr-2 fs-24"></i>Thả file
                      hoặc click để đăng ảnh.
                    </span>
                  </div>
                </div>
                <div className="images">
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <div key={index} className="image">
                          <div
                            style={{ margin: "0 auto", width: "fit-content" }}
                          >
                            <img src={image} height="200" alt="upload" />
                          </div>
                          <button
                            onClick={() =>
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faXmark} size={"xs"} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
