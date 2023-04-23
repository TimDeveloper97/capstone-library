import React from "react";
import Loading from "../../components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faChevronLeft,
  faChevronRight,
  faDeleteLeft,
  faDownLong,
  faEllipsisVertical,
  faSearch,
  faSquarePen,
  faUpLong,
  faUserCheck,
  faUserLock,
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
import { deleteBook, getBooks } from "../../actions/book";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function BookManagement() {
  const [listBooks, setListBooks] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const books = useSelector((state) => state.book);
  useEffect(() => {
    setListBooks(books.sort((a, b) => a.id - b.id));
  }, [books]);

  //   const [curPage, setCurPage] = useState(1);
  //   const [numPage, setNumPage] = useState(3);
  //   useEffect(() => {
  //     setListUser(
  //       books
  //         .sort((a, b) => a.id - b.id)
  //         .slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize)
  //     );
  //   }, [curPage]);
  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [searchOwner, setSearchOwner] = useState("");

  const handleClickSearch = () => {
    let temp = books;
    temp = temp.filter((t) => t.name.indexOf(searchName) !== -1);
    temp = temp.filter((t) => t.author.indexOf(searchAuthor) !== -1);
    temp = temp.filter((t) => t.owner.indexOf(searchOwner) !== -1);
    temp = temp.filter((t) => t.publisher.indexOf(searchPublisher) !== -1);
    setListBooks(temp.slice());
  };
  const handleClickReset = () => {
    setSearchAuthor("");
    setSearchName("");
    setSearchOwner("");
    setSearchPublisher("");
    setListBooks(books.sort((a, b) => a.id - b.id));
  };
  const handleDeleteBook = async (id, index) => {
    const res = await dispatch(deleteBook(id));
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
      //resetData();
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
                      {listBooks &&
                        listBooks.map((book, index) => {
                          return (
                            <tr
                              key={index}
                              className="fw-normal"
                              style={{ position: "relative" }}
                            >
                              <th>
                                <Avatar
                                  src={getImgUrl(book.imgs[0].fileName)}
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
                              <td>{book.inStock}</td>
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
                                        handleDeleteBook(book.id, index)
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
                      {/* <tr className="fw-normal">
                        <td colSpan={8}>
                          <div className="table-paging">
                            Trang: {curPage} trên {numPage}{" "}
                            <button
                              onClick={() => setCurPage((prev) => --prev)}
                              disabled={curPage === 1}
                            >
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </button>{" "}
                            <button
                              onClick={() => setCurPage((prev) => ++prev)}
                              disabled={curPage === numPage}
                            >
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </div>
                        </td>
                      </tr> */}
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
