import React from "react";
import Loading from "../../components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faDeleteLeft,
  faEllipsisVertical,
  faSearch,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { useEffect } from "react";
import { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getUserBooks } from "../../actions/book";
import { Link } from "react-router-dom";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from "@mui/material";
import { getCategories } from "../../actions/category";

export default function MyBookManagement() {
  const [listBooks, setListBooks] = useState([]);
  const [listCategories, setListCategories] = useState([{name: "--Tất cả thể loại--", nameCode: "all"}]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserBooks());
    dispatch(getCategories());
  }, []);
  const books = useSelector((state) => state.book);
  const categories = useSelector(state => state.category);
  useEffect(() => {
    setListBooks(books.sort((a, b) => a.id - b.id));
  }, [books]);

  useEffect(() => {
    let temp = [];
    categories && (temp = categories.slice());
    setListCategories(prev => [...prev, ...temp]);
  }, [categories])

  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [searchOwner, setSearchOwner] = useState("");
  const [searchCate, setSearchCate] = useState("all");

  const handleChangeSelect = (e) => {
    setSearchCate(e.target.value);
  }

  const handleClickSearch = () => {
    let temp = books;
    temp = temp.filter((t) => t.name.indexOf(searchName) !== -1);
    temp = temp.filter((t) => t.author.indexOf(searchAuthor) !== -1);
    temp = temp.filter((t) => t.owner.indexOf(searchOwner) !== -1);
    temp = temp.filter((t) => t.publisher.indexOf(searchPublisher) !== -1);
    temp = temp.filter(t => t.categories.indexOf(searchCate) !== -1);
    setListBooks(temp.slice());
  };
  const handleClickReset = () => {
    setSearchAuthor("");
    setSearchName("");
    setSearchOwner("");
    setSearchPublisher("");
    setSearchCate("all")
    setListBooks(books.sort((a, b) => a.id - b.id));
  };
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const handleClose = () => {
    setOpen(false);
  }
  const confirmDeleteBook = (id) => {
    setDeleteId(id);
    setOpen(true);
  }
  const handleDeleteBook = async (index) => {
    const res = await dispatch(deleteBook(deleteId));
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
      setOpen(false);
    } else {
      NotificationManager.error(res.message, "Lỗi", 2000);
    }
  };

  return books ? (
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
                        <label htmlFor="titleSearch">Tên sách:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Tác giả:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="titleSearch"
                          value={searchAuthor}
                          onChange={(e) => setSearchAuthor(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Trạng thái:</label>
                        <div className="input-param" style={{ padding: 0 }}>
                          <Select
                            id="demo-simple-select"
                            value={searchCate}
                            name="productName"
                            onChange={handleChangeSelect}
                            style={{ width: "inherit" }}
                          >
                            {listCategories.map((ls, index) => (
                              <MenuItem value={ls.nameCode} key={index}>
                                {ls.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-search">
                        <label htmlFor="userId">Người sở hữu:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="userId"
                          value={searchOwner}
                          onChange={(e) => setSearchOwner(e.target.value)}
                        />
                      </div>
                      <div className="input-search">
                        <label htmlFor="">Nhà xuất bản:</label>
                        <input
                          type="text"
                          className="input-param"
                          name="userId"
                          value={searchPublisher}
                          onChange={(e) => setSearchPublisher(e.target.value)}
                        />
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
                        <th scope="col">Tên sách</th>
                        <th scope="col">Tác giả </th>
                        <th scope="col">Giá</th>
                        <th scope="col">Nhà xuất bản</th>
                        <th scope="col">Người sở hữu</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="body-fw-400">
                      {books &&
                        listBooks.map((book, index) => {
                          return (
                            <tr
                              key={index}
                              className="fw-normal"
                              style={{ position: "relative" }}
                            >
                              <th>
                                <Avatar
                                  src={getImgUrl(book.imgs[0]?.fileName)}
                                />
                                {book.name}
                                <Link
                                  to={`/user/detail-book/${book.id}`}
                                  target="_blank"
                                  rel="noopener noreferer"
                                  className="row-link"
                                ></Link>
                              </th>
                              <td>{book.author}</td>
                              <td>{formatMoney(book.price)} đ</td>
                              <td>{book.publisher}</td>
                              <td>{book.owner}</td>
                              <td>{book.quantity}</td>
                              <td style={{ position: "relative" }}>
                                <div className="button-action">
                                  <div className="tooltip-action">
                                    <button className="btn btn-success">
                                      <Link
                                        to={`/user/update-book/${book.id}`}
                                        target="_blank"
                                        rel="noopener noreferer"
                                      >
                                        <FontAwesomeIcon icon={faSquarePen} />{" "}
                                        Sửa sách
                                      </Link>
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        confirmDeleteBook(book.id, index)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faDeleteLeft} />
                                      Xóa sách
                                    </button>
                                  </div>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faEllipsisVertical}
                                    />
                                  </span>
                                </div>
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
          <DialogTitle>Xác nhận xóa sách?</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleDeleteBook()}>Xóa</Button>
            <Button onClick={handleClose}>Hủy</Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  ) : (
    <Loading />
  );
}
