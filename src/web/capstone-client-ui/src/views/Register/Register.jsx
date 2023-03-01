import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";

export default function Register() {
  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
  };
  return (
    <>
      <Form
        className="body-content"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="login-form">
          <h3>Đăng ký</h3>
          <Input
            type="text"
            placeholder="Nhập tên của bạn"
            required={true}
            errorMessage="Tên không được để trống"
            name="fullName"
          />
          <Input
            type="text"
            placeholder="Nhập SĐT của bạn"
            required={true}
            errorMessage="SĐT không được để trống"
            name="phoneNumber"
          />
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            required={true}
            errorMessage="Mật khẩu không được để trống"
            name="password"
          />
          <Input
            type="password"
            placeholder="Xác nhận mật khẩu"
            required={true}
            errorMessage="Xác nhận mật khẩu được để trống"
            name="confirmPassword"
          />
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
          <p>
            Bạn đã có tài khoản?{" "}
            <span>
              <Link to={"/login"}>Đăng nhập ngay</Link>
            </span>
          </p>
        </div>
      </Form>
    </>
  );
}
