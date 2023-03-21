import { faDongSign, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../apis/book";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./detailbook.css";

export default function DetailBook() {
  const links = [
    {
      id: 1,
      className: "img-button",
      link: "/images/harry-potter.jpg",
    },
    {
      id: 2,
      className: "img-button",
      link: "http://localhost:8888/static/imgs/demen_phuuluuky.jpeg",
    },
    {
      id: 3,
      className: "img-button",
      link: "/images/img2.jpg",
    },
    {
      id: 4,
      className: "img-button",
      link: "/images/img3.jpg",
    },
    {
      id: 5,
      className: "img-button",
      link: "/images/img4.jpg",
    },
  ];
  const [activeLink, setActivelLink] = useState(1);
  const [imgShow, setImgShow] = useState("/images/harry-potter.jpg");
  const [rentNumber, setRentNumber] = useState(1);
  const [currentBook, setCurrentBook] = useState();


  const handleImgClick = (id, link) => {
    setActivelLink(id);
    setImgShow(link);
  };

  const {id} = useParams();
  //const books = useSelector(state => state.book);
  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setCurrentBook(response.data.value);
    }
    fetchBook();
  }, [id])
  return (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <div className="detail-book">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-5 book-image">
                              <div className="img-show">
                                <div className="img-wrapper">
                                  <img src={imgShow} alt="imgShow" />
                                </div>
                              </div>
                              <div className="img-button-list">
                                {links.map((li) => {
                                  return (
                                    <div
                                      className={
                                        li.className +
                                        (li.id === activeLink
                                          ? " active-img"
                                          : "")
                                      }
                                      key={li.id}
                                      onClick={() =>
                                        handleImgClick(li.id, li.link)
                                      }
                                    >
                                      <img src={li.link} alt="imgShow" />
                                    </div>
                                  );
                                })}
                                {/* <div className="img-button">
                                  <img
                                    src="/images/harry-potter.jpg"
                                    alt="imgShow"
                                  />
                                </div>
                                <div className="img-button">
                                  <img src="/images/img1.jpg" alt="imgShow" />
                                </div>
                                <div className="img-button">
                                  <img src="/images/img2.jpg" alt="imgShow" />
                                </div>
                                <div className="img-button">
                                  <img src="/images/img3.jpg" alt="imgShow" />
                                </div>
                                <div className="img-button">
                                  <img src="/images/img4.jpg" alt="imgShow" />
                                </div> */}
                              </div>
                            </div>
                            <div className="col-md-6 book-info">
                              <h5 className="book-title">
                                {currentBook?.name}
                              </h5>
                              <div className="number">
                                <h6 className="publisher">Tác giả: {currentBook?.author}</h6>
                                <h6 className="publisher">
                                {currentBook?.publisher}
                                </h6>
                              </div>
                              <p className="price">
                                {currentBook?.price} <FontAwesomeIcon icon={faDongSign} />
                              </p>
                              <p className="description">
                                {currentBook?.description}
                              </p>
                              <div className="number">
                                <label>Số lượng thuê</label>
                                <div className="group-input-number">
                                  <button
                                    disabled={rentNumber === 1}
                                    onClick={() => {
                                      let value = rentNumber;
                                      setRentNumber(--value);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faMinus} />
                                  </button>
                                  <input
                                    type="text"
                                    className="rent-quantity"
                                    value={rentNumber}
                                    onChange={(e) =>
                                      setRentNumber(e.target.value)
                                    }
                                  />
                                  <button
                                    disabled={rentNumber === currentBook.quantity}
                                    onClick={() => {
                                      let value = rentNumber;
                                      setRentNumber(++value);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>
                              </div>
                              <div className="sum-price number">
                                <label htmlFor="">
                                  <span>Tổng tiền</span>
                                </label>
                                <span>{currentBook?.price * rentNumber} đ</span>
                              </div>
                              <div className="buy">
                                <button className="btn btn-success">
                                  Thuê sách
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
