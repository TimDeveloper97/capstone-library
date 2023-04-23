import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRecharge, transfer } from "../../apis/order";
import Loading from "../../components/Loading/Loading";
import * as yup from "yup";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { formatMoney } from "../../helper/helpFunction";

const schema = yup.object({
  user: yup.string().required("Tên user không được để trống"),
  transferAmount: yup.string().required("Tiền không được để trống"),
});

export default function Charge() {
  const [listCharge, setListCharge] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCharge = async () => {
      const { data } = await getRecharge();
      data.value && setListCharge(data.value);
    };
    getCharge();
  }, []);

  const [showCharge, setShowCharge] = useState([]);
  const [showState, setShowState] = useState(0);
  useEffect(() => {
    setShowCharge(listCharge);
  }, [listCharge]);

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isCharge, setIsCharge] = useState(true);
  const handleClickOpen = (isCharge) => {
    setIsCharge(isCharge);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async (data, e) => {
    e.preventDefault();
    data.content = "Nap tien ho";
    !isCharge && (data.transferAmount = data.transferAmount * -1);
    const response = await transfer(data);
    if (response.data.success) {
      NotificationManager.success(response.data.message, "Thông báo", 2000);
      const res = await getRecharge();
      setListCharge(res.data.value);
    } else {
      NotificationManager.error(response.data.message, "Lỗi", 2000);
    }
    handleClose();
    resetField("user");
    resetField("transferAmount");
  };

  const setShowChargeState = (state) => {
    if (state === 0) {
      setShowCharge(listCharge);
    } else if (state === 1) {
      setShowCharge(listCharge.filter((c) => c.transferAmount > 0));
    } else {
      setShowCharge(listCharge.filter((c) => c.transferAmount < 0));
    }
    setShowState(state);
  };

  return listCharge ? (
    <>
      <section className="hero-area bg-white shadow-sm pt-80px">
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
            <h2 className="section-title pb-3">Danh sách nạp tiền</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px position-relative">
        <NotificationContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-2" style={{ background: "#fff" }}>
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div
                  className="col-md-5"
                  style={{
                    display: "flex",
                    paddingLeft: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    className={
                      showState === 0
                        ? "btn btn-primary mr-15px"
                        : "btn btn-secondary mr-15px"
                    }
                    onClick={() => setShowChargeState(0)}
                  >
                    Tất cả
                  </button>
                  <button
                    className={
                      showState === 1
                        ? "btn btn-primary mr-15px"
                        : "btn btn-secondary mr-15px"
                    }
                    onClick={() => setShowChargeState(1)}
                  >
                    Đơn nạp
                  </button>
                  <button
                    className={
                      showState === -1
                        ? "btn btn-primary mr-15px"
                        : "btn btn-secondary mr-15px"
                    }
                    onClick={() => setShowChargeState(-1)}
                  >
                    Đơn rút
                  </button>
                </div>
                <div className="col-md-4"></div>
                <div
                  className="col-md-3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    className="btn btn-success mr-15px"
                    onClick={() => handleClickOpen(true)}
                  >
                    Nạp tiền
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickOpen(false)}
                  >
                    Rút tiền
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="container">
                  <div className="cart-form mb-50px table-responsive px-2">
                    <table className="table generic-table">
                      <thead>
                        <tr>
                          <th scope="col">Ngày nạp</th>
                          <th scope="col">Nội dung</th>
                          <th scope="col">Số tiền</th>
                          <th scope="col">Người nhận</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showCharge &&
                          showCharge.map((charge, index) => {
                            return (
                              <tr key={index} className="fw-normal">
                                <th scope="row">
                                  <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                    <div className="media-body">
                                      {convertToDay(charge.createdDate)}
                                    </div>
                                  </div>
                                </th>
                                <td>{charge.content}</td>
                                <td>
                                  <div className="quantity-item d-inline-flex align-items-center">
                                    {formatMoney(charge.transferAmount)} đ
                                  </div>
                                </td>
                                <td>{charge.user}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <form
            noValidate
            onSubmit={handleSubmit(submitForm)}
            style={{ width: "500px", height: "350px" }}
          >
            <DialogTitle>{isCharge ? "Nạp tiền" : "Rút tiền"}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Tên user"
                type="text"
                fullWidth
                variant="standard"
                {...register("user")}
              />
              {errors.user && (
                <span className="error-message" role="alert">
                  {errors.user?.message}
                </span>
              )}
              <TextField
                autoFocus
                margin="dense"
                label={isCharge ? "Số tiền nạp" : "Số tiền rút"}
                type="text"
                fullWidth
                variant="standard"
                {...register("transferAmount")}
              />
              {errors.transferAmount && (
                <span className="error-message" role="alert">
                  {errors.transferAmount?.message}
                </span>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button type="submit">{isCharge ? "Nạp" : "Rút"}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}
