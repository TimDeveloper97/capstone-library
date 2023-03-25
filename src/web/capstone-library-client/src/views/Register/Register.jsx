import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axiosIntance from "../../helper/axios";

const schema = yup.object({
  username: yup.string().required("Tên đăng nhập không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
  cfpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Phải trùng với mật khẩu")
    .required("Xác nhận mật khẩu không được để trống"),
  firstName: yup.string().required("Tên không được để trống"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const resetInput = (inputArray) => {
    inputArray.forEach(field => {
        resetField(field);
    });
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    const { firstName, lastName, password, username } = data;
    axiosIntance
      .post("/register", {
        id: username,
        firstName,
        lastName,
        password,
      })
      .then((response) => {
        const {message} = response.data;
        NotificationManager.success(message, "Thông báo", 2000);
        resetInput(["firstName", "lastName", "username", "password", "cfpassword"]);
      })
      .catch((err) => {
        const {message} = err.response.data;
        NotificationManager.error(message, "Thông báo", 2000);
      });
  };

  return (
    <section className="login-area pt-80px pb-80px position-relative">
      <div className="shape-bg position-absolute top-0 left-0 w-100 h-100 opacity-2 z-index-n1"></div>
      <div className="container">
        <form
          className="card card-item login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-body row p-0">
            <NotificationContainer />
            <div className="col-lg-6">
              <div className="form-content py-4 pr-60px pl-60px border-right border-right-gray h-100 d-flex align-items-center justify-content-center">
                <img
                  src="./images/undraw-remotely.svg"
                  alt="imageLogin"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-5 mx-auto" style={{ paddingTop: "20px" }}>
              <h3 className="fs-22 pb-3 fw-bold">
                Đăng ký tài khoản của chúng tôi ngay
              </h3>
              <div>
                <div className="login-content">
                  <div className="content-row">
                    <div className="fname">
                      <TextField
                        type="text"
                        label="Tên"
                        margin="dense"
                        variant="standard"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <span className="error-message" role="alert">
                          {errors.firstName?.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <TextField
                        type="text"
                        label="Họ"
                        margin="dense"
                        variant="standard"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <span className="error-message" role="alert">
                          {errors.lastName?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="content-row">
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Tên đăng nhập"
                      type="text"
                      fullWidth
                      variant="standard"
                      {...register("username")}
                    />
                  </div>
                  {errors.username && (
                    <span className="error-message" role="alert">
                      {errors.username?.message}
                    </span>
                  )}
                  <div className="content-row">
                    <TextField
                      margin="dense"
                      label="Mật khẩu"
                      type="password"
                      fullWidth
                      variant="standard"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <span className="error-message" role="alert">
                      {errors.password?.message}
                    </span>
                  )}
                  <div className="content-row">
                    <TextField
                      margin="dense"
                      label="Xác nhận mật khẩu"
                      type="password"
                      fullWidth
                      variant="standard"
                      {...register("cfpassword")}
                    />
                  </div>
                  {errors.cfpassword && (
                    <span className="error-message" role="alert">
                      {errors.cfpassword?.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="btn-box btn-login">
                  <button type="submit" className="btn theme-btn w-100">
                    Đăng ký <i className="la la-arrow-right icon ml-1"></i>
                  </button>
                </div>
                <div className="login-suggest">
                  <span>Bạn đã có tài khoản?</span>{" "}
                  <Link to={"/login"}>Đăng nhập ngay</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
