import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./addBook.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateBook } from "../../actions/book";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useParams } from "react-router-dom";
import { getBookById } from "../../apis/book";
import Loading from "../../components/Loading/Loading";
import { getImgUrl } from "../../helper/helpFunction";

const schema = yup.object({
  name: yup.string().required("Tên sách không được để trống"),
  author: yup.string().required("Tên tác giả không được để trống"),
  price: yup.number().required("Giá không được để trống"),
});

export default function UpdateBook() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((state) => state.category);
  const [book, setBook] = useState();
  const [listCategories, setListCategories] = useState([]);

  const userRole = JSON.parse(window.localStorage.getItem("user")).roles[0];

  const { id } = useParams();
  useEffect(() => {
    const getBook = async () => {
      const { data } = await getBookById(id);
      setBook(data.value);
      setListCategories(
        categories &&
          data.value.categories.map((cate) => {
            return categories.filter((c) => c.nameCode === cate)[0];
          })
      );
      const imagesArray = data.value.imgs.map((file) => {
        return getImgUrl(file.fileName);
      });
      setSelectedImages(imagesArray);
    };
    getBook();
  }, [id, categories]);
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
    data.categories = listCategories.map((lc) => lc.nameCode);
    imgs.length !== 0 && (data.imgs = imgs);
    console.log(data);
    const res = await dispatch(updateBook(data));
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
      resetData();
    } else {
      NotificationManager.error(res.message, "Lỗi", 2000);
    }
  };

  const resetData = () => {
    resetField("name");
    resetField("author");
    resetField("publisher");
    resetField("publishYear");
    resetField("price");
    resetField("quantity");
    resetField("description");
    setListCategories([]);
    setSelectedImages([]);
  };
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

  const [selectedImages, setSelectedImages] = useState(book?.imgs);
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

  return book ? (
    <section className="question-area pt-40px pb-40px">
      <NotificationContainer />
      <div className="container">
        <div className="filters pb-40px d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="fs-22 fw-medium mr-0 color-w">Sửa sách</h3>
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
                      defaultValue={book.name}
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
                      defaultValue={book.author}
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
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        id="filled-basic"
                        label="Số lượng"
                        variant="filled"
                        type="number"
                        defaultValue={userRole === "ROLE_USER" ? book.quantity : book.inStock}
                        {...register("quantity")}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Nhà xuất bản"
                        variant="filled"
                        {...register("publisher")}
                        defaultValue={book.publisher}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Năm xuất bản"
                        variant="filled"
                        defaultValue={book.publishYear}
                        {...register("publishYear")}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Giá"
                        variant="filled"
                        required
                        defaultValue={book.price}
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
                      defaultValue={book.description}
                      {...register("description")}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button className="btn theme-btn" type="submit">
                      Cập nhật sách
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
                    {listCategories?.map((lc, index) => {
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
  ) : (
    <Loading />
  );
}
