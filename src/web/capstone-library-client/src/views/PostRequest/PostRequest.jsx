import {
  faBroom,
  faCheck,
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { acceptPost, denyPost, getPostRequest } from "../../apis/post";
import Loading from "../../components/Loading/Loading";
import {
  compareDateEqual,
  formatMoney,
  getColorStatus,
} from "../../helper/helpFunction";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MenuItem, Select } from "@mui/material";

export default function PostRequest() {
  const [listPostRequest, setListPostRequest] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await getPostRequest();
      setListPostRequest(
        data.value.map((val) => {
          return {
            ...val,
            statusColor: getColorStatus(val.status),
          };
        })
      );
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
  const [listPostDeposit, setListPostDeposit] = useState([]);
  const handleAccept = async (e, id, index) => {
    e.preventDefault();
    const { data } = await acceptPost(id);
    if (data.success) {
      let temp = listPostDeposit;
      temp[index].statusColor = getColorStatus(16);
      temp[index].status = 16;
      setListPostDeposit(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const handleDeny = async (e, id, index) => {
    e.preventDefault();
    const { data } = await denyPost(id);
    if (data.success) {
      let temp = listPostDeposit;
      temp[index].statusColor = getColorStatus(2);
      temp[index].status = 2;
      setListPostDeposit(temp.slice());
      NotificationManager.success(data.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(data.message, "Lỗi", 2000);
    }
  };

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };

  //input search param
  const [rentDate, setRentDate] = useState();
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
    temp = temp.filter((t) => t.user.indexOf(searchUser) !== -1);
    status !== -1 && (temp = temp.filter((t) => t.status === status));
    rentDate &&
      (temp = temp.filter((t) =>
        compareDateEqual(new Date(t.createdDate), rentDate._d)
      ));
    setListPostDeposit(temp.slice());
  };
  const handleClickReset = () => {
    setRentDate(null);
    setSearchTitle("");
    setSearchUser("");
    setStatus(-1);
    setListPostDeposit(listPostRequest.slice());
  };
  return listPostRequest ? (
    <>
      <section className="cart-area position-relative">
        <NotificationContainer />
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
                        <label htmlFor="userId">Người ký gửi:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="userId"
                          value={searchUser}
                          onChange={(e) => setSearchUser(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Ngày ký gửi:</label>
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
                          <FontAwesomeIcon icon={faBroom} /> Reset
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
                        <th scope="col">Phí</th>
                        <th scope="col">Người ký gửi</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
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
                              <td>{los.title}</td>
                              <td>{formatMoney(los.fee)} đ</td>
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
                              <td style={{ position: "relative" }}>
                                {los.status === 2 ? null : los.status === 4 ? (
                                  <div className="button-action">
                                    <div className="tooltip-action">
                                      <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                          handleAccept(e, los.id, index)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} /> Chấp
                                        thuận
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={(e) =>
                                          handleDeny(e, los.id, index)
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
      </section>
    </>
  ) : (
    <Loading />
  );
}
