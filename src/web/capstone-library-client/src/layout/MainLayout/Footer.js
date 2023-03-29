import React from "react";

export default function Footer() {
  return (
    <section className="footer-area pt-80px bg-dark position-relative">
      <span className="vertical-bar-shape vertical-bar-shape-1"></span>
      <span className="vertical-bar-shape vertical-bar-shape-2"></span>
      <span className="vertical-bar-shape vertical-bar-shape-3"></span>
      <span className="vertical-bar-shape vertical-bar-shape-4"></span>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 responsive-column-half">
            <div className="footer-item">
              <h3 className="fs-18 fw-bold pb-2 text-white">Company</h3>
              <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
                <li>
                  <a href="careers.html">Careers</a>
                </li>
                <li>
                  <a href="advertising.html">Advertising</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 responsive-column-half">
            <div className="footer-item">
              <h3 className="fs-18 fw-bold pb-2 text-white">Legal Stuff</h3>
              <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                <li>
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="terms-and-conditions.html">Terms of Service</a>
                </li>
                <li>
                  <a href="privacy-policy.html">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 responsive-column-half">
            <div className="footer-item">
              <h3 className="fs-18 fw-bold pb-2 text-white">Help</h3>
              <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                <li>
                  <a href="faq.html">Knowledge Base</a>
                </li>
                <li>
                  <a href="contact.html">Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 responsive-column-half">
            <div className="footer-item">
              <h3 className="fs-18 fw-bold pb-2 text-white">Connect with us</h3>
              <ul className="generic-list-item generic-list-item-hover-underline pt-3 generic-list-item-white">
                <li>
                  <a href="#">
                    <i className="la la-facebook mr-1"></i> Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="la la-twitter mr-1"></i> Twitter
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="la la-linkedin mr-1"></i> LinkedIn
                  </a>
                </li>
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
      <hr className="border-top-gray my-5" />
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
