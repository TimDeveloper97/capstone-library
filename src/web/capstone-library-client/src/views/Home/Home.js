import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Funfact from "./Funfact";
import "./home.css";
import Member from "./Member";
import HotBook from "./HotBook";
import NewUploadBook from "./NewUploadBook";
import { useDispatch } from "react-redux";
import { getBooks } from "../../apis/book";
import { getImgUrl } from "../../helper/helpFunction";
import { Link } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1000);
  const [fiveBook, setFiveBook] = useState([]);
  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await getBooks();
      setFiveBook(data.value.sort((a, b) => b.id - a.id).slice(0, 5));
    };
    fetchBook();
  }, []);
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
      {fiveBook.length !== 0 && (
        <section className="hero" style={{ paddingTop: "20px" }}>
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-3 is-vertical is-parent">
                <div className="tile is-child">
                  <Link to={`/detail-book/${fiveBook[0]?.id}`}>
                    <div className="hero-item">
                      <img
                        className="cover"
                        src={getImgUrl(fiveBook[0].imgs[0]?.fileName)}
                        alt="cover"
                      />
                      <div className="bottom-shadow"></div>
                      <div className="captions">
                        <h3>{fiveBook[0].name}</h3>
                      </div>
                      <div className="chapter red">{fiveBook[0].author}</div>
                    </div>
                  </Link>
                </div>
                <div className="tile is-child">
                  <Link to={`/detail-book/${fiveBook[1]?.id}`}>
                    <div className="hero-item">
                      <img
                        className="cover"
                        src={getImgUrl(fiveBook[1].imgs[0]?.fileName)}
                        alt="cover"
                      />
                      <div className="bottom-shadow"></div>
                      <div className="captions">
                        <h3>{fiveBook[1].name}</h3>
                      </div>
                      <div className="chapter green">{fiveBook[1].author}</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child">
                  <Link to={`/detail-book/${fiveBook[2]?.id}`}>
                    <div className="hero-item has-excerpt">
                      <img
                        className="cover"
                        src={getImgUrl(fiveBook[2].imgs[0]?.fileName)}
                        alt="cover"
                      />
                      <div className="bottom-shadow"></div>
                      <div className="captions">
                        <h5>
                          Thể loại: {fiveBook[2].categories.map((c, index) => {
                            let text = c + ", ";
                            if(index === fiveBook[2].categories.length - 1){
                              text = c;
                            }
                            return text
                          })}
                        </h5>
                        <h3>{fiveBook[2].name}</h3>
                      </div>
                      <div className="chapter blue">{fiveBook[2].author}</div>
                      <div className="excerpt">
                      {fiveBook[2].description}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="tile is-3 is-vertical is-parent">
                <div className="tile is-child">
                  <Link to={`/detail-book/${fiveBook[3].id}`}>
                    <div className="hero-item">
                      <img
                        className="cover"
                        src={getImgUrl(fiveBook[3].imgs[0]?.fileName)}
                        alt="cover"
                      />
                      <div className="bottom-shadow"></div>
                      <div className="captions">
                        <h3>{fiveBook[3].name}</h3>
                      </div>
                      <div className="chapter violet">{fiveBook[3].author}</div>
                    </div>
                  </Link>
                </div>
                <div className="tile is-child">
                  <Link to={`/detail-book/${fiveBook[4].id}`}>
                    <div className="hero-item">
                      <img
                        className="cover"
                        src={getImgUrl(fiveBook[4].imgs[0]?.fileName)}
                        alt="cover"
                      />
                      <div className="bottom-shadow"></div>
                      <div className="captions">
                        <h3>{fiveBook[4].name}</h3>
                      </div>
                      <div className="chapter orange">{fiveBook[4].author}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Funfact />
      <HotBook />
      <NewUploadBook />
      <Member />
    </>
  );
}
