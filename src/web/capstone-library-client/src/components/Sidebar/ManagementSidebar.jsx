import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManagementSidebar() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const manageLinks = [
    {
      value: "/user/category",
      text: "Quản lí thể loại",
    },
    {
      value: "/user/order-status",
      text: "Quản lí đơn hàng",
    },
    {
      value: "/user/post-request",
      text: "Quản lí yêu cầu ký gửi",
    },
    {
      value: "/user/book-management",
      text: "Quản lí sách",
    },
  ];
  const adminManageLinks = [
    {
      value: "/user/user-management",
      text: "Quản lí người dùng",
    },
    {
      value: "/user/charge",
      text: "Quản lí nạp tiền",
    },
  ];
  const location = useLocation();

  return (
    <div className="sidebar pb-45px position-sticky top-70 mt-2 pt-30px">
      <h5 className="text-center">{user.lastName + " " + user.firstName}</h5>
      <h6 className="text-center">{user.roles[0] === "ROLE_ADMIN" ? "admin" : "quản lý"}</h6>
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
          : manageLinks.map((link) => {
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
