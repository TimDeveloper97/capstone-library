import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/user";
import Notification from "../../components/Notification/Notification";
import DetailAccount from "./DetailAccount";
import "./header.css";

export default function Header() {
  const dispatch = useDispatch();
  const [roleAdmin, setRoleAdmin] = useState(false);
  const curUser = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    curUser && dispatch(getUser(curUser.id));
    setRoleAdmin(curUser?.roles[0] === "ROLE_ADMIN");
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <header className="header-area bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <div className="logo-box">
              <a href="/" className="logo">
                <img src="/images/logoC.png" alt="logo" />
              </a>
              <div className="user-action">
                <div
                  className="search-menu-toggle icon-element icon-element-xs shadow-sm mr-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Search"
                >
                  <i className="la la-search"></i>
                </div>
                <div
                  className="off-canvas-menu-toggle icon-element icon-element-xs shadow-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Main menu"
                >
                  <i className="la la-bars"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-10">
            <div className="menu-wrapper">
              <nav className="menu-bar mr-auto menu-bar-white">
                <ul>
                  <li>
                    <Link to={"/"}>Trang chủ</Link>
                  </li>
                  <li className="is-mega-menu">
                    <Link to={"/book"}>
                      Kho sách <i className="la la-angle-down fs-11"></i>
                    </Link>
                    <ul className="dropdown-menu-item">
                      <li>
                        <Link to={"/user/add-book"}>Thêm sách</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={"/post"}>
                      Post <i className="la la-angle-down fs-11"></i>
                    </Link>
                    {roleAdmin ? (
                      <ul className="dropdown-menu-item">
                        <li>
                          <Link to={"/user/add-post"}>Tạo post</Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                  {roleAdmin && (
                    <li>
                      <a href="#">
                        Quản lý <i className="la la-angle-down fs-11"></i>
                      </a>
                      <ul className="dropdown-menu-item">
                        <li>
                          <Link to={"/user/category"}>Quản lý thể loại</Link>
                        </li>
                        <li>
                          <Link to={"/user/order-status"}>
                            Quản lý đơn hàng
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/post-request"}>Quản lý post</Link>
                        </li>
                        <li>
                          <Link to={"/user/charge"}>Quản lý nạp tiền</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </nav>
              <div className="form-group mb-0">
                <Notification />
              </div>

              <div className="nav-right-button">
                {user?.firstName ? (
                  <span className="user-fullname">
                    <FontAwesomeIcon icon={faUserCheck} />
                    {"  " + user.lastName + " " + user.firstName}
                    <DetailAccount />
                  </span>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="btn theme-btn theme-btn-outline theme-btn-outline-white mr-2"
                    >
                      <i className="la la-sign-in mr-1"></i> Đăng nhập
                    </Link>
                    <Link
                      to={"/register"}
                      className="btn theme-btn theme-btn-white"
                    >
                      <i className="la la-user mr-1"></i> Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
