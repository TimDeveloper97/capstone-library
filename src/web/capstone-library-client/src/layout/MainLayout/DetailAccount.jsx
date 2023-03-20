import {
  faArrowRightFromBracket,
  faBook,
  faBookOpen,
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
  const logOut = () => {
    dispatch(clearSession());
    navigate("/", { replace: true });
  };
  return (
    <div className="detail-account">
      <div className="detail-item">
        <Link to={'/rentbook'} style={{color: '#8DCBE6'}}>
        <FontAwesomeIcon icon={faBookOpen} />
        Sách đã thuê
        </Link>
      </div>
      <div className="detail-item">
        <Link to={'/upbook'} style={{color: '#FAAB78'}}>
        <FontAwesomeIcon icon={faBook} /> Sách ký gửi
        </Link>
      </div>
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
