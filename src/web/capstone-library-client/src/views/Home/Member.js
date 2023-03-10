import React from "react";

export default function Member() {
  return (
    <>
      <section
        className="get-started-area section--padding bg-gray"
        id="for-member"
      >
        <div className="container">
          <div className="text-center">
            <h2 className="section-title pb-3">Dành cho thành viên</h2>
            <p className="section-desc w-50 mx-auto">
              Cùng tham khảo những ưu đãi đặc biệt dành cho hội viên tại
              Capstone
            </p>
          </div>
          <div className="row pt-50px">
            <div className="col-lg-4 responsive-column-half">
              <div className="media media-card align-items-center hover-s">
                <div className="icon-element mr-3 bg-1"></div>
                <div className="media-body">
                  <h5 className="pb-2">
                    <a href="free-demo.html">Mượn sách tự do</a>
                  </h5>
                  <p>
                    Quý khách chỉ cần đăng ký tài khoản để tiến hành mượn sách
                    tại thư viện nhanh chóng, tiện lợi, an toàn.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 responsive-column-half">
              <div className="media media-card align-items-center hover-s">
                <div className="icon-element mr-3 bg-2"></div>
                <div className="media-body">
                  <h5 className="pb-2">
                    <a href="talent.html">Nhận tư vấn từ admin</a>
                  </h5>
                  <p>
                    Bạn có thể chat với admin để nhận được tư vấn về sách phù
                    hợp với sở thích của mình
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 responsive-column-half">
              <div className="media media-card align-items-center hover-s">
                <div className="icon-element mr-3 bg-3"></div>
                <div className="media-body">
                  <h5 className="pb-2">
                    <a href="advertising.html">Ký gửi sách</a>
                  </h5>
                  <p>
                    Chức năng cho phép quý khách đăng sách của mình lên thư viện
                    để cho thuê, giúp có thêm thu nhập
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="get-started-area pt-70px pb-70px bg-gray position-relative z-index-1">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 py-4">
              <h2 class="section-title fs-30 lh-40">
                Còn chờ gì nữa mà không đăng ký thành viên ngay lúc này
              </h2>
            </div>
            <div class="col-lg-5 text-right">
              <a href="free-demo.html" class="btn theme-btn">
                Đăng ký ngay <i class="la la-arrow-right icon ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
