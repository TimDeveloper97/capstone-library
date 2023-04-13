import React from "react";

export default function Footer() {
  const curUser = JSON.parse(window.localStorage.getItem("user"));
  return (
    <section className="footer-area pt-20px position-relative" style={{backgroundColor: curUser.roles[0] === "ROLE_USER" ? "#343a40" : "#576CBC"}}>
      <span className="vertical-bar-shape vertical-bar-shape-1"></span>
      <span className="vertical-bar-shape vertical-bar-shape-2"></span>
      <span className="vertical-bar-shape vertical-bar-shape-3"></span>
      <span className="vertical-bar-shape vertical-bar-shape-4"></span>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 responsive-column-half">
            <div className="footer-item">
              <h3 className="fs-18 fw-bold pb-2 text-white">Connect with us</h3>
              <div className="row">
                <div className="col-md-3">
                  <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                    <li>
                      <a href="#">
                        <i className="la la-facebook mr-1"></i> Facebook
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                    <li>
                      <a href="#">
                        <i className="la la-twitter mr-1"></i> Twitter
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                    <li>
                      <a href="#">
                        <i className="la la-linkedin mr-1"></i> LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                    <li>
                      <a href="#">
                        <i className="la la-instagram mr-1"></i> Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center pb-4 copyright-wrap">
          <div className="col-lg-6">
            <a href="/" className="logo">
              <img src="/images/logoC.png" alt="footer logo" />
            </a>
          </div>
          <div className="col-lg-6">
            <p className="copyright-desc text-right fs-14">
              Copyright &copy; 2023 <a href="#">Capstone</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
