import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Loading from '../../components/Loading/Loading';

export default function PostRequest() {
//   return listOrderStatus ? (
//     <>
//       <section className="hero-area bg-white shadow-sm pt-80px pb-80px">
//         {/* <NotificationContainer /> */}
//         <span className="icon-shape icon-shape-1"></span>
//         <span className="icon-shape icon-shape-2"></span>
//         <span className="icon-shape icon-shape-3"></span>
//         <span className="icon-shape icon-shape-4"></span>
//         <span className="icon-shape icon-shape-5"></span>
//         <span className="icon-shape icon-shape-6"></span>
//         <span className="icon-shape icon-shape-7"></span>
//         <div className="container">
//           <div className="hero-content text-center">
//             <h2 className="section-title pb-3">Danh sách đơn hàng</h2>
//           </div>
//         </div>
//       </section>
//       <section className="cart-area pt-80px pb-80px position-relative">
//         <div className="container">
//           <div className="row">
//             {listOrderStatus.map((los, index) => {
//               return (
//                 <div
//                   className="col-md-4 col-sm-12 col-xs-12"
//                   key={index}
//                   style={{ padding: "10px 20px" }}
//                 >
//                   <div className="card card-item">
//                     <div className="card-body card-order">
//                       <div className="day-display">
//                         <p>{convertToDay(los.borrowedDate)}</p>
//                         <p style={{ margin: "15px 0" }}>{los.noDays} ngày</p>
//                         <p style={{ color: "red" }}>
//                           {convertToDay(
//                             +los.borrowedDate + 1000 * 60 * 60 * 24 * los.noDays
//                           )}
//                         </p>
//                       </div>
//                       <div className="item-body">
//                         <p style={{ fontWeight: "500", fontSize: "1.25rem" }}>
//                           {los.userId}
//                         </p>
//                         <p style={{ marginBottom: "10px" }}>
//                           <FontAwesomeIcon
//                             icon={faFileInvoiceDollar}
//                             color={"#7AA874"}
//                           />{" "}
//                           Tổng tiền: {los.totalPrice} VNĐ
//                         </p>
//                         <span
//                           className="order-status"
//                           style={{ backgroundColor: los.statusColor.color }}
//                         >
//                           {los.statusColor.state}
//                         </span>
//                       </div>
//                       {los.status === 2 ? null : los.status === 32 ? (
//                         <div className="button-action">
//                           <div className="tooltip-action">
//                             <button
//                               className="btn btn-success"
//                               onClick={(e) => handleConfirmOrder(e, los.id)}
//                             >
//                               <FontAwesomeIcon icon={faCheck} /> Chấp thuận
//                             </button>
//                             <button
//                               className="btn btn-danger"
//                               onClick={(e) => handleDenyOrder(e, los.id)}
//                             >
//                               <FontAwesomeIcon icon={faCheck} />
//                               Từ chối
//                             </button>
//                           </div>
//                           <span>
//                             <FontAwesomeIcon icon={faEllipsisVertical} />
//                           </span>
//                         </div>
//                       ) : los.status === 64 ? (
//                         <div className="button-action">
//                           <div className="tooltip-action">
//                             <button
//                               className="btn btn-success"
//                               onClick={(e) => handleReceivedOrder(e, los.id)}
//                             >
//                               <FontAwesomeIcon icon={faCheck} /> Xác nhận
//                             </button>
//                           </div>
//                           <span>
//                             <FontAwesomeIcon icon={faEllipsisVertical} />
//                           </span>
//                         </div>
//                       ) : los.status === 128 ? (
//                         <div className="button-action">
//                           <div className="tooltip-action">
//                             <button
//                               className="btn btn-success"
//                               onClick={(e) => handleBookReturn(e, los.id)}
//                             >
//                               <FontAwesomeIcon icon={faCheck} /> Xác nhận
//                             </button>
//                           </div>
//                           <span>
//                             <FontAwesomeIcon icon={faEllipsisVertical} />
//                           </span>
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   ) : (
//     <Loading />
//   );
}
