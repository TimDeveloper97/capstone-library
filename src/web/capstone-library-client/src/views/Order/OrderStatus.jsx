import {
  faCheck,
  faEllipsis,
  faEllipsisVertical,
  faFileInvoiceDollar,
  faPen,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  bookReturn,
  confirmOrder,
  denyOrder,
  getOrderStatus,
  receivedOrder,
} from "../../apis/order";
import Loading from "../../components/Loading/Loading";
import { getColorStatus } from "../../helper/helpFunction";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";

export default function OrderStatus() {
  const [listOrderStatus, setlistOrderStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const { data } = await getOrderStatus();
      setlistOrderStatus(
        data.value.map((val) => {
          return {
            ...val,
            statusColor: getColorStatus(val.status),
          };
        })
      );
    };
    fetchOrderStatus();
  }, []);

  const handleConfirmOrder = async (e, id, index) => {
    e.preventDefault();
    const { data } = await confirmOrder(id);
    if (data.success) {
      let temp = listOrderStatus;
      temp[index].statusColor = getColorStatus(64);
      temp[index].status = 64;
      setlistOrderStatus(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const handleDenyOrder = async (e, id, index) => {
    e.preventDefault();
    const { data } = await denyOrder(id);
    if (data.success) {
      let temp = listOrderStatus;
      temp[index].statusColor = getColorStatus(2);
      temp[index].status = 2;
      setlistOrderStatus(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const [qrValue, setQrValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleReceivedOrder = async (e, id, index) => {
    e.preventDefault();
    //const user = JSON.parse(window.localStorage.getItem("user"));
    const token = window.localStorage.getItem("token");
    const data = {
      time: new Date().getTime(),
      token: token,
      orderId: id,
      status: 64,
    };
    const input = JSON.stringify(data);
    setQrValue(input);
    setOpen(true);
    // const {data} = await receivedOrder(id);
    // if (data.success) {
    //   let temp = listOrderStatus;
    //   temp[index].statusColor = getColorStatus(128);
    //   temp[index].status = 128;
    //   setlistOrderStatus(temp.slice());
    //   NotificationManager.success(data.message, "Thông báo", 2000);
    // } else {
    //   NotificationManager.error(data.message, "Lỗi", 2000);
    // }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkResult = () => {
    navigate(0);
  };

  const handleBookReturn = async (e, id, index) => {
    e.preventDefault();
    const { data } = await bookReturn(id);
    if (data.success) {
      let temp = listOrderStatus;
      temp[index].statusColor = getColorStatus(256);
      temp[index].status = 256;
      setlistOrderStatus(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };
  return listOrderStatus ? (
    <>
      <section className="hero-area bg-white shadow-sm pt-80px pb-80px">
        <NotificationContainer />
        <span className="icon-shape icon-shape-1"></span>
        <span className="icon-shape icon-shape-2"></span>
        <span className="icon-shape icon-shape-3"></span>
        <span className="icon-shape icon-shape-4"></span>
        <span className="icon-shape icon-shape-5"></span>
        <span className="icon-shape icon-shape-6"></span>
        <span className="icon-shape icon-shape-7"></span>
        <div className="container">
          <div className="hero-content text-center">
            <h2 className="section-title pb-3">Danh sách đơn hàng</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
            <div className="row">
            {listOrderStatus.map((los, index) => {
              return (
                <div
                  className="col-md-6 col-sm-12 col-xs-12"
                  key={index}
                  style={{ padding: "10px 20px" }}
                >
                  <div className="card card-item">
                    <div className="card-body card-order">
                      <div className="day-display">
                        <p>{convertToDay(los.borrowedDate)}</p>
                        <p style={{ margin: "15px 0" }}>{los.noDays} ngày</p>
                        <p style={{ color: "red" }}>
                          {convertToDay(
                            +los.borrowedDate + 1000 * 60 * 60 * 24 * los.noDays
                          )}
                        </p>
                      </div>
                      <div className="item-body">
                        <p style={{ fontWeight: "500", fontSize: "1.25rem" }}>
                          {los.userId}
                        </p>
                        <p style={{ marginBottom: "10px" }}>
                          <FontAwesomeIcon
                            icon={faFileInvoiceDollar}
                            color={"#7AA874"}
                          />{" "}
                          Tổng tiền: {los.totalPrice} VNĐ
                        </p>
                        <span
                          className="order-status"
                          style={{ backgroundColor: los.statusColor.color }}
                        >
                          {los.statusColor.state}
                        </span>
                      </div>
                      {los.status === 2 ? null : los.status === 32 ? (
                        <div className="button-action">
                          <div className="tooltip-action">
                            <button
                              className="btn btn-success"
                              onClick={(e) =>
                                handleConfirmOrder(e, los.id, index)
                              }
                            >
                              <FontAwesomeIcon icon={faCheck} /> Chấp thuận
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => handleDenyOrder(e, los.id, index)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                              Từ chối
                            </button>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </span>
                        </div>
                      ) : los.status === 64 ? (
                        <div className="button-action">
                          <div className="tooltip-action">
                            <button
                              className="btn btn-success"
                              onClick={(e) =>
                                handleReceivedOrder(e, los.id, index)
                              }
                            >
                              <FontAwesomeIcon icon={faQrcode} /> Tạo mã
                            </button>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </span>
                        </div>
                      ) : los.status === 128 ? (
                        <div className="button-action">
                          <div className="tooltip-action">
                            <button
                              className="btn btn-success"
                              onClick={(e) =>
                                handleBookReturn(e, los.id, index)
                              }
                            >
                              <FontAwesomeIcon icon={faCheck} /> Xác nhận
                            </button>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Xác nhận thuê ngay?</DialogTitle>
          <DialogContent>
            <div style={{ background: "white", padding: "16px" }}>
              <QRCode value={qrValue} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={checkResult}>Xem kết quả</Button>
            <Button onClick={handleClose}>Hủy</Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}
