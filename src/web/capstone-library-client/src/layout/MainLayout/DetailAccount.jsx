import {
  faArrowRightFromBracket,
  faBook,
  faBookOpen,
  faCartShopping,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearSession } from "../../actions/user";

export default function DetailAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role =
    JSON.parse(window.localStorage.getItem("user")).roles[0] === "ROLE_ADMIN";
  const logOut = () => {
    dispatch(clearSession());
    window.location.href = "/";
  };
  return (
    <div className="detail-account">
      {role ? null : (
        <>
          <div className="detail-item">
            <Link to={"/rentbook"} style={{ color: "#8DCBE6" }}>
              <FontAwesomeIcon icon={faBookOpen} />
              Sách đã thuê
            </Link>
          </div>
          <div className="detail-item">
            <Link to={"/user/add-post"} style={{ color: "#FAAB78" }}>
              <FontAwesomeIcon icon={faBook} /> Ký gửi sách
            </Link>
          </div>
          <div className="detail-item">
            <Link to={"/user/order"} className="item-link">
              <FontAwesomeIcon icon={faCartShopping} />
              Giỏ hàng
            </Link>
          </div>
        </>
      )}
      <div className="detail-item">
        <Link to={"/user/profile"} className="item-link">
          <FontAwesomeIcon icon={faGear} />
          Cài đặt tài khoản
        </Link>
      </div>
      <div
        className="detail-item"
        style={{ cursor: "pointer" }}
        onClick={logOut}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        Đăng xuất
      </div>
    </div>
  );
}
