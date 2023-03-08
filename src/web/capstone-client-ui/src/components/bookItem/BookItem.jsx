import React from "react";
import { Star } from "react-bootstrap-icons";
import "./bookItem.css";
import img_book from "../../assets/img/harry-potter-and-the-goblet-of-fire-6.jpg";
import { Link } from "react-router-dom";

export default function BookItem(props) {
  return (
    <div className="book-item">
      <div className="book-img-wrapper">
      <img src={img_book} alt="" />
      </div>
      <p className="book-title">Harry Potter and the goblet of fire</p>
      <div className="rating">
        Trinh thám <span>|</span> Kinh dị <span>|</span> Viễn tưởng
      </div>
      <div className="book-price">100.000 đ</div>
      <div className="sub-title">
        <span className="upload-time" style={{marginRight: "15px"}}>55 giây trước</span>
        <span className="upload-location">Ha Noi</span>
      </div>
      <Link to={`/detail-book/${props.id}`} />
    </div>
  );
}
