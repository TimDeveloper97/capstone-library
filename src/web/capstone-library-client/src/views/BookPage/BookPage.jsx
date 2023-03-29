import React from "react";
import ListBook from "../../components/ListBook/ListBook";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function BookPage() {
  return (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
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
                    {/* <div className="filter-option-box w-20">
                      <select className="select-container">
                        <option className="newest">Newest </option>
                        <option className="featured">Bountied (390)</option>
                        <option className="frequent">Frequent </option>
                        <option className="votes">Votes </option>
                      </select>
                    </div> */}
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <ListBook />
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
