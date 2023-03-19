import React from "react";
import { Link } from "react-router-dom";
import "./listbook.css";
export default function ListBook() {
  return (
    <section className="section-products">
      <div className="container">
        <div className="row">
          {[...Array(12)].map((item, index) => {
            return (
              <div className="col-md-3 col-lg-3 col-xl-3 book-item" key={index}>
                <div id="product-1" className="single-product">
                  <div className="part-1">
                    <img src="./images/harry-potter.jpg" alt="thumbnail" />
                  </div>
                  <div className="part-2">
                    <h3 className="product-title">Here Product Title</h3>
                    <h4 className="product-price">$49.99</h4>
                    <p className="available">Còn lại: 10</p>
                  </div>
                </div>
                <Link to={`/detail-book/${index}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
