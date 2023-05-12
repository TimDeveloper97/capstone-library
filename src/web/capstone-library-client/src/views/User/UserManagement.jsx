import React, { useEffect, useState } from "react";
import { getAllUser, updateRoleUser } from "../../apis/user";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faChevronLeft,
  faChevronRight,
  faDownLong,
  faEllipsisVertical,
  faSearch,
  faUpLong,
  faUserCheck,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import "./user-management.css";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { formatMoney } from "../../helper/helpFunction";
import { MenuItem, Select } from "@mui/material";

export default function UserManagement() {
  const userRole = JSON.parse(window.localStorage.getItem("user")).roles[0];
  const [users, setUsers] = useState([]);
  const pageSize = 5;
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getAllUser();
      setUsers(data.value ? data.value : []);
      //setNumPage(data.value ? Math.ceil(data.value.length / pageSize) : 1);
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
      NotificationManager.success(data.message, "Thông báo", 1000);
      const temp = listUser;
      if (temp[index].roles[0] === "ROLE_USER") {
        temp[index].roles = ["ROLE_MANAGER_POST", "ROLE_USER"];
      } else {
        temp[index].roles = ["ROLE_USER"];
      }
      setListUser(temp.slice());
    } else {
      NotificationManager.error(data.message, "Lỗi", 1000);
    }
  };

  const changeUserStatus = async (user, index) => {
    const { data } = await updateRoleUser(user.id, {
      id: user.id,
      status: user.status === 32 ? 0 : 32,
      roles: user.roles,
    });
    if (data.success) {
      NotificationManager.success(data.message, "Thông báo", 1000);
      const temp = listUser;
      if (temp[index].status === 32) {
        temp[index].status = 0;
      } else {
        temp[index].status = 32;
      }
      setListUser(temp.slice());
    } else {
      NotificationManager.error(data.message, "Lỗi", 1000);
    }
  };
  // const [curPage, setCurPage] = useState(1);
  // const [numPage, setNumPage] = useState(3);
  // useEffect(() => {
  //   setListUser(
  //     users
  //       .sort((a, b) => a.id - b.id)
  //       .slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize)
  //   );
  // }, [curPage]);

  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [status, setStatus] = useState(-1);
  const listStatus = [
    {
      value: -1,
      text: "--Chọn trạng thái--",
    },
    {
      value: 32,
      text: "Đang hoạt động",
    },
    {
      value: 0,
      text: "Không hoạt động",
    },
  ];
  const handleChangeSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleClickSearch = () => {
    let temp = users;
    temp = temp.filter((t) => t.firstName.indexOf(searchName) !== -1);
    temp = temp.filter((t) => t.id.indexOf(searchUser) !== -1);
    temp = temp.filter((t) => t.phone?.indexOf(searchPhone) !== -1);
    status !== -1 && (temp = temp.filter((t) => t.status === status));
    setListUser(temp.slice());
  };
  const handleClickReset = () => {
    setSearchName("");
    setSearchPhone("");
    setSearchUser("");
    setStatus(-1);
    setListUser(users.slice());
  };

  return users ? (
    <>
      <section className="cart-area position-relative">
        <NotificationContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-2" style={{ background: "#fff" }}>
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
              <div className="cart-form table-responsive px-2">
                <div className="search-card">
                  <div className="row">
                    <h4>Tiêu chí tìm kiếm</h4>
                    <div className="col-md-4">
                      <div className="input-search">
                        <label htmlFor="titleSearch">Tên:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="titleSearch">Tài khoản:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchUser}
                          onChange={(e) => setSearchUser(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-search">
                        <label htmlFor="titleSearch">Số điện thoại:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchPhone}
                          onChange={(e) => setSearchPhone(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Trạng thái:</label>
                        <div className="input-param" style={{ padding: 0 }}>
                          <Select
                            id="demo-simple-select"
                            value={status}
                            name="productName"
                            onChange={handleChangeSelect}
                            style={{ width: "inherit" }}
                          >
                            {listStatus.map((ls, index) => (
                              <MenuItem value={ls.value} key={index}>
                                {ls.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-4"
                      style={{
                        margin: "20px 0",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="btn-wrapper">
                        <button
                          className="btn btn-primary ml-10"
                          onClick={() => handleClickSearch()}
                        >
                          <FontAwesomeIcon icon={faSearch} /> Tìm
                        </button>
                        <button
                          className="btn btn-secondary ml-10"
                          onClick={() => handleClickReset()}
                        >
                          <FontAwesomeIcon icon={faBroom} /> Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="search-result">
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
                              <td style={{width: "150px"}}>{user.address}</td>
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
                                    : "khách hàng"}
                                </span>
                              </td>
                              <td
                                style={{
                                  position: "relative",
                                }}
                              >
                                <div className="button-action">
                                  <div className="tooltip-action">
                                    <button
                                      className={
                                        user.roles[0] === "ROLE_MANAGER_POST"
                                          ? "btn btn-danger"
                                          : "btn btn-success"
                                      }
                                      onClick={() =>
                                        changeUserRole(user, index)
                                      }
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
                                      onClick={() =>
                                        changeUserStatus(user, index)
                                      }
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
                                  </div>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faEllipsisVertical}
                                    />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      {/* <tr className="fw-normal">
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
                      </tr> */}
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
