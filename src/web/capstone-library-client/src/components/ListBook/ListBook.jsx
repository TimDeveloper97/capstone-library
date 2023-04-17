import { faDongSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks, getUserBooks } from "../../actions/book";
import { formatMoney, getImgUrl } from "../../helper/helpFunction";
import Loading from "../Loading/Loading";
import "./listbook.css";
export default function ListBook() {
  const dispatch = useDispatch();
  const role =
    JSON.parse(window.localStorage.getItem("user"))?.roles[0] === "ROLE_ADMIN";
  useEffect(() => {
    role ? dispatch(getBooks()) : dispatch(getUserBooks());
  }, []);
  const books = useSelector((state) => state.book);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    numberOfPage: 1,
  });
  const [listBook, setListBook] = useState([]);
  const setupPage = (page) => {
    const start = page * pagination.pageSize;
    setPagination((prev) => {
      return {
        ...prev,
        numberOfPage: Math.ceil(books.length / prev.pageSize),
      };
    });
    setListBook(books.slice(start, start + pagination.pageSize));
  };

  useEffect(() => {
    books && setupPage(0);
  }, [books]);

  const handleChangePage = (e, p) => {
    setupPage(p - 1);
  };

  return books ? (
    <>
      <section className="section-products" style={{ marginBottom: "40px" }}>
        <div className="container">
          <div className="row">
            {listBook.length === 0 ? (
              <p>Không có cuốn sách nào</p>
            ) : (
              listBook.map((item, index) => {
                return (
                  <div
                    className="col-md-3 col-lg-3 col-xl-3 book-item"
                    key={index}
                  >
                    <div
                      id="product-1"
                      className="single-product card card-item"
                    >
                      <div className="part-1">
                        <img
                          src={
                            item.imgs.length > 0
                              ? getImgUrl(item.imgs[0].fileName)
                              : "/images/default_img.jpeg"
                          }
                          alt="thumbnail"
                        />
                      </div>
                      <div className="part-2">
                        <h3 className="product-title">{item.name}</h3>
                        <h4 className="product-price">
                          {formatMoney(item.price)}{" "}
                          <FontAwesomeIcon icon={faDongSign} />
                        </h4>
                        <p className="available">
                          Còn lại: {role ? item.inStock : item.quantity}
                        </p>
                      </div>
                    </div>
                    <Link to={`/user/detail-book/${item.id}`} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <Stack spacing={2}>
        <Pagination
          count={pagination.numberOfPage}
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>
    </>
  ) : (
    <Loading />
  );
}
