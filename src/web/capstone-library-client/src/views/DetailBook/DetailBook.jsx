import { faDongSign, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBookById, getPostByBook } from "../../apis/book";
import Loading from "../../components/Loading/Loading";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import "./detailbook.css";
import Carousel from "react-multi-carousel";

export default function DetailBook() {
  const [activeLink, setActivelLink] = useState(0);
  const [imgShow, setImgShow] = useState("");
  const [currentBook, setCurrentBook] = useState();
  const [links, setLinks] = useState([]);

  const handleImgClick = (id, link) => {
    setActivelLink(id);
    setImgShow(link);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const categories = useSelector(state => state.category);

  const { id } = useParams();
  const [postHasBook, setPostHasBook] = useState([]);
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
      setLinks(tempLink);
      setImgShow(getImgUrl(data.value.imgs[0]?.fileName));
      const response = await getPostByBook(data.value.id);
      setPostHasBook(response.data.value);
    };
    fetchBook();
  }, [id]);
  const dispatch = useDispatch();

  const getOneImg = (post) => {
    let img = "/images/default_img.jpeg";
    post.postDetailDtos.forEach((pto) => {
      if (pto.bookDto.imgs.length > 0) {
        img = getImgUrl(pto.bookDto.imgs[0].fileName);
      }
    });
    return img;
  };

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
                                  Tác giả: <span>{currentBook?.author}</span>
                                </h5>
                              </div>
                              <div className="number">
                                <h5 className="publisher">
                                  Nhà xuất bản:{" "}
                                  <span>{currentBook?.publisher}</span>
                                </h5>
                              </div>
                              <div className="number">
                                <h5 className="publisher">
                                  Năm xuất bản:{" "}
                                  <span>{currentBook?.publishYear}</span>
                                </h5>
                              </div>
                              <div className="number">
                                <h5 className="publisher">
                                  {currentBook?.categories?.map(cate => {
                                    return <span style={{marginRight: "10px"}} key={cate}>{
                                      categories.filter(ca => ca.nameCode === cate)[0]?.name
                                    }</span>
                                  })}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h5 className="newpost-title">
          <FontAwesomeIcon icon={faLink} color="#FD8A8A" /> Bài đăng chứa sách này
        </h5>
        {postHasBook?.length > 0 ? (
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            infinite={false}
            transitionDuration={500}
            removeArrowOnDeviceType={["desktop", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            {postHasBook?.map((item, index) => {
              return (
                <div
                  className="book-item"
                  key={index}
                  style={{ height: "360px", margin: "0 10px" }}
                >
                  <div className="single-product card card-item">
                    <div className="part-1">
                      <img
                        src={getOneImg(item)}
                        alt="thumbnail"
                        style={{ height: "270px" }}
                      />
                    </div>
                    <div className="part-2">
                      <h6 className="product-title">{item.title}</h6>
                      <p className="product-price">
                        {formatMoney(item.fee)}{" "}
                        <FontAwesomeIcon icon={faDongSign} />
                      </p>
                    </div>
                  </div>
                  <Link to={`/detail-post/${item.id}`} />
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </div>
    </section>
  ) : (
    <Loading />
  );
}
