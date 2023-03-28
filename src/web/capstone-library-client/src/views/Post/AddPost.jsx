import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getUserBooks } from "../../actions/book";
import { Link } from "react-router-dom";
import { addPost } from "../../actions/post";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

const schema = yup.object({
  noDays: yup.string().required("Số ngày cho thuê không được để trống"),
  fee: yup.string().required("Phí cho thuê không được để trống"),
});

export default function AddPost() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.book);
  const role =
    JSON.parse(window.localStorage.getItem("user")).roles[0] === "ROLE_ADMIN";
  useEffect(() => {
    role ? dispatch(getBooks()) : dispatch(getUserBooks());
  }, []);

  useEffect(() => {
    setListSelectBook(
      books?.map((book) => {
        return {
          id: book.id,
          quantity: 1,
          maxQuantity: book.quantity,
          price: book.price,
          name: book.name,
          selected: false,
        };
      })
    );
  }, [books]);

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
    let postDetails = listSelectBook.filter((lsb) => lsb.selected);
    data.postDetailDtos = postDetails.map((lsb) => {
      return {
        bookDto: {
          id: lsb.id,
        },
        quantity: lsb.quantity,
      };
    });
    if (role) {
      data.address = null;
    } else {
      data.address = address;
      data.title = "[Ký gửi]";
    }
    const res = await dispatch(
      addPost({
        title: data.title,
        noDays: data.noDays,
        fee: data.fee,
        content: data.content,
        address: data.address,
        postDetailDtos: data.postDetailDtos,
      })
    );
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
      resetData();
    } else {
      NotificationManager.error(res.message, "Lỗi", 2000);
    }
  };

  const resetData = () => {
    resetField("title");
    resetField("noDays");
    resetField("fee");
    resetField("content");
    setTotal(0);
    setAddress("Chọn địa chỉ");
  };

  const [listSelectBook, setListSelectBook] = useState([]);

  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   console.log(total);
  // }, [listSelectBook, total]);

  const sumTotal = (listSelected) => {
    let total = 0;
    listSelected.forEach((l) => {
      l.selected && (total += l.quantity * l.price);
    });
    setTotal(total);
  };
  const handleClickCheckbox = (book, e, index) => {
    const temp = listSelectBook;
    temp[index].selected = e.target.checked;
    setListSelectBook(temp);
    sumTotal(listSelectBook);
  };
  const handleChangeQuantity = (e, index) => {
    const temp = listSelectBook;
    temp[index].quantity = e.target.value;
    setListSelectBook(temp);
  };
  const handleQuantity = (value, index) => {
    listSelectBook[index].quantity += value;
    setListSelectBook([...listSelectBook]);
    sumTotal(listSelectBook);
  };

  const [address, setAddress] = useState("Chọn địa chỉ");

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const listAddress = [
    "Chọn địa chỉ",
    "102 P. Phạm Ngọc Thạch, Kim Liên, Đống Đa, Hà Nội",
    "119 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội",
    "Số 458 Minh Khai, Q. Hai Bà Trưng, Hà Nội",
    "191 Bà Triệu, Lê Đại Hành, Hoàn Kiếm, Hà Nội",
    "72 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội",
    "72A Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội",
    "04A Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội",
    "458 P. Minh Khai, Vĩnh Phú, Hai Bà Trưng, Hà Nội",
    "85 Đ. Lê Văn Lương, Nhân Chính, Thanh Xuân, Hà Nội",
  ];
  return (
    <section className="question-area pt-40px pb-40px">
      <NotificationContainer />
      <div className="container">
        <div className="filters pb-40px d-flex flex-wrap align-items-center justify-content-between">
          <h3 className="fs-22 fw-medium mr-0">Thêm mới post</h3>
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
                    {role ? (
                      <>
                        <TextField
                          required
                          id="filled-basic"
                          label="Tiêu đề post"
                          variant="filled"
                          fullWidth
                          {...register("title")}
                        />
                        {errors.title && (
                          <span className="error-message" role="alert">
                            {errors.title?.message}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Địa chỉ
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={address}
                            label="Địa chỉ"
                            onChange={handleChangeAddress}
                          >
                            {listAddress.map((add, index) => {
                              return (
                                <MenuItem value={add} key={index}>
                                  {add}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <TextField
                          required
                          id="filled-basic"
                          label="Tiêu đề post"
                          variant="filled"
                          defaultValue={"[Ký gửi]"}
                          fullWidth
                          {...register("title")}
                          style={{ display: "none" }}
                        />
                      </>
                    )}
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <TextField
                        id="filled-basic"
                        label="Số ngày cho thuê"
                        variant="filled"
                        type="text"
                        required
                        defaultValue={1}
                        {...register("noDays")}
                      />
                      {errors.noDays && (
                        <span className="error-message" role="alert">
                          {errors.noDays?.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Phí thuê"
                        variant="filled"
                        required
                        {...register("fee")}
                      />
                      {errors.fee && (
                        <span className="error-message" role="alert">
                          {errors.fee?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Tổng giá"
                        variant="filled"
                        disabled
                        value={total}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Mô tả về post"
                      multiline
                      rows={3}
                      variant="filled"
                      fullWidth
                      {...register("content")}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button className="btn theme-btn" type="submit">
                      Đăng post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="container">
                <div className="cart-form mb-50px table-responsive px-2">
                  <table className="table generic-table">
                    <thead>
                      <tr>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSelectBook &&
                        listSelectBook.map((book, index) => {
                          return (
                            <tr key={index} className="fw-normal">
                              <th scope="row">
                                <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                  <div className="media-body">
                                    <h5 className="fs-15 fw-medium">
                                      <Link to={`/detail-book/${book.id}`}>
                                        {book.name}
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </th>
                              <td>{book.price}</td>
                              <td>
                                <div className="quantity-item d-inline-flex align-items-center">
                                  <button
                                    className="qtyBtn qtyDec"
                                    type="button"
                                    onClick={() => handleQuantity(-1, index)}
                                    disabled={book.quantity === 0}
                                  >
                                    <i className="la la-minus"></i>
                                  </button>
                                  <input
                                    className="qtyInput"
                                    type="text"
                                    name="qty-input"
                                    value={book.quantity}
                                    onChange={(e) =>
                                      handleChangeQuantity(e, index)
                                    }
                                  />
                                  <button
                                    className="qtyBtn qtyInc"
                                    type="button"
                                    onClick={() => handleQuantity(1, index)}
                                    disabled={
                                      book.quantity === book.maxQuantity
                                    }
                                  >
                                    <i className="la la-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td>
                                <Checkbox
                                  onChange={(e) =>
                                    handleClickCheckbox(book, e, index)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="form-group mb-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
