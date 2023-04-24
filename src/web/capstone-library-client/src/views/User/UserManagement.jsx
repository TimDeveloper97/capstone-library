import React, { useEffect, useState } from "react";
import { getAllUser, updateRoleUser } from "../../apis/user";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDownLong,
  faUpLong,
  faUserCheck,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import "./user-management.css";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { formatMoney } from "../../helper/helpFunction";

export default function UserManagement() {
  const userRole = JSON.parse(window.localStorage.getItem("user")).roles[0];
  const [users, setUsers] = useState([]);
  const pageSize = 5;
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getAllUser();
      setUsers(data.value ? data.value : []);
      setNumPage(data.value ? Math.ceil(data.value.length / pageSize) : 1);
    };
    fetchUser();
  }, []);

  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    setListUser(users.sort((a, b) => a.id - b.id).slice(0, pageSize));
  }, [users]);

  const changeUserRole = async (user, index) => {
    const { data } = await updateRoleUser(user.id, {
      id: user.id,
      status: user.status,
      roles:
        user.roles[0] === "ROLE_USER"
          ? ["ROLE_MANAGER_POST", "ROLE_USER"]
          : ["ROLE_USER"],
    });
    if (data.success) {
      NotificationManager.success(data.message, "Thông báo", 2000);
      const temp = listUser;
      if (temp[index].roles[0] === "ROLE_USER") {
        temp[index].roles = ["ROLE_MANAGER_POST", "ROLE_USER"];
      } else {
        temp[index].roles = ["ROLE_USER"];
      }
      setListUser(temp.slice());
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const changeUserStatus = async (user, index) => {
    const { data } = await updateRoleUser(user.id, {
      id: user.id,
      status: user.status === 32 ? 0 : 32,
      roles: user.roles,
    });
    if (data.success) {
      NotificationManager.success(data.message, "Thông báo", 2000);
      const temp = listUser;
      if (temp[index].status === 32) {
        temp[index].status = 0;
      } else {
        temp[index].status = 32;
      }
      setListUser(temp.slice());
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };
  const [curPage, setCurPage] = useState(1);
  const [numPage, setNumPage] = useState(3);
  useEffect(() => {
    setListUser(
      users
        .sort((a, b) => a.id - b.id)
        .slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize)
    );
  }, [curPage]);

  return users ? (
    <>
      <section className="hero-area bg-white shadow-sm pt-80px pb-80px">
        {/* <NotificationContainer /> */}
        <span className="icon-shape icon-shape-1"></span>
        <span className="icon-shape icon-shape-2"></span>
        <span className="icon-shape icon-shape-3"></span>
        <span className="icon-shape icon-shape-4"></span>
        <span className="icon-shape icon-shape-5"></span>
        <span className="icon-shape icon-shape-6"></span>
        <span className="icon-shape icon-shape-7"></span>
        <div className="container">
          <div className="hero-content text-center">
            <h2 className="section-title pb-3">Danh sách người dùng</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <NotificationContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-2" style={{ background: "#fff" }}>
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
              <div className="">
                <div className="cart-form mb-50px table-responsive px-2">
                  <table className="table generic-table">
                    <thead>
                      <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Tài khoản</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số dư</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Phân quyền</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUser &&
                        listUser.map((user, index) => {
                          return (
                            <tr key={index} className="fw-normal">
                              <th scope="row">
                                <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                  <div className="media-body">
                                    <h6>
                                      {user.lastName + " " + user.firstName}
                                    </h6>
                                  </div>
                                </div>
                              </th>
                              <td>{user.id}</td>
                              <td>{user.address}</td>
                              <td>
                                <div className="quantity-item d-inline-flex align-items-center">
                                  {formatMoney(user.balance)} đ
                                </div>
                              </td>
                              <td>{user.phone}</td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor:
                                      user.status === 32 ? "green" : "red",
                                    color: "#fff",
                                    padding: "5px 10px 5px 10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {user.status === 32
                                    ? "Đang hoạt động"
                                    : "Không hoạt động"}
                                </span>
                              </td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor: "#576CBC",
                                    color: "#fff",
                                    padding: "5px 10px 5px 10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {user.roles[0] === "ROLE_ADMIN"
                                    ? "admin"
                                    : user.roles[0] === "ROLE_MANAGER_POST"
                                    ? "quản lý"
                                    : "người dùng"}
                                </span>
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <button
                                  className={
                                    user.roles[0] === "ROLE_MANAGER_POST"
                                      ? "btn btn-danger"
                                      : "btn btn-success"
                                  }
                                  onClick={() => changeUserRole(user, index)}
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      user.roles[0] === "ROLE_MANAGER_POST"
                                        ? faDownLong
                                        : faUpLong
                                    }
                                  />{" "}
                                  {user.roles[0] === "ROLE_MANAGER_POST"
                                    ? "Giáng cấp"
                                    : "Thăng cấp"}
                                </button>
                                <button
                                  className={
                                    user.status === 32
                                      ? "btn btn-danger"
                                      : "btn btn-success"
                                  }
                                  onClick={() => changeUserStatus(user, index)}
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      user.status === 32
                                        ? faUserLock
                                        : faUserCheck
                                    }
                                  />{" "}
                                  {user.status === 32
                                    ? "Vô hiệu hóa"
                                    : "Kích hoạt"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      <tr className="fw-normal">
                        <td colSpan={8}>
                          <div className="table-paging">
                            Trang: {curPage} trên {numPage}{" "}
                            <button
                              onClick={() => setCurPage((prev) => --prev)}
                              disabled={curPage === 1}
                            >
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </button>{" "}
                            <button
                              onClick={() => setCurPage((prev) => ++prev)}
                              disabled={curPage === numPage}
                            >
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
