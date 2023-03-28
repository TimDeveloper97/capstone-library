import { faDongSign, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../apis/book";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getImgUrl } from "../../helper/helpFunction";
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
                            <h5 className="book-title">{currentBook?.name}</h5>
                            <div className="number">
                              <h6 className="publisher">
                                Tác giả: {currentBook?.author}
                              </h6>
                            </div>
                            <div className="number">
                              <h6 className="publisher">
                                {currentBook?.publisher}
                              </h6>
                              <h6 className="publisher">
                                Xuất bản năm: {currentBook?.publishYear}
                              </h6>
                            </div>
                            <p className="price">
                              Giá: {currentBook?.price}{" "}
                              <FontAwesomeIcon icon={faDongSign} />
                            </p>
                            <p className="description">
                              {currentBook?.description}
                            </p>
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
  ) : (
    <Loading />
  );
}
