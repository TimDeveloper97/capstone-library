import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCategory } from "../../actions/book";
import { getCategories } from "../../actions/category";
import * as api from "../../apis/book";

export default function Sidebar() {
  const role =
    JSON.parse(window.localStorage.getItem("user"))?.roles[0] === "ROLE_ADMIN";
  useEffect(() => {
    dispatch(getCategories());
    const getBooks = async () => {
      if (role) {
        const { data } = await api.getBooks();
        setBooks(data.value);
      } else {
        const { data } = await api.getUserBooks();
        setBooks(data.value);
      }
    };
    getBooks();
  }, []);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const [books, setBooks] = useState([]);
  const [cateCode, setCateCode] = useState("home");

  const handleChangeCategory = (nameCode) => {
    const listBook =
      nameCode === "home"
        ? books
        : books.filter((book) => book.categories.indexOf(nameCode) > -1);
    dispatch(getBooksByCategory(listBook));
    setCateCode(nameCode);
  };

  return (
    <div className="sidebar pb-45px position-sticky top-0 mt-2">
      <ul className="generic-list-item generic-list-item-highlight fs-15">
        <li
          className={cateCode === "home" ? "lh-26 active" : "lh-26"}
          onClick={() => handleChangeCategory("home")}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <i className="la la-home mr-1 text-black"></i> Tất cả loại sách
          </a>
        </li>
        {categories &&
          categories.map((cate) => {
            return (
              <li
                className={
                  cateCode === cate.nameCode ? "lh-26 active" : "lh-26"
                }
                key={cate.nameCode}
                onClick={() => handleChangeCategory(cate.nameCode)}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {cate.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
