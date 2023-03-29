import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostByUser } from "../../apis/post";
import Loading from "../../components/Loading/Loading";
import { getColorStatus } from "../../helper/helpFunction";

export default function UserDeposit() {
  const [listPostRequest, setListPostRequest] = useState([]);
  //const navigate = useNavigate();
  //const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    const getPost = async () => {
      const { data } = await getPostByUser();
      //data.value.filter((val) => val.user === user.id);
      setListPostRequest(
        data.value.map((val) => {
          return {
            ...val,
            statusColor: getColorStatus(val.status),
          };
        })
      );
    };
    getPost();
  }, []);

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };

  return listPostRequest ? (
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
            <h2 className="section-title pb-3">Danh sách ký gửi</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="col-md-2">
              <Link to={"/user/add-post"}>
                <button className="btn btn-success">Ký gửi sách</button>
              </Link>
            </div>
          </div>
          <div className="row">
            {listPostRequest.map((los, index) => {
              return (
                <div
                  className="col-md-4 col-sm-12 col-xs-12"
                  key={index}
                  style={{ padding: "10px 20px" }}
                >
                  <div className="card card-item">
                    <div className="card-body card-order">
                      <div className="day-display">
                        <p>{convertToDay(los.createdDate)}</p>
                        <p style={{ margin: "15px 0" }}>
                          {los.noDays} ngày <br /> {los.fee} %
                        </p>
                        <p style={{ color: "red" }}>
                          {convertToDay(
                            +los.createdDate + 1000 * 60 * 60 * 24 * los.noDays
                          )}
                        </p>
                      </div>
                      <div className="item-body">
                        <p style={{ fontWeight: "500", fontSize: "1.25rem" }}>
                          {los.user}
                        </p>
                        <p style={{ marginBottom: "10px" }}>{los.title}</p>
                        <span
                          className="order-status"
                          style={{ backgroundColor: los.statusColor.color }}
                        >
                          {los.statusColor.state}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
