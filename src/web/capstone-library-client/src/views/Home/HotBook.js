import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDongSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../actions/book";

export default function HotBook() {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBook = async () => {
      await dispatch(getBooks());
    }
    fetchBook();
  }, []);
  const books = useSelector(state => state.book);
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

  return (
    <section className="newest-post-section">
      <div className="container">
        <h5 className="newpost-title">
          <FontAwesomeIcon icon={faBolt} color="#FD8A8A" /> Truyện hot
        </h5>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          infinite={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["desktop", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >
          {books &&
            books.slice(0, 6).map((item, index) => {
              return (
                <div
                  className="book-item"
                  key={index}
                  style={{ height: "360px", margin: "0 10px" }}
                >
                  <div
                    className="single-product card card-item"
                  >
                    <div className="part-1">
                      <img
                        src={getImgUrl(item.imgs[0]?.fileName)}
                        alt="thumbnail"
                        style={{ height: "270px" }}
                      />
                    </div>
                    <div className="part-2">
                      <h6 className="product-title">{item.name}</h6>
                      <p className="product-price">
                        {formatMoney(item.price)}{" "}
                        <FontAwesomeIcon icon={faDongSign} />
                      </p>
                    </div>
                    <div className="top-notice">
                      <span className="time-ago">5 giờ trước</span>
                      <span className="top-label">Hot</span>
                    </div>
                  </div>
                  <Link to={`/user/detail-book/${item.id}`} />
                </div>
              );
            })}
        </Carousel>
      </div>
    </section>
  );
}
