import React from "react";
import { BoxArrowRight, Cart, PersonFillGear, Receipt } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function DetailAccount(props) {
    const iconSize = 26;
  return (
    <div className="detail-account">
      <div className="login-out">
        <Link to={"/login"} className="item-link">
          <span className="default-user"></span>
          <span>Đăng nhập/Đăng ký</span>
        </Link>
      </div>
      <div className="accout-title">
        Quản lí đơn hàng
      </div>
      <div className="detail-item">
        <Cart color="Green" size={iconSize} /> Đơn mua
      </div>
      <div className="detail-item">
        <Receipt color="blue" size={iconSize} /> Đơn bán
      </div>
      <div className="accout-title">
        Khác
      </div>
      <div className="detail-item">
       <Link to={'/profile'} className="item-link">
       <PersonFillGear /> Cài đặt tài khoản
       </Link>
      </div>
      {props.isLogged && <div className="detail-item">
        <BoxArrowRight /> Đăng xuất
      </div>}
    </div>
  );
}
