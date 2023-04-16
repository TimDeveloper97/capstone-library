import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManagementSidebar() {
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
  ];
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="sidebar pb-45px position-sticky top-0 mt-2 pt-30px">
      <ul className="generic-list-item generic-list-item-highlight fs-15">
        {manageLinks &&
          manageLinks.map((link) => {
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
