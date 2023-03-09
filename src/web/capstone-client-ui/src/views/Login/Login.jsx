import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./login.css";
import axiosIntance from "../../helper/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const schema = yup.object({
  username: yup.string().required("Tên đăng nhập không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    axiosIntance
      .post("/login", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        if(err.response.status === 401){
          NotificationManager.error("Tên đăng nhập hoặc mật khẩu không chính xác", "Thông báo", 2000);
        }
      });
  };

  return (
    <>
      <Form className="body-content" onSubmit={handleSubmit(onSubmit)}>
      <NotificationContainer />
        <div className="login-form">
          <h3>Đăng nhập</h3>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            {...register("username")}
          />
          {errors.username && (
            <span className="error-message" role="alert">
              {errors.username?.message}
            </span>
          )}
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            {...register("password")}
          />
          {errors.password && (
            <span className="error-message" role="alert">
              {errors.password?.message}
            </span>
          )}
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
          <a href="#">Quên mật khẩu?</a>
          <p>
            Chưa có tài khoản?{" "}
            <span>
              <Link to={"/register"}>Đăng ký ngay</Link>
            </span>
          </p>
        </div>
      </Form>
    </>
  );
}
