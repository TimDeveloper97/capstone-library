import { faDongSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/post";
import { getImgUrl } from "../../helper/helpFunction";
export default function ListPost() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const posts = useSelector(state => state.post);
  
  return (
    <section className="section-products">
      <div className="container">
        <div className="row">
          {posts && posts.map((item, index) => {
            return (
              <div className="col-md-3 col-lg-3 col-xl-3 book-item" key={index}>
                <div id="product-1" className="single-product">
                  <div className="part-1">
                    <img src={'/images/default_img.jpeg'} alt="thumbnail" />
                  </div>
                  <div className="part-2">
                    <h3 className="product-title">{item.title}</h3>
                    <h4 className="product-price">{item.fee} <FontAwesomeIcon icon={faDongSign} /></h4>
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
  );
}
