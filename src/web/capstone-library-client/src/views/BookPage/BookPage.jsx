import React from "react";
import ListBook from "../../components/ListBook/ListBook";

export default function BookPage() {
  return (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
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
                    <i className="la la-book-open mr-1 text-black"></i>{" "}
                    Literature
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
                    <i className="la la-file-text mr-1 text-black"></i> All
                    Topics
                  </a>
                </li>
                <li className="lh-26">
                  <a href="category.html">
                    <i className="la la-puzzle-piece mr-1 text-black"></i>{" "}
                    Random
                  </a>
                </li>
                <li className="lh-26">
                  <a href="category.html">
                    <i className="la la-check mr-1 text-black"></i> Unanswered
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="filters d-flex align-items-center justify-content-between pb-4">
                    <h3 className="fs-17 fw-medium">Tất cả sách</h3>
                    <div className="filter-option-box w-20">
                      <select className="select-container">
                        <option className="newest">Newest </option>
                        <option className="featured">Bountied (390)</option>
                        <option className="frequent">Frequent </option>
                        <option className="votes">Votes </option>
                      </select>
                    </div>
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <ListBook />
                    </div>
                    <div className="pager d-flex flex-wrap align-items-center justify-content-between pt-30px">
                      <div>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination generic-pagination pr-1">
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                              >
                                <span aria-hidden="true">
                                  <i className="la la-arrow-left"></i>
                                </span>
                                <span className="sr-only">Previous</span>
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li className="page-item active">
                              <a className="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                4
                              </a>
                            </li>
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Next"
                              >
                                <span aria-hidden="true">
                                  <i className="la la-arrow-right"></i>
                                </span>
                                <span className="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                        <p className="fs-13 pt-3">
                          Showing 1-15 results of 50,577 questions
                        </p>
                      </div>
                      <div className="filter-option-box w-20">
                        <select className="select-container">
                          <option value="10">10 per page</option>
                          <option value="15">15 per page</option>
                          <option value="20">20 per page</option>
                          <option value="30">30 per page</option>
                          <option value="40">40 per page</option>
                          <option value="50">50 per page</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
