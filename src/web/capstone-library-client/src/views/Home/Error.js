import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <section className="error-area section-padding position-relative">
        <span className="icon-shape icon-shape-1"></span>
        <span className="icon-shape icon-shape-2"></span>
        <span className="icon-shape icon-shape-3"></span>
        <span className="icon-shape icon-shape-4"></span>
        <span className="icon-shape icon-shape-5"></span>
        <span className="icon-shape icon-shape-6"></span>
        <span className="icon-shape icon-shape-7"></span>
        <div className="container">
            <div className="text-center">
                <img src="./images/error-img.png" alt="error" className="img-fluid mb-40px" />
                <h2 className="section-title pb-3">Oops! Page not found!</h2>
                <p className="section-desc pb-4">Xin lỗi, chúng tôi không tìm thấy trang của bạn.</p>
                <Link className="btn theme-btn" to={'/'}> Về trang chủ </Link>
            </div>
        </div>
    </section>
  )
}
