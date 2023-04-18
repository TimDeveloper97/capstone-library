import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import Funfact from "./Funfact";
import Guest from "./Guest";
import "./home.css";
import Instruct from "./Instruct";
import Member from "./Member";
import Quotes from "./Quotes";
import NewestPost from "./NewestPost";

export default function Home() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1000);
  return (
    <>
      {loading && (
        <div id="preloader">
          <div className="loader">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth={5}
              ></circle>
            </svg>
          </div>
        </div>
      )}
      <section className="hero" style={{paddingTop: "20px"}}>
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-3 is-vertical is-parent">
              <div className="tile is-child">
                <a href="https://truyenqqmoi.com/truyen-tranh/onepunch-man-244-chap-229.html">
                  <div className="hero-item">
                    <img
                      className="cover"
                      src="https://i.truyenvua.com/slider/290x191/slider_1559213335.jpg?gt=hdfgdfg&mobile=2"
                      alt="cover"
                    />
                    <div className="bottom-shadow"></div>
                    <div className="captions">
                      <h3>Onepunch Man</h3>
                    </div>
                    <div className="chapter green">Chương 229</div>
                  </div>
                </a>
              </div>
              <div className="tile is-child">
                <a href="https://truyenqqmoi.com/truyen-tranh/that-hinh-dai-toi-740-chap-346.html">
                  <div className="hero-item">
                    <img
                      className="cover"
                      src="https://i.truyenvua.com/slider/290x191/slider_1559213426.jpg?gt=hdfgdfg&mobile=2"
                      alt="cover"
                    />
                    <div className="bottom-shadow"></div>
                    <div className="captions">
                      <h3>Thất Hình Đại Tội</h3>
                    </div>
                    <div className="chapter orange">Chương 346</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <a href="https://truyenqqmoi.com/truyen-tranh/hoc-vien-anh-hung-380-chap-384.html">
                  <div className="hero-item has-excerpt">
                    <img
                      className="cover"
                      src="https://i.truyenvua.com/slider/583x386/slider_1560573084.jpg?gt=hdfgdfg&mobile=2"
                      alt="cover"
                    />
                    <div className="bottom-shadow"></div>
                    <div className="captions">
                      <h5>
                        Thể loại: Action, Adventure, Comedy, Shounen,
                        Supernatural
                      </h5>
                      <h3>Học Viện Anh Hùng</h3>
                    </div>
                    <div className="chapter blue">Chương 384</div>
                    <div className="excerpt">
                      Vào tương lai, lúc mà con người với những sức mạnh siêu
                      nhiên là điều thường thấy quanh thế giới. Đây là câu
                      chuyện về Izuku Midoriya, từ một kẻ bất tài trở thành một
                      siêu anh hùng. Tất cả ta cần là mơ ước.
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="tile is-3 is-vertical is-parent">
              <div className="tile is-child">
                <a href="https://truyenqqmoi.com/truyen-tranh/dai-chien-nguoi-khong-lo-462-chap-139.html">
                  <div className="hero-item">
                    <img
                      className="cover"
                      src="https://i.truyenvua.com/slider/290x191/slider_1559213484.jpg?gt=hdfgdfg&mobile=2"
                      alt="cover"
                    />
                    <div className="bottom-shadow"></div>
                    <div className="captions">
                      <h3>Đại Chiến Người Khổng Lồ</h3>
                    </div>
                    <div className="chapter red">Chương 139</div>
                  </div>
                </a>
              </div>
              <div className="tile is-child">
                <a href="https://truyenqqmoi.com/truyen-tranh/thanh-guom-diet-quy-2624-chap-205-6.html">
                  <div className="hero-item">
                    <img
                      className="cover"
                      src="https://i.truyenvua.com/slider/290x191/slider_1559213537.jpg?gt=hdfgdfg&mobile=2"
                      alt="cover"
                    />
                    <div className="bottom-shadow"></div>
                    <div className="captions">
                      <h3>Thanh Gươm Diệt Quỷ</h3>
                    </div>
                    <div className="chapter violet">Chương 205.6</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Funfact />
      <NewestPost />
      <Member />
    </>
  );
}
