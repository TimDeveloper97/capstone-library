import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import Funfact from "./Funfact";
import Guest from "./Guest";
import './home.css';
import Instruct from "./Instruct";
import Member from "./Member";

export default function Home() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => setLoading(false), 3000);
  return (
    <>
      {loading && <div id="preloader">
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
        </div>}

      <section className="hero-area bg-dark overflow-hidden section-padding">
        <span className="stroke-shape stroke-shape-1 stroke-shape-white"></span>
        <span className="stroke-shape stroke-shape-2 stroke-shape-white"></span>
        <span className="stroke-shape stroke-shape-3 stroke-shape-white"></span>
        <span className="stroke-shape stroke-shape-4 stroke-shape-white"></span>
        <span className="stroke-shape stroke-shape-5 stroke-shape-white"></span>
        <span className="stroke-shape stroke-shape-6 stroke-shape-white"></span>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mr-auto">
              <div className="hero-content">
                <h2 className="section-title fs-50 pb-3 text-white lh-65">
                  Tham gia hệ thống thư viện online ngay!
                </h2>
                <p className="lh-26 text-white">
                  Tận hưởng hệ thống thư viện chuyên nghiệp và đẩy đủ.
                </p>
                <div className="hero-btn-box pt-30px">
                  <a
                    href="#for-guest"
                    className="btn theme-btn mr-2 page-scroll"
                  >
                    Khách vãng lai{" "}
                    <i className="la la-angle-down icon ml-1"></i>
                  </a>
                  <a
                    href="#for-member"
                    className="btn theme-btn bg-3 page-scroll"
                  >
                    Thành viên <i className="la la-angle-down icon ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="generic-img-box generic-img-box-layout-2">
          <img className="lazy" src="./images/img1.jpg" alt="image1" />
          <img
            className="lazy"
            src="./images/sherlock-holmes-toan-tap.jpg"
            alt="image2"
          />
          <img className="lazy" src="./images/img3.jpg" alt="image1" />
          <img className="lazy" src="./images/img4.jpg" alt="image2" />
        </div>
      </section>
      <Funfact />
      <Instruct />
      <Guest />
      <Member />
      
    </>
  );
}
