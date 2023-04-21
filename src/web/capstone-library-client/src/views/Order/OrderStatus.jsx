import {
  faCheck,
  faEllipsis,
  faEllipsisVertical,
  faFileInvoiceDollar,
  faPen,
  faQrcode,
  faSearch,
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
import { formatMoney, getColorStatus } from "../../helper/helpFunction";
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
  TextField,
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
  const handleClickSearch = () => {};
  return listOrderStatus ? (
    <>
      <section className="cart-area position-relative">
        <div className="container">
          <NotificationContainer />
          <div className="row">
            <div className="col-md-2" style={{ backgroundColor: "#fff" }}>
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
              <div className="cart-form table-responsive px-2">
                <div className="search-card">
                  <div className="row">
                    <h4>Lọc</h4>
                    <div className="col-md-3">
                      <TextField
                        id="outlined-basic"
                        label="Theo tiêu đề"
                        variant="outlined"
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        id="outlined-basic"
                        label="Theo ngày thuê"
                        variant="outlined"
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        id="outlined-basic"
                        label="Theo người thuê"
                        variant="outlined"
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        id="outlined-basic"
                        label="Theo trạng thái"
                        variant="outlined"
                      />
                    </div>
                  </div>
                  
                  <div
                    className="row"
                    style={{
                      margin: "20px 0",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div className="btn-wrapper">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleClickSearch()}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                        Tìm
                      </button>
                    </div>
                  </div>
                </div>
                <div className="search-result">
                  <table className="table generic-table">
                    <thead style={{textAlign: "center"}}>
                      <tr>
                        <th scope="col">Ngày thuê</th>
                        <th scope="col">Ngày đến hạn</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Tổng giá</th>
                        <th scope="col">Người thuê</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="body-fw-400">
                      {listOrderStatus &&
                        listOrderStatus.map((los, index) => {
                          return (
                            <tr key={index}>
                              <td>{convertToDay(los.borrowedDate)}</td>
                              <td style={{color: "red"}}>{convertToDay(
                                  +los.borrowedDate +
                                    1000 * 60 * 60 * 24 * los.noDays
                                )}</td>
                              <td>{los.postDto.title}</td>
                              <td>{formatMoney(los.totalPrice)} đ</td>
                              <td>{los.userId}</td>
                              <td>
                                {" "}
                                <span
                                  className="order-status"
                                  style={{
                                    backgroundColor: los.statusColor.color,
                                  }}
                                >
                                  {los.statusColor.state}
                                </span>
                              </td>
                              <td style={{position: "relative"}}>
                                {los.status === 2 ? null : los.status === 32 ? (
                                  <div className="button-action">
                                    <div className="tooltip-action">
                                      <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                          handleConfirmOrder(e, los.id, index)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} /> Chấp
                                        thuận
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={(e) =>
                                          handleDenyOrder(e, los.id, index)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                        Từ chối
                                      </button>
                                    </div>
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                      />
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
                                        <FontAwesomeIcon icon={faQrcode} /> Tạo
                                        mã
                                      </button>
                                    </div>
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                      />
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
                                        <FontAwesomeIcon icon={faCheck} /> Xác
                                        nhận
                                      </button>
                                    </div>
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                      />
                                    </span>
                                  </div>
                                ) : null}
                              </td>
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
