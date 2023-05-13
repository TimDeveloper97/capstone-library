import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCategory } from "../../actions/book";
import { getCategories } from "../../actions/category";
import * as api from "../../apis/book";
import { Link } from "react-router-dom";

export default function Sidebar({ category }) {
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);

  return (
    <div className="sidebar pb-45px position-sticky top-0 mt-2">
      <ul className="generic-list-item generic-list-item-highlight fs-15">
        <li className={category.nameCode === "all" ? "lh-26 active" : "lh-26"}>
          <Link to={"/books/all"}>
            <i className="la la-home mr-1 text-black"></i> Tất cả loại sách
          </Link>
        </li>
        {categories &&
          categories.map((cate) => {
            return (
              <li
                className={
                  category.nameCode === cate.nameCode ? "lh-26 active" : "lh-26"
                }
                key={cate.nameCode}
              >
                <Link to={`/books/${cate.nameCode}`}>{cate.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
