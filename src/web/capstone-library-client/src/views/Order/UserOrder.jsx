import {
  faDongSign,
  faFileInvoiceDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { getOrderStatus } from "../../apis/order";
import Loading from "../../components/Loading/Loading";
import { getColorStatus } from "../../helper/helpFunction";
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

  const beautyTitle = (str) => {
    if (str.length <= 23) {
      return str;
    }
    return str.slice(0, 23) + "...";
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
    { value: 0, text: "Chọn tiêu chí" },
    { value: 1, text: "Ngày thuê" },
    { value: 2, text: "Tổng tiền" },
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
      default:
        setOrders((prev) => prev.sort((a, b) => a.id - b.id).slice());
        break;
    }
  };
  const [keyword, setKeyword] = useState("");
  const handleSearch = (event) => {
    setKeyword(event.target.value);
    setOrders(
      listOrderStatus.filter(
        (post) => post.postDto.title.indexOf(event.target.value) !== -1
      )
    );
  };

  return listOrderStatus ? (
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
            <h2 className="section-title pb-3">Danh sách đơn hàng</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div className="filter-option-box" style={{ display: "flex", justifyContent: "flex-end" }}>
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
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={arrange}
                label="Sắp xếp"
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
                        <button
                          className="btn btn-info"
                          style={{ marginLeft: "15px" }}
                          onClick={() => handleClickOpen(los.postDto)}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
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
                    <h6 className="publisher">Đăng bởi: {postDetail?.user}</h6>
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
                                        to={`/detail-book/${post.bookDto.id}`}
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
    </>
  ) : (
    <Loading />
  );
}
