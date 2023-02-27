import React from "react";
import { Button, Form } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function Login() {
  return (
    <>
      <Header />
      <Form>
        <div className="login-form">
          <p>Đăng nhập</p>
          <Form.Control type="text" placeholder="Nhập SĐT của bạn" />
          <Form.Control type="password" placeholder="Nhập mật khẩu của bạn" />
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
          <a href="#">Quên mật khẩu?</a>
          <p>Chưa có tài khoản? <span><a href="#">Đăng ký ngay</a></span></p>
        </div>
      </Form>
      <Footer />
    </>
  );
}
