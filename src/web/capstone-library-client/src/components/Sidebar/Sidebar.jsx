import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/category";

export default function Sidebar() {
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);

  return (
    <div className="sidebar pb-45px position-sticky top-0 mt-2">
      <ul className="generic-list-item generic-list-item-highlight fs-15">
        <li className="lh-26 active">
          <a href="home-2.html">
            <i className="la la-home mr-1 text-black"></i> Home
          </a>
        </li>
        {categories &&
          categories.map((cate) => {
            return (
              <li className="lh-26" key={cate.nameCode}>
                <a href="category.html">{cate.name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
