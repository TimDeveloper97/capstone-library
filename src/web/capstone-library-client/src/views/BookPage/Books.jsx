import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ListBook from '../../components/ListBook/ListBook'

export default function Books() {
  return (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-2 col-xs-2">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-10 col-xs-10">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="filters d-flex align-items-center justify-content-between pb-4">
                    <h3 className="fs-17 fw-medium">Tất cả sách</h3>
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <ListBook />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}