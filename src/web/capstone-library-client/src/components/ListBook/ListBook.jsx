import { faDongSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../../actions/book";
import { getImgUrl } from "../../helper/helpFunction";
import "./listbook.css";
export default function ListBook() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const books = useSelector(state => state.book);
  
  return (
    <section className="section-products">
      <div className="container">
        <div className="row">
          {books && books.map((item, index) => {
            return (
              <div className="col-md-3 col-lg-3 col-xl-3 book-item" key={index}>
                <div id="product-1" className="single-product">
                  <div className="part-1">
                    <img src={item.imgs.length > 0 ? getImgUrl(item.imgs[0].fileName) : '/images/default_img.jpeg'} alt="thumbnail" />
                  </div>
                  <div className="part-2">
                    <h3 className="product-title">{item.name}</h3>
                    <h4 className="product-price">{item.price} <FontAwesomeIcon icon={faDongSign} /></h4>
                    <p className="available">Còn lại: {item.quantity}</p>
                  </div>
                </div>
                <Link to={`/detail-book/${item.id}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
