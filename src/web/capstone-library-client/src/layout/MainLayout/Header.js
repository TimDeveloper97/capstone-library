import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import DetailAccount from "./DetailAccount";
import "./header.css";

export default function Header() {
  const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <header className="header-area bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <div className="logo-box">
              <a href="index.html" className="logo">
                <img src="images/logo-white.png" alt="logo" />
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
                    <Link to={'/'}>
                      Trang chủ <i className="la la-angle-down fs-11"></i>
                    </Link>
                    <ul className="dropdown-menu-item">
                      <li>
                        <a href="index.html">Home - landing</a>
                      </li>
                    </ul>
                  </li>
                  <li className="is-mega-menu">
                    <a href="#">
                      Kho sách <i className="la la-angle-down fs-11"></i>
                    </a>
                    <div className="dropdown-menu-item mega-menu">
                      <ul className="row">
                        <li className="col-lg-3">
                          <a href="user-profile.html">user profile</a>
                          <a href="notifications.html">Notifications</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="#">
                      Post <i className="la la-angle-down fs-11"></i>
                    </a>
                    <ul className="dropdown-menu-item">
                      <li>
                        <a href="blog-grid-no-sidebar.html">grid no sidebar</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>

              <form method="post" className="mr-4">
                <div className="form-group mb-0">
                  <input
                    className="form-control form--control form--control-bg-gray text-white"
                    type="text"
                    name="search"
                    placeholder="Type your search words..."
                  />
                  <button className="form-btn text-white-50" type="button">
                    <i className="la la-search"></i>
                  </button>
                </div>
              </form>
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
