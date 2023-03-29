import React from "react";
import { Link } from "react-router-dom";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../apis/user";

const schema = yup.object({
  username: yup.string().required("Tên sách không được để trống"),
  email: yup
    .string()
    .email("email không đúng định dạng")
    .required("Email không được để trống"),
});

export default function ForgotPassword() {
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
    const response = await resetPassword({
      id: data.username,
      email: data.email,
    });
    if (response.data.success) {
      NotificationManager.success(response.data.message, "Thông báo", 3000);
      resetField("username");
      resetField("email");
    } else {
      NotificationManager.error(response.data.message, "Lỗi", 3000);
    }
  };

  return (
    <section
      className="recovery-area pb-80px position-relative"
      style={{ paddingTop: "50px" }}
    >
      <NotificationContainer />
      <div className="container">
        <form
          noValidate
          onSubmit={handleSubmit(submitForm)}
          className="card card-item login-form"
        >
          <div className="card-body row p-0">
            <div className="col-lg-6">
              <div className="form-content py-4 pr-60px pl-60px border-right border-right-gray h-100 d-flex align-items-center justify-content-center">
                <img
                  src="/images/undraw-forgot-password.svg"
                  alt="img"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-5 mx-auto">
              <div className="form-action-wrapper py-5">
                <div className="form-group">
                  <h3 className="fs-22 pb-3 fw-bold">Quên mật khẩu?</h3>
                  <div className="divider">
                    <span></span>
                  </div>
                  <p className="pt-3">
                    Bạn chỉ cần nhập email đã đăng ký với tài khoản của mình
                  </p>
                </div>
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-18">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control form--control"
                    placeholder="Tên đăng nhập"
                    {...register("username")}
                  />
                  {errors.username && (
                    <span className="error-message" role="alert">
                      {errors.username?.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-18">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form--control"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="error-message" role="alert">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <button
                    id="send-message-btn"
                    className="btn theme-btn w-100"
                    type="submit"
                  >
                    Reset mật khẩu{" "}
                    <i className="la la-arrow-right icon ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p className="text-center">
          <Link to={"/login"} className="text-color hover-underline">
            Trở về đăng nhập
          </Link>
        </p>
      </div>
    </section>
  );
}
