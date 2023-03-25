import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <section
      class="recovery-area pb-80px position-relative"
      style={{ paddingTop: "50px" }}
    >
      <div class="container">
        <form action="#" class="card card-item login-form">
          <div class="card-body row p-0">
            <div class="col-lg-6">
              <div class="form-content py-4 pr-60px pl-60px border-right border-right-gray h-100 d-flex align-items-center justify-content-center">
                <img
                  src="/images/undraw-forgot-password.svg"
                  alt="img"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="col-lg-5 mx-auto">
              <div class="form-action-wrapper py-5">
                <div class="form-group">
                  <h3 class="fs-22 pb-3 fw-bold">Quên mật khẩu?</h3>
                  <div class="divider">
                    <span></span>
                  </div>
                  <p class="pt-3">
                    Bạn chỉ cần nhập email đã đăng ký với tài khoản của mình
                  </p>
                </div>
                <div class="form-group">
                  <label class="fs-14 text-black fw-medium lh-18">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    name="email"
                    class="form-control form--control"
                    placeholder="Tên đăng nhập"
                  />
                </div>
                <div class="form-group">
                  <label class="fs-14 text-black fw-medium lh-18">Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control form--control"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <button
                    id="send-message-btn"
                    class="btn theme-btn w-100"
                    type="submit"
                  >
                    Reset mật khẩu <i class="la la-arrow-right icon ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p class="text-center">
          <Link to={"/login"} class="text-color hover-underline">
            Trở về đăng nhập
          </Link>
        </p>
      </div>
    </section>
  );
}
