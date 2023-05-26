import {
  faBroom,
  faCheck,
  faEllipsisVertical,
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
} from "../../apis/order";
import Loading from "../../components/Loading/Loading";
import {
  compareDate,
  formatMoney,
  getColorStatus,
} from "../../helper/helpFunction";
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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
      setListOrderDisplay(
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
      let temp = listOrderDisplay;
      temp[index].statusColor = getColorStatus(64);
      temp[index].status = 64;
      setListOrderDisplay(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 1000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 1000);
    }
  };

  const [denyId, setDenyId] = useState(0);
  const [denyIndex, setDenyIndex] = useState(0);
  const [openReason, setOpenReason] = useState(false);
  const [reason, setReason] = useState("");

  const handleDenyOrder = (e, id, index) => {
    e.preventDefault();
    setDenyId(id);
    setDenyIndex(index);
    setOpenReason(true);
  };

  const confirmDenyOrder = async () => {
    const { data } = await denyOrder(denyId, {value: reason});
    setOpenReason(false);
    if (data.success) {
      let temp = listOrderDisplay;
      temp[denyIndex].statusColor = getColorStatus(2);
      temp[denyIndex].status = 2;
      setListOrderDisplay(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 1000);
      setReason("");
    } else {
      NotificationManager.error(data.message, "Lỗi", 1000);
    }
  }

  const [listOrderDisplay, setListOrderDisplay] = useState([]);

  const [qrValue, setQrValue] = useState("");
  const [open, setOpen] = useState(false);

  //input search param
  const [rentDate, setRentDate] = useState(moment(new Date()));
  const [fromDate, setFromDate] = useState(moment(new Date(2020, 0, 1)));
  const [searchTitle, setSearchTitle] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [status, setStatus] = useState(-1);
  const listStatus = [
    {
      value: -1,
      text: "--Chọn trạng thái--",
    },
    {
      value: 2,
      text: "Từ chối",
    },
    {
      value: 32,
      text: "Đã thanh toán",
    },
    {
      value: 64,
      text: "Đợi lấy sách",
    },
    {
      value: 128,
      text: "Chưa trả sách",
    },
    {
      value: 256,
      text: "Thành công",
    },
  ];
  const handleChangeSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleCreateQr = async (e, id, status) => {
    e.preventDefault();
    //const user = JSON.parse(window.localStorage.getItem("user"));
    const token = window.localStorage.getItem("token");
    const data = {
      time: new Date().getTime(),
      token: token,
      orderId: id,
      status: status,
    };
    const input = JSON.stringify(data);
    setQrValue(input);
    setOpen(true);
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
      let temp = listOrderDisplay;
      temp[index].statusColor = getColorStatus(256);
      temp[index].status = 256;
      setListOrderDisplay(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 1000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 1000);
    }
  };

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };
  const handleClickSearch = () => {
    let temp = listOrderStatus;
    temp = temp.filter((t) => t.postDto.title.indexOf(searchTitle) !== -1);
    temp = temp.filter((t) => t.userId.indexOf(searchUser) !== -1);
    temp = temp.filter(t => compareDate(t.createdDate, fromDate._d, rentDate._d));
    status !== -1 && (temp = temp.filter((t) => t.status === status));
    setListOrderDisplay(temp.slice());
  };
  const handleClickReset = () => {
    setRentDate(moment(new Date()));
    setFromDate(moment(new Date(2020, 0 ,1)));
    setSearchTitle("");
    setSearchUser("");
    setStatus(-1);
    setListOrderDisplay(listOrderStatus.slice());
  };
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
                    <h4>Tiêu chí tìm kiếm</h4>
                    <div className="col-md-4">
                      <div className="input-search">
                        <label htmlFor="titleSearch">Tiêu đề:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchTitle}
                          onChange={(e) => setSearchTitle(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Từ ngày:</label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <div className="input-param" style={{ padding: 0 }}>
                            <DatePicker
                              value={fromDate}
                              onChange={(newValue) => setFromDate(newValue)}
                            />
                          </div>
                        </LocalizationProvider>
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
                    <div className="col-md-4">
                      <div className="input-search">
                        <label htmlFor="userId">Người thuê:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="userId"
                          value={searchUser}
                          onChange={(e) => setSearchUser(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Đến ngày:</label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <div className="input-param" style={{ padding: 0 }}>
                            <DatePicker
                              value={rentDate}
                              onChange={(newValue) => setRentDate(newValue)}
                            />
                          </div>
                        </LocalizationProvider>
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
                          <FontAwesomeIcon icon={faBroom} /> Tất cả
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="search-result">
                  <table className="table generic-table">
                    <thead style={{ textAlign: "center" }}>
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
                      {listOrderDisplay &&
                        listOrderDisplay.map((los, index) => {
                          return (
                            <tr key={index}>
                              <td>{convertToDay(los.borrowedDate)}</td>
                              <td style={{ color: "red" }}>
                                {convertToDay(
                                  +los.borrowedDate +
                                    1000 * 60 * 60 * 24 * los.noDays
                                )}
                              </td>
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
                              <td style={{ position: "relative" }}>
                                {los.status === 2 ? null : los.status === 32 ? (
                                  <div className="button-action">
                                    <div className="tooltip-action">
                                      <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                          handleConfirmOrder(
                                            e,
                                            los.id,
                                            index
                                          )
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
                                          handleCreateQr(e, los.id, los.status)
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
                                          handleCreateQr(e, los.id, los.status)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faQrcode} /> Tạo
                                        mã
                                      </button>
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
          <DialogTitle>Xác nhận sách?</DialogTitle>
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
        <Dialog open={openReason} onClose={() => setOpenReason(false)}>
          <DialogTitle>Lý do từ chối</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              value={reason}
              onChange={e => setReason(e.target.value)}
              label="Lý do"
             />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => confirmDenyOrder()}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}
