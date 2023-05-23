import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManagementSidebar() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const manageLinks = [
    {
      value: "/user/category",
      text: "Quản lý thể loại",
    },
    {
      value: "/user/order-status",
      text: "Quản lý đơn hàng",
    },
    {
      value: "/user/post-request",
      text: "Quản lý yêu cầu ký gửi",
    },
    {
      value: "/user/book-management",
      text: "Quản lý sách",
    },
  ];
  const adminManageLinks = [
    {
      value: "/user/user-management",
      text: "Quản lý người dùng",
    },
    {
      value: "/user/charge",
      text: "Quản lý nạp tiền",
    }
  ];

  const userLinks = [
    {
      value: "/user/my-book-management",
      text: "Sách của tôi",
    },
    {
      value: "/user/deposit-book",
      text: "Sách ký gửi",
    },
    {
      value: "/user/rent-book",
      text: "Sách đã thuê",
    },
  ]

  const location = useLocation();

  return (
    <div className="sidebar pb-45px position-sticky top-70 mt-2 pt-30px">
      <h5 className="text-center">{user.lastName + " " + user.firstName}</h5>
      <h6 className="text-center">{user.roles[0] === "ROLE_ADMIN" ? "admin" : user.roles[0] === "ROLE_MANAGER_POST" ? "quản lý" : "người dùng"}</h6>
      <ul className="generic-list-item generic-list-item-highlight fs-15" style={{marginTop: "15px"}}>
        {user.roles[0] === "ROLE_ADMIN"
          ? adminManageLinks.map((link) => {
              return (
                <li
                  className={
                    location.pathname === link.value ? "lh-26 active" : "lh-26"
                  }
                  key={link.value}
                >
                  <Link to={link.value}>{link.text}</Link>
                </li>
              );
            })
          : user.roles[0] === "ROLE_MANAGER_POST" ? manageLinks.map((link) => {
            return (
              <li
                className={
                  location.pathname === link.value ? "lh-26 active" : "lh-26"
                }
                key={link.value}
              >
                <Link to={link.value}>{link.text}</Link>
              </li>
            );
          }) : userLinks.map((link) => {
            return (
              <li
                className={
                  location.pathname === link.value ? "lh-26 active" : "lh-26"
                }
                key={link.value}
              >
                <Link to={link.value}>{link.text}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
