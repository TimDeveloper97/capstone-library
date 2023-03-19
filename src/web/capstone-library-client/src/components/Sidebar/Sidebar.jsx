import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../actions/category";

export default function Sidebar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="sidebar pb-45px position-sticky top-0 mt-2">
      <ul className="generic-list-item generic-list-item-highlight fs-15">
        <li className="lh-26 active">
          <a href="home-2.html">
            <i className="la la-home mr-1 text-black"></i> Home
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-flask mr-1 text-black"></i> Science
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-pencil mr-1 text-black"></i> Math
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-globe mr-1 text-black"></i> History
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-book-open mr-1 text-black"></i> Literature
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-laptop mr-1 text-black"></i> Technology
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-dumbbell mr-1 text-black"></i> Health
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-gavel mr-1 text-black"></i> Law
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-briefcase mr-1 text-black"></i> Business
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-file-text mr-1 text-black"></i> All Topics
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-puzzle-piece mr-1 text-black"></i> Random
          </a>
        </li>
        <li className="lh-26">
          <a href="category.html">
            <i className="la la-check mr-1 text-black"></i> Unanswered
          </a>
        </li>
      </ul>
    </div>
  );
}
