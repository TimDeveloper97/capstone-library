import {
  faCloudArrowDown,
  faDongSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import { Link } from "react-router-dom";

export default function NewUploadBook() {
  const books = useSelector((state) => state.book);
  return (
    <section className="newest-post-section" style={{ marginTop: "40px" }}>
      <div className="container">
        <h5 className="newpost-title">
          <FontAwesomeIcon icon={faCloudArrowDown} color="#FD8A8A" /> Truyện mới
          cập nhật
        </h5>
        <div className="row">
          {books &&
            books.slice(0, 18).map((item, index) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-xs-12 book-item"
                  key={index}
                  style={{
                    height: "290px",
                    padding: "0 10px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="single-product card card-item">
                    <div className="part-1">
                      <img
                        src={getImgUrl(item.imgs[0]?.fileName)}
                        alt="thumbnail"
                        style={{ height: "200px" }}
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
                    </div>
                  </div>
                  <Link to={`/detail-book/${item.id}`} />
                </div>
              );
            })}
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button className="btn btn-info">
            <Link to={`/books/all`}>Xem thêm truyện khác</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
