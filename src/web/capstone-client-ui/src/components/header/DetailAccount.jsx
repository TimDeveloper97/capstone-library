import React from "react";
import { BookHalf, BoxArrowRight, Cart, PersonFillGear, Receipt } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUserSession } from "../../actions/auth";

export default function DetailAccount() {
  const iconSize = 26;

  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
  window.localStorage.clear();
  dispatch(clearUserSession());
    navigate('/', {replace: true});
  }
  return (
    <div className="detail-account">
      <div className="login-out">
        <Link to={"/login"} className="item-link">
          <span className="default-user"></span>
          {user.firstName ? <span>{`${user.lastName} ${user.firstName}`}</span> : <span>Đăng nhập/Đăng ký</span>}
        </Link>
      </div>
      <div className="accout-title">
        Quản lí đơn hàng
      </div>
      <div className="detail-item">
        <Cart color="Green" size={iconSize} /> Đơn mua
      </div>
      <div className="detail-item">
        <Receipt color="#FD8A8A" size={iconSize} /> Đơn bán
      </div>
      <div className="detail-item">
        <Link to={'/user/my-book'} className="item-link">
          <BookHalf  size={iconSize} color="#2F58CD" /> Sách của tôi
        </Link>
      </div>
      <div className="accout-title">
        Khác
      </div>
      <div className="detail-item">
       <Link to={'/user/profile'}  className="item-link">
       <PersonFillGear size={iconSize} /> Cài đặt tài khoản
       </Link>
      </div>
      
      {user.firstName && <div className="detail-item" style={{cursor: 'pointer'}} onClick={logOut}>
        <BoxArrowRight size={iconSize} /> Đăng xuất
      </div>}
    </div>
  );
}
