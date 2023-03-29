import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";

export default function Charge() {
  const [listCharge, setListCharge] = useState();
  return listCharge ? (
    <>
      <section className="hero-area bg-white shadow-sm pt-80px pb-80px">
        {/* <NotificationContainer /> */}
        <span className="icon-shape icon-shape-1"></span>
        <span className="icon-shape icon-shape-2"></span>
        <span className="icon-shape icon-shape-3"></span>
        <span className="icon-shape icon-shape-4"></span>
        <span className="icon-shape icon-shape-5"></span>
        <span className="icon-shape icon-shape-6"></span>
        <span className="icon-shape icon-shape-7"></span>
        <div className="container">
          <div className="hero-content text-center">
            <h2 className="section-title pb-3">Danh sách nạp tiền</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
