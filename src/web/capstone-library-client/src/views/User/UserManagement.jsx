import React, { useEffect, useState } from "react";
import { getAllUser } from "../../apis/user";
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getAllUser();
      setUsers(data);
    };
    fetchUser();
  }, []);

  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    setListUser(users.sort((a, b) => a.id - b.id).slice());
  }, [users]);

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
                      <p>{user.roles[0]?.name}</p>
                    </div>
                    <div className="col-md-2">
                      <div className="button-action">
                        <div className="tooltip-action">
                          <button className="btn btn-success">
                            <FontAwesomeIcon icon={faCheck} /> Thăng cấp
                          </button>
                          <button className="btn btn-danger">
                            <FontAwesomeIcon icon={faUserSlash} /> Vô hiệu hóa
                          </button>
                        </div>
                        <span>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                      </div>
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
