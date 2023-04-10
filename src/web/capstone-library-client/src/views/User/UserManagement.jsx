import React, { useEffect, useState } from "react";
import { getAllUser, updateRoleUser } from "../../apis/user";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsisVertical,
  faLocationDot,
  faMobileScreenButton,
  faUser,
  faUserSlash,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import "./user-management.css";

export default function UserManagement() {
  const userRole = JSON.parse(window.localStorage.getItem("user")).roles[0];
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getAllUser();
      setUsers(data.value);
    };
    fetchUser();
  }, []);

  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    setListUser(users.sort((a, b) => a.id - b.id).slice());
  }, [users]);

  const changeUserRole = async (user) => {};

  const changeUserStatus = async (user, index) => {
    const {data} = await updateRoleUser(user.id, {
      id: user.id,
      status: user.status === 32 ? 0 : 32,
      roles: user.roles,
    });
    if(data.success){
      NotificationManager.success(data.message, "Thông báo", 2000);
      const temp = listUser;
    if (temp[index].status === 32) {
      temp[index].status = 0;
    } else {
      temp[index].status = 32;
    }
    setListUser(temp.slice());
  }else{
    NotificationManager.error(data.message, "Lỗi", 2000);
  }
    }
    

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
            <div className="col-md-10"></div>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="list-user">
              {listUser.map((user, index) => {
                return (
                  <div className="user-item row" key={index}>
                    <div className="col-md-2 avatar">
                      <FontAwesomeIcon icon={faUser} size="4x" />
                    </div>
                    <div className="col-md-4">
                      <h5>{user.lastName + " " + user.firstName}</h5>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} /> {user.address}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faWallet}
                          style={{ color: "green" }}
                        />{" "}
                        {user.balance}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FontAwesomeIcon icon={faMobileScreenButton} />{" "}
                        {user.phone}
                      </p>
                      <p>
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
                      </p>
                      <p>
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
                      </p>
                    </div>
                    <div className="col-md-2">
                      {user.roles[0] !== "ROLE_ADMIN" && (
                        <div className="button-action">
                          <div
                            className="tooltip-action"
                            style={{ width: "300px", right: "-65px" }}
                          >
                            <button className="btn btn-success">
                              <FontAwesomeIcon
                                icon={faCheck}
                                onClick={() => changeUserRole(user)}
                              />{" "}
                              Thăng cấp
                            </button>
                            <button
                              className={user.status === 32 ? "btn btn-danger": "btn btn-success"}
                              onClick={() => changeUserStatus(user, index)}
                            >
                              <FontAwesomeIcon icon={faUserSlash} /> {user.status === 32 ? "Vô hiệu hóa": "Kích hoạt"}
                            </button>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
