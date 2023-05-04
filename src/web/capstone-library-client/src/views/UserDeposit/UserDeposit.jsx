import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostByUser } from "../../apis/post";
import Loading from "../../components/Loading/Loading";
import {
  compareDate,
  formatMoney,
  getColorStatus,
} from "../../helper/helpFunction";
import { faBook, faBroom, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function UserDeposit() {
  const [listPostRequest, setListPostRequest] = useState([]);
  const [listPostDeposit, setListPostDeposit] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const { data } = await getPostByUser();
      data.value &&
        setListPostRequest(
          data.value.map((val) => {
            return {
              ...val,
              statusColor: getColorStatus(val.status),
            };
          })
        );
      data.value &&
        setListPostDeposit(
          data.value.map((val) => {
            return {
              ...val,
              statusColor: getColorStatus(val.status),
            };
          })
        );
    };
    getPost();
  }, []);

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };

  //input search param
  const [rentDate, setRentDate] = useState(moment(new Date()));
  const [searchTitle, setSearchTitle] = useState("");
  const [returnDate, setReturnDate] = useState(moment(new Date(2020, 0, 1)));
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
      value: 4,
      text: "Đợi chấp thuận",
    },
    {
      value: 16,
      text: "Chấp thuận",
    },
  ];
  const handleChangeSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleClickSearch = () => {
    let temp = listPostRequest;
    temp = temp.filter((t) => !t.title || t.title.indexOf(searchTitle) !== -1);
    status !== -1 && (temp = temp.filter((t) => t.status === status));
    temp = temp.filter(t => compareDate(t.createdDate, returnDate._d, rentDate._d));
    setListPostDeposit(temp.slice());
  };
  const handleClickReset = () => {
    setRentDate(moment(new Date()));
    setSearchTitle("");
    setReturnDate(moment(new Date()));
    setStatus(-1);
    setListPostDeposit(listPostRequest.slice());
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [listDetailBook, setListDetailBook] = useState([]);
  const handleClickTitle = (listBook) => {
    setListDetailBook(listBook);
    setOpen(true);
  };

  return listPostRequest ? (
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
                        <label htmlFor="userId">Từ ngày:</label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <div className="input-param" style={{ padding: 0 }}>
                            <DatePicker
                              value={returnDate}
                              onChange={(newValue) => setReturnDate(newValue)}
                            />
                          </div>
                        </LocalizationProvider>
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
                        <button className="btn btn-info ml-10">
                          <Link to={"/user/add-post"}>
                            <FontAwesomeIcon icon={faBook} /> Ký gửi sách
                          </Link>
                        </button>
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
                        <th scope="col">Ngày đăng</th>
                        <th scope="col">Ngày đến hạn</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Phí</th>
                        <th scope="col">Người ký gửi</th>
                        <th scope="col">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="body-fw-400">
                      {listPostDeposit &&
                        listPostDeposit.map((los, index) => {
                          return (
                            <tr key={index}>
                              <td>{convertToDay(los.createdDate)}</td>
                              <td style={{ color: "red" }}>
                                {convertToDay(
                                  +los.createdDate +
                                    1000 * 60 * 60 * 24 * los.noDays
                                )}
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleClickTitle(los.postDetailDtos)
                                }
                              >
                                {los.title}
                              </td>
                              <td>{los.fee} %</td>
                              <td>{los.user}</td>
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
          <DialogTitle>Chi tiết đơn ký gửi</DialogTitle>
          <DialogContent>
            <table className="table generic-table">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th scope="col">Tên sách</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                </tr>
              </thead>
              <tbody className="body-fw-400">
                {listDetailBook &&
                  listDetailBook.map((book, index) => {
                    return (
                      <tr
                        key={index}
                        className="fw-normal"
                        style={{ position: "relative" }}
                      >
                        <th>
                          {book.bookDto.name}
                          <Link
                            to={`/detail-book/${book.bookDto.id}`}
                            target="_blank"
                            rel="noopener noreferer"
                            className="row-link"
                          ></Link>
                        </th>
                        <td>{formatMoney(book.bookDto.price)} đ</td>
                        <td>{book.quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}
