import { faDongSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";


export default function ListPost({posts}) {

  const getOneImg = (post) => {
    let img = "/images/default_img.jpeg";
    post.postDetailDtos.forEach((pto) => {
      if (pto.bookDto.imgs.length > 0) {
        img = getImgUrl(pto.bookDto.imgs[0].fileName);
      }
    });
    return img;
  };

  return (
    <>
      <section className="section-products">
        <div className="container">
          <div className="row">
            {posts &&
              posts.map((item, index) => {
                return (
                  <div
                    className="col-md-3 col-lg-3 col-xl-3 book-item mb-15px"
                    key={index}
                  >
                    <div id="product-1" className="single-product card card-item">
                      <div className="part-1">
                        <img src={getOneImg(item)} alt="thumbnail" />
                      </div>
                      <div className="part-2">
                        <h3 className="product-title">{item.title}</h3>
                        <h4 className="product-price">
                          {formatMoney(item.fee)} <FontAwesomeIcon icon={faDongSign} />
                        </h4>
                        <p className="available">Đăng bởi: {item.user}</p>
                      </div>
                    </div>
                    <Link to={`/detail-post/${item.id}`} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      
    </>
  )
}
