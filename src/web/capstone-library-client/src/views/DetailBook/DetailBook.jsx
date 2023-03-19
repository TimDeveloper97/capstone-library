import { faDongSign, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
  const handleImgClick = (id, link) => {
    setActivelLink(id);
    setImgShow(link);
  };
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
                                Harry potter và hoàng tử lai
                              </h5>
                              <div className="number">
                                <h6 className="publisher">Tác giả: Tô Hoài</h6>
                                <h6 className="publisher">
                                  Nhà xuất bản Kim Đồng
                                </h6>
                              </div>
                              <p className="price">
                                100.000 <FontAwesomeIcon icon={faDongSign} />
                              </p>
                              <p className="description">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book.
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
                                <span>100.000 đ</span>
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
