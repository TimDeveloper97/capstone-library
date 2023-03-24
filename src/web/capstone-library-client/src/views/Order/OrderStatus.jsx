import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getOrderStatus } from "../../apis/order";
import Loading from "../../components/Loading/Loading";

export default function OrderStatus() {
  const [listOrderStatus, setlistOrderStatus] = useState([]);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const { data } = await getOrderStatus();
      setlistOrderStatus(data.value);
    };
    fetchOrderStatus();
  }, []);

  return listOrderStatus ? (
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
            <h2 className="section-title pb-3">Danh sách đơn hàng</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div className="row">
            {listOrderStatus.map((los, index) => {
              return (
                <div key={index} className="col-md-5 cart cart-item">
                  <div className="cart-body cart-order">
                    <div className="day-display">
                      <p>{los.borrowedDate}</p>
                      <p>{los.noDays}</p>
                      <p>{los.borrowedDate}</p>
                    </div>
                    <div className="item-body">
                      <p>{los.userId}</p>
                      <p>{los.totalPrice}</p>
                      <p>"Đã thanh toán"</p>
                    </div>
                    <div className="button-action">
                      <div className="tooltip-action">
                        <button>
                          <FontAwesomeIcon icon={faCheck} /> Chấp thuận
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faCheck} />Từ chối
                        </button>
                      </div>
                      <span>
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <form action="#" className="cart-form mb-50px table-responsive px-2">
            <table className="table generic-table table-center">
              <thead>
                <tr className="table-header">
                  <th scope="colSpan">Khách hàng</th>
                  <th scope="colSpan">Tổng tiền</th>
                  <th scope="colSpan">Ngày thuê</th>
                  <th scope="colSpan">Ngày hết hạn</th>
                  <th scope="colSpan">Ngày còn lại</th>
                  <th scope="colSpan">Trạng thái</th>
                </tr>
              </thead>
              <tbody
                style={{ borderBottom: "1px solid rgba(128, 137, 150, .1)" }}
              >
                {listOrderStatus.map((los, index) => {
                  return (
                    <tr key={index}>
                      <th>{los.userId}</th>
                      <th>{los.totalPrice}</th>
                      <td>{los.borrowedDate}</td>
                      <td>{los.borrowedDate}</td>
                      <td>{los.noDays}</td>
                      <td>
                        <span>Đã thanh toán</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
