import {
  faArrowRightFromBracket,
  faBook,
  faBookOpen,
  faCartShopping,
  faGear,
  faUser,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearSession } from "../../actions/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getConfig, updateConfig } from "../../apis/user";

const schema = yup.object({
  fee: yup.number().required("Phí không được để trống"),
  days: yup.number().required("Ngày không hợp lệ"),
});

export default function DetailAccount({ isCollapse }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = JSON.parse(window.localStorage.getItem("user")).roles[0];
  const logOut = () => {
    dispatch(clearSession());
    window.location.href = "/";
  };
  const [configs, setConfigs] = useState([]);
  const handleClickConfig = async (e) => {
    e.preventDefault();
    // const { data } = await getConfig();
    // setConfigs(data.value.sort((a, b) => a.id - b.id).slice());
    setOpen(true);
  };
  useEffect(() => {
    const getConfigs = async () => {
      const { data } = await getConfig();
      data.success &&
        setConfigs(data.value.sort((a, b) => a.id - b.id).slice());
    };
    getConfigs();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const submitForm = async (data) => {
    const res1 = await updateConfig({ key: "discount", value: data.fee });
    const res2 = await updateConfig({ key: "days", value: data.days });
    alert(res1.data.message);
  };
  const handleChange = (index, e) => {
    const temp = configs;
    temp[index].value = e.target.value;
    console.log(e.target.value, index);
    setConfigs(temp.slice());
  };

  return (
    <>
      <div
        className="detail-account"
        style={{ right: isCollapse ? "-40px" : "-10px" }}
      >
        {role === "ROLE_USER" ? (
          <>
            <div className="detail-item">
              <Link to={"/user/rent-book"} style={{ color: "#8DCBE6" }}>
                <FontAwesomeIcon icon={faBookOpen} />
                Sách đã thuê
              </Link>
            </div>
            <div className="detail-item">
              <Link to={"/user/deposit-book"} style={{ color: "#FAAB78" }}>
                <FontAwesomeIcon icon={faBook} /> Ký gửi sách
              </Link>
            </div>
          </>
        ) : null}
        {role === "ROLE_ADMIN" && (
          <div className="detail-item">
            <a
              href="#"
              className="item-link"
              onClick={(e) => handleClickConfig(e)}
            >
              <FontAwesomeIcon icon={faWrench} />
              Cấu hình
            </a>
          </div>
        )}
        <div className="detail-item">
          <Link to={"/user/profile"} className="item-link">
            <FontAwesomeIcon icon={faGear} />
            Cài đặt tài khoản
          </Link>
        </div>
        <div
          className="detail-item"
          style={{ cursor: "pointer" }}
          onClick={logOut}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Đăng xuất
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form
          noValidate
          onSubmit={handleSubmit(submitForm)}
          style={{ width: "500px", height: "350px" }}
        >
          <DialogTitle>Cấu hình hệ thống</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Phí thuê"
              type="text"
              fullWidth
              variant="standard"
              {...register("fee")}
              value={configs[0]?.value}
              onChange={(e) => handleChange(0, e)}
            />
            {errors.fee && (
              <span className="error-message" role="alert">
                {errors.fee?.message}
              </span>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Ngày thông báo"
              type="text"
              fullWidth
              variant="standard"
              {...register("days")}
              value={configs[1]?.value}
              onChange={(e) => handleChange(1, e)}
            />
            {errors.days && (
              <span className="error-message" role="alert">
                {errors.days?.message}
              </span>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit">Lưu</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
