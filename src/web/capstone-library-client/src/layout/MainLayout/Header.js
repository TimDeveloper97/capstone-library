import React from 'react'

export default function Header() {
  return (
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
                    <i className="la la-sign-in mr-1"></i> Đăng nhập
                  </a>
                  <a
                    href="#"
                    className="btn theme-btn theme-btn-white"
                    data-toggle="modal"
                    data-target="#signUpModal"
                  >
                    <i className="la la-user mr-1"></i> Đăng ký
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
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Trang</a>
              <ul className="sub-menu">
                <li>
                  <a href="user-profile.html">user profile</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">blog</a>
              <ul className="sub-menu">
                <li>
                  <a href="blog-grid-no-sidebar.html">grid no sidebar</a>
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
              <i className="la la-sign-in mr-1"></i> Đăng nhập
            </a>
            <span className="fs-15 fw-medium d-inline-block mx-2">Or</span>
            <a
              href="#"
              className="btn theme-btn theme-btn-sm"
              data-toggle="modal"
              data-target="#signUpModal"
            >
              <i className="la la-plus mr-1"></i> Đăng ký
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
  )
}
