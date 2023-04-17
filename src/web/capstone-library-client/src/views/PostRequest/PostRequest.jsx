import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { acceptPost, denyPost, getPostRequest } from "../../apis/post";
import Loading from "../../components/Loading/Loading";
import { getColorStatus } from "../../helper/helpFunction";
import { NotificationContainer } from "react-notifications";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";

export default function PostRequest() {
  const [listPostRequest, setListPostRequest] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await getPostRequest();
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

  const handleAccept = async (e, id) => {
    e.preventDefault();
    await acceptPost(id);
    navigate(0);
  };

  const handleDeny = async (e, id) => {
    e.preventDefault();
    await denyPost(id);
    navigate(0);
  };

  const convertToDay = (input) => {
    const day = new Date(input);
    return moment(day).format("D/MM/YYYY");
  };
  return listPostRequest ? (
    <>
      <section className="hero-area bg-white shadow-sm pt-80px pb-80px">
        <NotificationContainer />
        <span className="icon-shape icon-shape-1"></span>
        <span className="icon-shape icon-shape-2"></span>
        <span className="icon-shape icon-shape-3"></span>
        <span className="icon-shape icon-shape-4"></span>
        <span className="icon-shape icon-shape-5"></span>
        <span className="icon-shape icon-shape-6"></span>
        <span className="icon-shape icon-shape-7"></span>
        <div className="container">
          <div className="hero-content text-center">
            <h2 className="section-title pb-3">Danh sách yêu cầu post</h2>
          </div>
        </div>
      </section>
      <section className="cart-area pt-80px pb-80px position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <ManagementSidebar />
            </div>
            <div className="col-md-10">
            <div className="row">
            {listPostRequest && listPostRequest.map((los, index) => {
              return (
                <div
                  className="col-md-6 col-sm-12 col-xs-12"
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
                      {los.status === 2 ? null : los.status === 4 ? (
                        <div className="button-action">
                          <div className="tooltip-action">
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleAccept(e, los.id)}
                            >
                              <FontAwesomeIcon icon={faCheck} /> Chấp thuận
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => handleDeny(e, los.id)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                              Từ chối
                            </button>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
