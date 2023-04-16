import { faDongSign, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBookById } from "../../apis/book";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import "./detailbook.css";

export default function DetailBook() {
  const [activeLink, setActivelLink] = useState(0);
  const [imgShow, setImgShow] = useState("");
  const [rentNumber, setRentNumber] = useState(1);
  const [currentBook, setCurrentBook] = useState();
  const [links, setLinks] = useState([]);

  const handleImgClick = (id, link) => {
    setActivelLink(id);
    setImgShow(link);
  };
  const userRole = JSON.parse(window.localStorage.getItem("user")).roles[0];

  const { id } = useParams();
  //const books = useSelector(state => state.book);
  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await getBookById(id);
      setCurrentBook(data.value);
      const tempLink = data.value.imgs.map((img, index) => {
        return {
          id: index,
          className: "img-button",
          link: getImgUrl(img.fileName),
        };
      });
      console.log(tempLink);
      setLinks(tempLink);
      setImgShow(getImgUrl(data.value.imgs[0].fileName));
    };
    fetchBook();
  }, [id]);
  return currentBook ? (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div className="card card-item">
                  <div className="card-body">
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
                              {links &&
                                links.map((li) => {
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
                            </div>
                          </div>
                          <div className="col-md-6 book-info">
                            <h4 className="book-title">{currentBook?.name}</h4>
                            <div className="info">
                              <div className="number">
                                <h5 className="publisher">
                                  Tác giả: {currentBook?.author}
                                </h5>
                              </div>
                              <div className="number">
                                <h5 className="publisher">
                                  {currentBook?.publisher}
                                </h5>
                              </div>
                              <div className="number">
                                <h5 className="publisher">
                                  {currentBook?.publishYear}
                                </h5>
                              </div>
                            </div>
                            <p className="price">
                              <span
                                className="description"
                                style={{
                                  background: "#E5B8F4",
                                }}
                              >
                                Giá: {formatMoney(currentBook?.price)}{" "}
                                <FontAwesomeIcon icon={faDongSign} />
                              </span>
                            </p>
                            <p className="description">
                              {currentBook?.description}
                            </p>
                          </div>
                        </div>
                        {userRole === "ROLE_MANAGER_POST" && (
                          <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2">
                              <button className="btn btn-success">
                                <Link
                                  to={`/user/update-book/${currentBook.id}`}
                                >
                                  Cập nhật sách
                                </Link>
                              </button>
                            </div>
                          </div>
                        )}
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
  ) : (
    <Loading />
  );
}
