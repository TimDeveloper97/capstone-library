import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { getUser, updateUser } from "../../actions/user";
import axiosIntance from "../../helper/axios";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

const schema = yup.object({
  firstName: yup.string().required("Tên không được để trống"),
});

export default function Setting() {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    dispatch(getUser(user));
  }, []);

  const userInfo = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const switchEdit = () => {
    setEditable(!editable);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const putData = data;
    putData.id = userInfo.id;
    putData.balance = userInfo.balance;
    dispatch(updateUser(putData));
    switchEdit();
  };
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cfPass, setCfPass] = useState("");
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    axiosIntance
      .post("/change-password", {
        oldPass,
        newPass,
      })
      .then((response) => {
        NotificationManager.success(response.data.message, "Thông báo", 2000);

        setCfPass("");
        setNewPass("");
        setOldPass("");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.response.data.message, "Lỗi", 2000);
      });
  };
  return (
    <>
      <section className="hero-area bg-white shadow-sm overflow-hidden pt-60px">
        <span className="stroke-shape stroke-shape-1"></span>
        <span className="stroke-shape stroke-shape-2"></span>
        <span className="stroke-shape stroke-shape-3"></span>
        <span className="stroke-shape stroke-shape-4"></span>
        <span className="stroke-shape stroke-shape-5"></span>
        <span className="stroke-shape stroke-shape-6"></span>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="hero-content d-flex align-items-center">
                <div className="icon-element shadow-sm flex-shrink-0 mr-3 border border-gray lh-55">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    viewBox="0 0 24 24"
                    width="32px"
                    fill="#2d86eb"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                </div>
                <h2 className="section-title fs-30">Cài đặt tài khoản</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-content">
                <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                  <div className="media-img media--img">
                    <img src="/images/img4.jpg" alt="avatar" />
                  </div>
                  <div className="media-body">
                    <h5>{userInfo.lastName + " " + userInfo.firstName}</h5>
                    <small className="meta d-block lh-20 pb-2">
                      <span>
                        {userInfo.address}, thành viên từ 1 tháng trước
                      </span>
                    </small>
                    <div className="stats fs-14 fw-medium d-flex align-items-center lh-18">
                      <span className="text-black pr-2" title="Reputation">
                        <FontAwesomeIcon
                          icon={faWallet}
                          style={{ color: "green" }}
                        />{" "}
                        {userInfo.balance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul
            className="nav nav-tabs generic-tabs generic--tabs generic--tabs-2 mt-4"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="edit-profile-tab"
                data-toggle="tab"
                href="#edit-profile"
                role="tab"
                aria-controls="edit-profile"
                aria-selected="true"
              >
                Thông tin của bạn
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="change-password-tab"
                data-toggle="tab"
                href="#change-password"
                role="tab"
                aria-controls="change-password"
                aria-selected="false"
              >
                Đổi mật khẩu
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="user-details-area pt-40px pb-40px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="tab-content mb-50px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="edit-profile"
                  role="tabpanel"
                  aria-labelledby="edit-profile-tab"
                >
                  <div className="user-panel-main-bar">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="user-panel">
                        <div className="hero-btn-box text-right py-3">
                          {editable && (
                            <button
                              type="submit"
                              className="btn theme-btn theme-btn-outline theme-btn-outline-gray"
                            >
                              <i className="la la-gear mr-1"></i> Lưu thông tin
                            </button>
                          )}
                          {!editable && (
                            <button
                              type="button"
                              onClick={switchEdit}
                              className="btn theme-btn theme-btn-outline theme-btn-outline-gray"
                            >
                              <i className="la la-gear mr-1"></i> Sửa thông tin
                            </button>
                          )}
                        </div>
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Họ tên</p>
                              </div>
                              <div className="col-sm-9">
                                {editable ? (
                                  <>
                                    <TextField
                                      margin="dense"
                                      label="Họ"
                                      type="text"
                                      variant="standard"
                                      defaultValue={userInfo.lastName}
                                      {...register("lastName")}
                                      style={{ marginRight: "30px" }}
                                    />
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      label="Tên"
                                      type="text"
                                      variant="standard"
                                      defaultValue={userInfo.firstName}
                                      {...register("firstName")}
                                    />
                                  </>
                                ) : (
                                  <p className="text-muted mb-0">
                                    {userInfo.lastName +
                                      " " +
                                      userInfo.firstName}
                                  </p>
                                )}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Email</p>
                              </div>
                              <div className="col-sm-9">
                                {editable ? (
                                  <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    defaultValue={userInfo.email}
                                    {...register("email")}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {userInfo.email}
                                  </p>
                                )}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Số điện thoại</p>
                              </div>
                              <div className="col-sm-9">
                                {editable ? (
                                  <TextField
                                    margin="dense"
                                    label="Số điện thoại"
                                    type="tel"
                                    variant="standard"
                                    defaultValue={userInfo.phone}
                                    {...register("phone")}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {userInfo.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Số dư tài khoản</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {userInfo.balance}
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Địa chỉ</p>
                              </div>
                              <div className="col-sm-9">
                                {editable ? (
                                  <TextField
                                    margin="dense"
                                    label="Địa chỉ"
                                    type="text"
                                    variant="standard"
                                    defaultValue={userInfo.address}
                                    {...register("address")}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {userInfo.address}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="change-password"
                  role="tabpanel"
                  aria-labelledby="change-password-tab"
                >
                  <NotificationContainer />
                  <div className="user-panel-main-bar">
                    <div className="user-panel">
                      <div className="bg-gray p-3 rounded-rounded">
                        <h3 className="fs-17">Đổi mật khẩu</h3>
                      </div>
                      <div className="settings-item mb-30px">
                        <form onSubmit={(e) => handleSubmitPassword(e)}>
                          <div className="form-group">
                            <TextField
                              margin="dense"
                              label="Mật khẩu cũ"
                              type="password"
                              variant="standard"
                              fullWidth
                              value={oldPass}
                              onChange={(e) => setOldPass(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              margin="dense"
                              label="Mật khẩu mới"
                              type="password"
                              variant="standard"
                              fullWidth
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              margin="dense"
                              label="Xác nhận mật khẩu"
                              type="password"
                              variant="standard"
                              fullWidth
                              value={cfPass}
                              onChange={(e) => setCfPass(e.target.value)}
                            />
                            <p className="fs-14 lh-18 py-2">
                              Passwords must contain at least eight characters,
                              including at least 1 letter and 1 number.
                            </p>
                          </div>
                          <div className="submit-btn-box pt-3">
                            <button className="btn theme-btn" type="submit">
                              Đổi mật khẩu
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="border border-gray p-4">
                        <h4 className="fs-18 mb-2">Quên mật khẩu</h4>
                        <p className="pb-3">
                          Nếu như quên mật khẩu, bạn có thể lấy lại mật khẩu của
                          mình bằng email
                        </p>
                        <Link
                          to={"/recovery-password"}
                          className="btn theme-btn theme-btn-sm theme-btn-white"
                        >
                          Lấy lại mật khẩu{" "}
                          <i className="la la-arrow-right ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
