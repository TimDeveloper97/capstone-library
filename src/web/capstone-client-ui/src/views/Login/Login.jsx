import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import './login.css';

export default function Login() {

    const handleSubmit = () => {
        
    }
  return (
    <>
      <Form className="body-content">
        <div className="login-form">
          <h3>Đăng nhập</h3>
          <Input type="text" placeholder="Nhập số điện thoại" />
          <Form.Control type="password" placeholder="Nhập mật khẩu của bạn" />
          <Button variant="primary" onClick={handleSubmit}>
            Đăng nhập
          </Button>
          <a href="#">Quên mật khẩu?</a>
          <p>Chưa có tài khoản? <span><Link to={'/register'}>Đăng ký ngay</Link></span></p>
        </div>
      </Form>
    </>
  );
}
