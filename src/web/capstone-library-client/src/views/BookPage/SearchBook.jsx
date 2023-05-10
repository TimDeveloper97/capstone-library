import React from "react";
import {
  faDongSign,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getBooks } from "../../apis/book";

export default function SearchBook() {
  const params = useParams();
  const dispatch = useDispatch();
  const [searchedBook, setSearchBook] = useState([]);
  //const books = useSelector((state) => state.book);

  useEffect(() => {
    //dispatch(getBooks());
    const getBook = async () => {
      const {data} = await getBooks();
      setSearchBook(data.value.filter((b) => b.name.toLowerCase().indexOf(params.keyword.toLowerCase()) !== -1));
    }
    getBook();
  }, [params.keyword]);
  

  return (
    <section
      className="newest-post-section search-book"
      style={{ marginTop: "40px" }}
    >
      <div className="container">
        <h5 className="newpost-title">
          <FontAwesomeIcon icon={faSquarePollVertical} color="#FD8A8A" /> Kết
          quả tìm kiếm
        </h5>
        <div className="row">
          {searchedBook && searchedBook.length > 0 ? (
            searchedBook.map((item, index) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-xs-12 book-item"
                  key={index}
                  style={{
                    height: "360px",
                    padding: "0 10px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="single-product card card-item">
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
                    </div>
                  </div>
                  <Link to={`/detail-book/${item.id}`} />
                </div>
              );
            })
          ) : (
            <h5>Không có cuốn sách nào</h5>
          )}
        </div>
      </div>
    </section>
  );
}
