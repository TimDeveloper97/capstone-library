import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { addBook } from "../../actions/book";

const schema = yup.object({
  name: yup.string().required("Tên sách không được để trống"),
  author: yup.string().required("Tên tác giả không được để trống"),
  price: yup.number().required("Giá không được để trống"),
});

export default function AddPost() {
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

  const submitForm = (data, e) => {
    e.preventDefault();
    data.categories = listCategories.map((lc) => lc.nameCode);
    data.imgs = imgs;
    dispatch(addBook(data));
    resetData();
  };

  const resetData = () => {
    resetField("name");
  };
  const [listCategories, setListCategories] = useState([]);

  const handleChangeSelect = (event) => {
    let cateSelected = categories.filter(
      (cate) => cate.nameCode === event.target.value
    )[0];
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
      // console.log(data);
      // console.log("img" + index);
      data = data.split(",")[1];
      imgArr.push({ fileName: file.name, data });
    });
    setImgs(imgArr);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray);
  };

  return (
    <section className="question-area pt-40px pb-40px">
      <div className="container">
        <div className="filters pb-40px d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="fs-22 fw-medium mr-0">Thêm mới sách</h3>
        </div>
        <div className="row">
          <div className="col-lg-6" style={{ position: "relative" }}>
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
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        id="filled-basic"
                        label="Số lượng"
                        variant="filled"
                        type="number"
                        defaultValue={1}
                        {...register("quantity")}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Nhà xuất bản"
                        variant="filled"
                        {...register("publisher")}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Năm xuất bản"
                        variant="filled"
                        {...register("publishYear")}
                      />
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
          <div className="col-lg-6">
            <div className="card card-item">
              <div className="card-body">
                <div
                  className="form-group"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label className="fs-14 text-black fw-medium lh-20">
                    Thể loại
                  </label>
                  <div class="container">
                    <div
                      class="cart-form mb-50px table-responsive px-2"
                    >
                      <table class="table generic-table">
                        <thead>
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <div class="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                <div class="media-body">
                                  <h5 class="fs-15 fw-medium">
                                    <a href="#">Chocolate bar</a>
                                  </h5>
                                </div>
                              </div>
                            </th>
                            <td>$22</td>
                            <td>
                              <div class="quantity-item d-inline-flex align-items-center">
                                <button class="qtyBtn qtyDec" type="button">
                                  <i class="la la-minus"></i>
                                </button>
                                <input
                                  class="qtyInput"
                                  type="text"
                                  name="qty-input"
                                  value="1"
                                />
                                <button class="qtyBtn qtyInc" type="button">
                                  <i class="la la-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6">
                              <div class="cart-actions d-flex align-items-center justify-content-between">
                                <div class="input-group my-2 w-auto">
                                  <div class="input-group-append">
                                    <button class="btn theme-btn">
                                      Apply coupon
                                    </button>
                                  </div>
                                </div>
                                <div class="flex-grow-1 text-right my-2">
                                  <button class="btn theme-btn">
                                    Update cart
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
