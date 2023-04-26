import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

import "react-notifications/lib/notifications.css";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosIntance from "../../helper/axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user";

const schema = yup.object({
  username: yup.string().required("Tên đăng nhập không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const user = window.localStorage.getItem("user");
  if (user) {
    window.localStorage.clear();
    window.location.reload();
  }
  const from = location.state?.from || { pathname: "/" };
  const onSubmit = (data, e) => {
    e.preventDefault();
    axiosIntance
      .post("/login", data)
      .then((response) => {
        if (response.data.hasOwnProperty("success")) {
          NotificationManager.error(response.data.message, "Lỗi", 2000);
        } else {
          const { value, token } = response.data;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("user", JSON.stringify(value));
          dispatch(getUser(value));
          if (from.pathname === "/") {
            if (value.roles[0] === "ROLE_ADMIN") {
              window.location.href = "/user/user-management";
            }else if(value.roles[0] === "ROLE_MANAGER_POST") {
              window.location.href = "/user/category";
            }else {
              window.location.href = from.pathname;
            }
          } else {
            window.location.href = from.pathname;
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          NotificationManager.error(
            "Tên đăng nhập hoặc mật khẩu không chính xác",
            "Thông báo",
            2000
          );
        }
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
                Đăng nhập vào trang web
              </h3>
              <div>
                <div className="login-content">
                  <div className="content-row">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
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
                      id="name"
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
                    <span style={{ paddingTop: "5px" }}>
                      <Link to={"/forgot-password"} style={{textDecoration: "underline", color: "#0d6efd" }}>Quên mật khẩu?</Link>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="btn-box btn-login">
                  <button type="submit" className="btn theme-btn w-100">
                    Đăng nhập <i className="la la-arrow-right icon ml-1"></i>
                  </button>
                </div>
                <div className="login-suggest">
                  <span>Bạn chưa có tài khoản?</span>{" "}
                  <Link to={"/register"} style={{textDecoration: "underline", color: "#0d6efd" }}>Đăng ký ngay</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
