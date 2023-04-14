import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDongSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getPosts } from "../../apis/post";

export default function NewestPost() {
  const getOneImg = (post) => {
    let img = "/images/default_img.jpeg";
    post.postDetailDtos.forEach((pto) => {
      if (pto.bookDto.imgs.length > 0) {
        img = getImgUrl(pto.bookDto.imgs[0].fileName);
      }
    });
    return img;
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
        const {data} = await getPosts();
        setPosts(data.value.sort((a, b) => a.id - b.id).slice(0, 5));
    }
    fetchPost();
  }, []);

  return (
    <section className="newest-post-section">
      <div className="container">
        <h5 className="newpost-title"><FontAwesomeIcon icon={faBolt} color="#FD8A8A"/> Post mới đăng</h5>
        <ReactOwlCarousel items={4} className="owl-theme" loop nav margin={30}>
          {posts &&
            posts.map((item, index) => {
              return (
                <div
                  className="book-item"
                  key={index}
                >
                  <div id="product-1" className="single-product card card-item" style={{textAlign: 'center'}}>
                    <div className="part-1">
                      <img src={getOneImg(item)} alt="thumbnail" style={{minHeight: '250px'}} />
                    </div>
                    <div className="part-2">
                      <h4 className="product-title">{item.title}</h4>
                      <h5 className="product-price">
                        {formatMoney(item.fee)}{" "}
                        <FontAwesomeIcon icon={faDongSign} />
                      </h5>
                      <p className="available">Đăng bởi: {item.user}</p>
                    </div>
                  </div>
                  <Link to={`/detail-post/${item.id}`} />
                </div>
              );
            })}
        </ReactOwlCarousel>
      </div>
    </section>
  );
}
