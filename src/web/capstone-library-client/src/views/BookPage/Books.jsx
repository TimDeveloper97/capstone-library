import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListBook from "../../components/ListBook/ListBook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function Books() {
  const params = useParams();
  const categories = useSelector((state) => state.category);
  const [cate, setCate] = useState({ name: "Tất cả sách", nameCode: "all" });
  useEffect(() => {
    console.log(categories);
    let temp = categories?.filter((ca) => ca.nameCode === params.cate)[0];
    if (temp) {
      setCate(temp);
    } else {
      setCate({ name: "Tất cả sách", nameCode: "all" });
    }
  }, [params.cate, categories]);
  return (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-2 col-md-3 col-sm-2 col-xs-2"
            style={{ background: "#efefef" }}
          >
            <Sidebar category={cate} />
          </div>
          <div
            className="col-lg-10 col-md-9 col-sm-10 col-xs-10"
            style={{ background: "#efefef" }}
          >
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="filters d-flex align-items-center justify-content-between pb-4">
                    <h3 className="fs-17 fw-medium">{cate?.name}</h3>
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <ListBook category={cate} />
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
