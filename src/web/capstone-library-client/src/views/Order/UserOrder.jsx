import {
  faBroom,
  faDongSign,
  faFileInvoiceDollar,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { getOrderStatus } from "../../apis/order";
import Loading from "../../components/Loading/Loading";
import {
  compareDate,
  formatMoney,
  getColorStatus,
} from "../../helper/helpFunction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function UserOrder() {
  const [listOrderStatus, setlistOrderStatus] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const { data } = await getOrderStatus();
      setlistOrderStatus(
        data.value
          .sort((a, b) => b.id - a.id)
          .map((val) => {
            return {
              ...val,
              statusColor: getColorStatus(val.status),
            };
          })
      );
      setOrders(
        data.value
          .sort((a, b) => b.id - a.id)
          .map((val) => {
            return {
              ...val,
              statusColor: getColorStatus(val.status),
            };
          })
      );
    };
    fetchOrderStatus();
  }, []);
  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };

  const [postDetail, setPostDetail] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (post) => {
    setPostDetail(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [arrange, setArrange] = useState(0);
  const listArrange = [
    { value: 0, text: "--Chọn tiêu chí--" },
    { value: 1, text: "Ngày thuê" },
    { value: 2, text: "Giá tăng dần" },
    { value: 3, text: "Giá giảm dần" }
  ];

  const handleChangeSelect = (event) => {
    setArrange(event.target.value);
    switch (event.target.value) {
      case 1:
        setOrders((prev) => prev.sort((a, b) => a.noDays - b.noDays).slice());
        break;
      case 2:
        setOrders((prev) =>
          prev.sort((a, b) => a.totalPrice - b.totalPrice).slice()
        );
        break;
        case 3:
        setOrders((prev) =>
          prev.sort((a, b) => b.totalPrice - a.totalPrice).slice()
        );
        break;
      default:
        setOrders((prev) => prev.sort((a, b) => a.id - b.id).slice());
        break;
    }
  };

  const handleClickSearch = () => {
    let temp = listOrderStatus;
    temp = temp.filter((t) => t.postDto.title.indexOf(searchTitle) !== -1);
    temp = temp.filter((t) =>
      compareDate(t.borrowedDate, fromDate._d, rentDate._d)
    );
    status !== -1 && (temp = temp.filter((t) => t.status === status));
    setOrders(temp.slice());
  };

  const [rentDate, setRentDate] = useState(moment(new Date()));
  const [fromDate, setFromDate] = useState(moment(new Date(2020, 0, 1)));
  const [searchTitle, setSearchTitle] = useState("");
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
  const handleChangeSelectSearch = (e) => {
    setStatus(e.target.value);
  };

  const handleClickReset = () => {
    setRentDate(moment(new Date()));
    setFromDate(moment(new Date(2020, 0, 1)));
    setSearchTitle("");
    setStatus(-1);
    setArrange(0);
    setOrders(listOrderStatus.slice());
  };

  return listOrderStatus ? (
    <>
      <section className="cart-area position-relative">
        <div className="container">
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
                        <label htmlFor="userId">Sắp xếp:</label>
                        <div className="input-param" style={{ padding: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={arrange}
                            onChange={handleChangeSelect}
                          >
                            {listArrange.map((arrange, index) => {
                              return (
                                <MenuItem value={arrange.value} key={index}>
                                  {arrange.text}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                    <div className="input-search">
                        <label htmlFor="">Trạng thái:</label>
                        <div className="input-param" style={{ padding: 0 }}>
                          <Select
                            id="demo-simple-select"
                            value={status}
                            name="productName"
                            onChange={handleChangeSelectSearch}
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
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="body-fw-400">
                      {orders &&
                        orders.map((los, index) => {
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
                              <td>
                                <button
                                  className="btn btn-info"
                                  style={{ marginLeft: "15px" }}
                                  onClick={() => handleClickOpen(los.postDto)}
                                >
                                  Chi tiết
                                </button>
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
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogContent>
            <div className="detail-book">
              <div className="container">
                <div className="row">
                  {/* <div className="col-md-6">
                              <Carousel images={listImg} />
                            </div> */}
                  <div className="book-info" style={{ minHeight: "350px" }}>
                    <h5 className="book-title">{postDetail?.title}</h5>
                    <div className="number">
                      <h6 className="publisher">
                        Đăng bởi: {postDetail?.user}
                      </h6>
                      <h6 className="publisher">
                        Ngày cho thuê: {postDetail?.noDays}
                      </h6>
                    </div>
                    <p className="price">
                      {postDetail?.fee} <FontAwesomeIcon icon={faDongSign} />
                    </p>
                    <p className="description" style={{ maxWidth: "600px" }}>
                      {postDetail?.content}
                    </p>
                    <div className="cart-form table-responsive px-2">
                      <table className="table generic-table custom-table">
                        <thead>
                          <tr>
                            <th scope="colSpan">Tên sách</th>
                            <th scope="colSpan">Giá</th>
                            <th scope="colSpan">Số lượng</th>
                            <th scope="colSpan">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody style={{ borderBottom: "none" }}>
                          {postDetail?.postDetailDtos.map((post, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                    <div className="media-body">
                                      <h5 className="fs-15 fw-medium">
                                        <Link
                                          to={`/user/detail-book/${post.bookDto.id}`}
                                        >
                                          {post.bookDto.name}
                                        </Link>
                                      </h5>
                                    </div>
                                  </div>
                                </th>
                                <td>{post.bookDto.price}</td>
                                <td>{post.quantity}</td>
                                <td>{post.bookDto.price * post.quantity}</td>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
          </DialogActions>
        </Dialog>
      </section>
      {/* <section className="cart-area position-relative">
        <div className="container">
          <div
            className="filter-option-box"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                className="form-group mb-0"
                style={{ width: "300px", marginRight: "30px" }}
              >
                <input
                  className="form-control form--control"
                  type="text"
                  name="search"
                  placeholder="Nhập tên post..."
                  value={keyword}
                  onChange={(e) => handleSearch(e)}
                />
                <button className="form-btn" type="submit">
                  <i className="la la-search"></i>
                </button>
              </div>
            </form>
            
          </div>
          <div className="row">
            {orders.map((los, index) => {
              return (
                <div
                  className="col-md-4 col-sm-12 col-xs-12"
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
                          {beautyTitle(los.postDto.title)}
                        </p>
                        <p style={{ fontWeight: "400", fontSize: "1.15rem" }}>
                          <FontAwesomeIcon icon={faUser} /> {los.userId}
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}
    </>
  ) : (
    <Loading />
  );
}
