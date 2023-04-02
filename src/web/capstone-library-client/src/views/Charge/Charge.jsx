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
      setListCharge(data.value);
    };
    getCharge();
  }, []);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async (data, e) => {
    e.preventDefault();
    data.content = "Nap tien ho";
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
  return listCharge ? (
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
            <h2 className="section-title pb-3">Danh sách nạp tiền</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <NotificationContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-10"></div>
            <div
              className="col-md-2"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "20px",
                marginBottom: "20px",
              }}
            >
              <button
                className="btn btn-success"
                onClick={() => handleClickOpen()}
              >
                Nạp tiền
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
                      <th scope="col">Số tiền nạp</th>
                      <th scope="col">Người nhận</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCharge &&
                      listCharge.map((charge, index) => {
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
                                {charge.transferAmount}
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
        <Dialog open={open} onClose={handleClose}>
          <form
            noValidate
            onSubmit={handleSubmit(submitForm)}
            style={{ width: "500px", height: "350px" }}
          >
            <DialogTitle>Nạp tiền</DialogTitle>
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
                label="Số tiền nạp"
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
              <Button type="submit">Nạp</Button>
            </DialogActions>
          </form>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}