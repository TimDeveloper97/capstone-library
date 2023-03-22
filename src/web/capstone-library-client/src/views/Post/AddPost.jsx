import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../actions/book";
import { Link } from "react-router-dom";
import { addPost } from "../../actions/post";

const schema = yup.object({
  title: yup.string().required("Tiêu đề post không được để trống"),
  noDays: yup.string().required("Số ngày cho thuê không được để trống"),
  fee: yup.string().required("Phí cho thuê không được để trống"),
});

export default function AddPost() {
  const dispatch = useDispatch();
  

  const books = useSelector((state) => state.book);
  useEffect(() => {
    dispatch(getBooks());
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

  const submitForm = (data, e) => {
    e.preventDefault();
    let postDetails = listSelectBook.filter(lsb => lsb.selected);
    data.postDetailDtos = postDetails.map(lsb => {
      return {
        bookDto: {
          id: lsb.id,
        },
        quantity: lsb.quantity
      }
    });
    console.log(data);
    dispatch(addPost(data));
  };

  const resetData = () => {
    resetField("name");
  };

  const [listSelectBook, setListSelectBook] = useState([]);
  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(total);
  }, [listSelectBook, total]);

  const sumTotal = (listSelected) => {
    let total = 0;
    listSelected.forEach(l => {
      l.selected && (total += l.quantity * l.price);
    });
    setTotal(total);
  }
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
  }
  return (
    <section className="question-area pt-40px pb-40px">
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
                            <tr key={index}>
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
                                    onChange={(e) => handleChangeQuantity(e, index)}
                                  />
                                  <button
                                    className="qtyBtn qtyInc"
                                    type="button"
                                    onClick={() => handleQuantity(1, index)}
                                    disabled={book.quantity === book.maxQuantity}
                                  >
                                    <i className="la la-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td>
                                <Checkbox
                                  onChange={(e) => handleClickCheckbox(book, e, index)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      {/* <tr>
                        <td colspan="6">
                          <div class="cart-actions d-flex align-items-center justify-content-between">
                            <div class="input-group my-2 w-auto">
                              <div class="input-group-append">
                                
                              </div>
                            </div>
                            <div class="flex-grow-1 text-right my-2">
                              <button class="btn theme-btn">Update cart</button>
                            </div>
                          </div>
                        </td>
                      </tr> */}
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
