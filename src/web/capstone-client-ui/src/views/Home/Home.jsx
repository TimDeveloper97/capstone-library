export default function Home() {
  return (
    <>
      {/* <div id="preloader">
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
      </div> */}

      <header className="header-area bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="logo-box">
                <a href="index.html" className="logo">
                  <img src="images/logo-white.png" alt="logo" />
                </a>
                <div className="user-action">
                  <div
                    className="search-menu-toggle icon-element icon-element-xs shadow-sm mr-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Search"
                  >
                    <i className="la la-search"></i>
                  </div>
                  <div
                    className="off-canvas-menu-toggle icon-element icon-element-xs shadow-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Main menu"
                  >
                    <i className="la la-bars"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="menu-wrapper">
                <nav className="menu-bar mr-auto menu-bar-white">
                  <ul>
                    <li>
                      <a href="#">
                        Home <i className="la la-angle-down fs-11"></i>
                      </a>
                      <ul className="dropdown-menu-item">
                        <li>
                          <a href="index.html">Home - landing</a>
                        </li>
                        <li>
                          <a href="home-2.html">Home - main</a>
                        </li>
                        <li>
                          <a href="home-3.html">
                            Home - layout 2{" "}
                            <span className="badge bg-warning text-white">
                              New
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="is-mega-menu">
                      <a href="#">
                        pages <i className="la la-angle-down fs-11"></i>
                      </a>
                      <div className="dropdown-menu-item mega-menu">
                        <ul className="row">
                          <li className="col-lg-3">
                            <a href="user-profile.html">user profile</a>
                            <a href="notifications.html">Notifications</a>
                          </li>
                          <li className="col-lg-3">
                            <a href="careers.html">careers</a>
                            <a href="career-details.html">career details</a>
                          </li>
                          <li className="col-lg-3">
                            <a href="free-demo.html">free demo</a>
                            <a href="recover-password.html">recover password</a>
                            <a href="questions-layout-2.html">
                              questions layout 2{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="questions-full-width.html">
                              questions full-width{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="questions-left-sidebar.html">
                              questions left sidebar{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                          </li>
                          <li className="col-lg-3">
                            <a href="questions-right-sidebar.html">
                              questions right sidebar{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="user-list.html">
                              user list{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="category-list.html">
                              category list{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="tags-list.html">
                              tags list{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="add-post.html">
                              add post{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="badges-list.html">
                              Badges list{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="job-list.html">
                              job list{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                            <a href="error-2.html">
                              page 404 2{" "}
                              <span className="badge bg-warning text-white">
                                New
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        blog <i className="la la-angle-down fs-11"></i>
                      </a>
                      <ul className="dropdown-menu-item">
                        <li>
                          <a href="blog-grid-no-sidebar.html">
                            grid no sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-left-sidebar.html">blog left sidebar</a>
                        </li>
                        <li>
                          <a href="blog-right-sidebar.html">
                            blog right sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-single.html">blog detail</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>

                <form method="post" className="mr-4">
                  <div className="form-group mb-0">
                    <input
                      className="form-control form--control form--control-bg-gray text-white"
                      type="text"
                      name="search"
                      placeholder="Type your search words..."
                    />
                    <button className="form-btn text-white-50" type="button">
                      <i className="la la-search"></i>
                    </button>
                  </div>
                </form>
                <div className="nav-right-button">
                  <a
                    href="#"
                    className="btn theme-btn theme-btn-outline theme-btn-outline-white mr-2"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    <i className="la la-sign-in mr-1"></i> Login
                  </a>
                  <a
                    href="#"
                    className="btn theme-btn theme-btn-white"
                    data-toggle="modal"
                    data-target="#signUpModal"
                  >
                    <i className="la la-user mr-1"></i> Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="off-canvas-menu custom-scrollbar-styled">
          <div
            className="off-canvas-menu-close icon-element icon-element-sm shadow-sm"
            data-toggle="tooltip"
            data-placement="left"
            title="Close menu"
          >
            <i className="la la-times"></i>
          </div>
          <ul className="generic-list-item off-canvas-menu-list pt-90px">
            <li>
              <a href="#">Home</a>
              <ul className="sub-menu">
                <li>
                  <a href="index.html">Home - landing</a>
                </li>
                <li>
                  <a href="home-2.html">Home - main</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Pages</a>
              <ul className="sub-menu">
                <li>
                  <a href="user-profile.html">user profile</a>
                </li>
                <li>
                  <a href="notifications.html">Notifications</a>
                </li>
                <li>
                  <a href="referrals.html">Referrals</a>
                </li>
                <li>
                  <a href="setting.html">settings</a>
                </li>
                <li>
                  <a href="ask-question.html">ask question</a>
                </li>
                <li>
                  <a href="question-details.html">question details</a>
                </li>
                <li>
                  <a href="about.html">about</a>
                </li>
                <li>
                  <a href="revisions.html">revisions</a>
                </li>
                <li>
                  <a href="category.html">category</a>
                </li>
                <li>
                  <a href="companies.html">companies</a>
                </li>
                <li>
                  <a href="company-details.html">company details</a>
                </li>
                <li>
                  <a href="careers.html">careers</a>
                </li>
                <li>
                  <a href="career-details.html">career details</a>
                </li>
                <li>
                  <a href="contact.html">contact</a>
                </li>
                <li>
                  <a href="faq.html">FAQs</a>
                </li>
                <li>
                  <a href="pricing-table.html">pricing tables</a>
                </li>
                <li>
                  <a href="error.html">page 404</a>
                </li>
                <li>
                  <a href="terms-and-conditions.html">Terms & conditions</a>
                </li>
                <li>
                  <a href="privacy-policy.html">privacy policy</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">blog</a>
              <ul className="sub-menu">
                <li>
                  <a href="blog-grid-no-sidebar.html">grid no sidebar</a>
                </li>
                <li>
                  <a href="blog-left-sidebar.html">blog left sidebar</a>
                </li>
                <li>
                  <a href="blog-right-sidebar.html">blog right sidebar</a>
                </li>
                <li>
                  <a href="blog-single.html">blog detail</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="off-canvas-btn-box px-4 pt-5 text-center">
            <a
              href="#"
              className="btn theme-btn theme-btn-sm theme-btn-outline"
              data-toggle="modal"
              data-target="#loginModal"
            >
              <i className="la la-sign-in mr-1"></i> Login
            </a>
            <span className="fs-15 fw-medium d-inline-block mx-2">Or</span>
            <a
              href="#"
              className="btn theme-btn theme-btn-sm"
              data-toggle="modal"
              data-target="#signUpModal"
            >
              <i className="la la-plus mr-1"></i> Sign up
            </a>
          </div>
        </div>
        <div className="mobile-search-form">
          <div className="d-flex align-items-center">
            <form method="post" className="flex-grow-1 mr-3">
              <div className="form-group mb-0">
                <input
                  className="form-control form--control pl-40px"
                  type="text"
                  name="search"
                  placeholder="Type your search words..."
                />
                <span className="la la-search input-icon"></span>
              </div>
            </form>
            <div className="search-bar-close icon-element icon-element-sm shadow-sm">
              <i className="la la-times"></i>
            </div>
          </div>
        </div>
        <div className="body-overlay"></div>
      </header>
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
                  Join the world's biggest Q&A network!
                </h2>
                <p className="lh-26 text-white">
                  This is just a simple text made for this unique and awesome
                  template, you can replace it with any text.
                </p>
                <div className="hero-btn-box pt-30px">
                  <a
                    href="#for-developers"
                    className="btn theme-btn mr-2 page-scroll"
                  >
                    For developers{" "}
                    <i className="la la-angle-down icon ml-1"></i>
                  </a>
                  <a
                    href="#for-businesses"
                    className="btn theme-btn bg-3 page-scroll"
                  >
                    For businesses{" "}
                    <i className="la la-angle-down icon ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="generic-img-box generic-img-box-layout-2">
          <img className="lazy" src="./images/img1.jpg" alt="image1" />
          <img className="lazy" src="./images/img2.jpg" alt="image2" />
        </div>
      </section>
      <section className="funfact-area">
        <div className="container">
          <div className="counter-box bg-white shadow-md rounded-rounded px-4">
            <div className="row">
              <div className="col responsive-column-half border-right border-right-gray">
                <div className="media media-card text-center px-0 py-4 shadow-none rounded-0 bg-transparent counter-item mb-0">
                  <div className="media-body">
                    <h5 className="fw-semi-bold pb-2">80+ million</h5>
                    <p className="lh-20">Monthly visitors to our network</p>
                  </div>
                </div>
              </div>
              <div className="col responsive-column-half border-right border-right-gray">
                <div className="media media-card text-center px-0 py-4 shadow-none rounded-0 bg-transparent counter-item mb-0">
                  <div className="media-body">
                    <h5 className="fw-semi-bold pb-2">25+ Million</h5>
                    <p className="lh-20">Questions asked to-date</p>
                  </div>
                </div>
              </div>
              <div className="col responsive-column-half border-right border-right-gray">
                <div className="media media-card text-center px-0 py-4 shadow-none rounded-0 bg-transparent counter-item mb-0">
                  <div className="media-body">
                    <h5 className="fw-semi-bold pb-2">14.7 seconds</h5>
                    <p className="lh-20">Average time between new questions</p>
                  </div>
                </div>
              </div>
              <div className="col responsive-column-half border-right border-right-gray">
                <div className="media media-card text-center px-0 py-4 shadow-none rounded-0 bg-transparent counter-item mb-0">
                  <div className="media-body">
                    <h5 className="fw-semi-bold pb-2">40+ Billion</h5>
                    <p className="lh-20">Times a developer got help</p>
                  </div>
                </div>
              </div>
              <div className="col responsive-column-half">
                <div className="media media-card text-center px-0 py-4 shadow-none rounded-0 bg-transparent counter-item mb-0">
                  <div className="media-body">
                    <h5 className="fw-semi-bold pb-2">10,000+</h5>
                    <p className="lh-20">Customer companies for all products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
