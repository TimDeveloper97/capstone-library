import React from 'react'

export default function Quotes() {
  return (
    <section className="testimonial-area section--padding">
        <div className="container">
            <div className="testimonial-carousel owl-carousel owl-theme owl-action-styled">
                <div className="carousel-card text-center">
                    <p className="section-desc w-75 mx-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa deserunt dolor ea iure iusto magnam minima, recusandae sequi sunt? Corporis delectus deserunt dicta exercitationem ipsum, iusto magnam minus molestias numquam perspiciatis
                        porro provident quae rem. Placeat saepe, sed. Vitae?</p>
                    <div className="divider bg-transparent my-4"><span className="mx-auto"></span></div>
                    <h3 className="pb-1 fs-17">Director of Product Management</h3>
                    <span>Microsoft</span>
                </div>
                <div className="carousel-card text-center">
                    <p className="section-desc w-75 mx-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa deserunt dolor ea iure iusto magnam minima, recusandae sequi sunt? Corporis delectus deserunt dicta exercitationem ipsum, iusto magnam minus molestias numquam perspiciatis
                        porro provident quae rem. Placeat saepe, sed. Vitae?</p>
                    <div className="divider bg-transparent my-4"><span className="mx-auto"></span></div>
                    <h3 className="pb-1 fs-17">Director of Engineering</h3>
                    <span>Elastic Cloud</span>
                </div>
            </div>
        </div>
    </section>
  )
}
