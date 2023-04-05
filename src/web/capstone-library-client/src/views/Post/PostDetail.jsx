import {
  faBagShopping,
  faCartPlus,
  faDongSign,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { checkout, orderBook } from "../../actions/order";
import { getPostById } from "../../apis/post";
import Carousel from "../../components/Carousel/Carousel";
import Loading from "../../components/Loading/Loading";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "./post.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function DetailPost() {
  const [currentPost, setCurrentPost] = useState();
  const [listImg, setListImg] = useState([]);

  const dispatch = useDispatch();
  const isAdmin =
    JSON.parse(window.localStorage.getItem("user")).roles[0] === "ROLE_ADMIN";

  const { id } = useParams();
  //const books = useSelector(state => state.book);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await getPostById(id);
      setCurrentPost(data.value);
      let tempList = [];
      data.value.postDetailDtos.forEach((post) => {
        //console.log(post);
        post.bookDto.imgs.forEach((img) => {
          tempList.push(img.fileName);
        });
      });
      setListImg(tempList);
      //   const tempLink = data.value.imgs.map((img, index) => {
      //     return {
      //       id: index,
      //       className: "img-button",
      //       link: getImgUrl(img.fileName)
      //     }
      //   });
      //   console.log(tempLink);
      //   setLinks(tempLink);
      //   setImgShow(getImgUrl(data.value.imgs[0].fileName));
    };
    fetchPost();
  }, [id]);
  const handleRentBook = async () => {
    const response = await dispatch(orderBook(currentPost.id));
    console.log(response);
    if (response.success) {
      NotificationManager.success(response.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(response.message, "Lỗi", 2000);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const confirmRentNow = () => {
    setOpen(true);
    //handleRentNow();
  };

  const handleRentNow = async () => {
    const response = await dispatch(
      checkout({ orders: [{ id: currentPost.id }] })
    );
    if (response.success) {
      NotificationManager.success(response.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(response.message, "Lỗi", 2000);
    }
    setOpen(false);
  };

  return currentPost ? (
    <section className="question-area pb-40px">
      <NotificationContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <div className="detail-book">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-6">
                              <Carousel images={listImg} />
                            </div>
                            <div className="col-md-6 book-info">
                              <h5 className="book-title">
                                {currentPost?.title}
                              </h5>
                              <div className="number">
                                <h6 className="publisher">
                                  Đăng bởi: {currentPost?.user}
                                </h6>
                                <h6 className="publisher">
                                  Ngày cho thuê: {currentPost?.noDays}
                                </h6>
                              </div>
                              <p className="price">
                                {currentPost?.fee}{" "}
                                <FontAwesomeIcon icon={faDongSign} />
                              </p>
                              <p className="description">
                                {currentPost?.content}
                              </p>
                              <div className="cart-form mb-50px table-responsive px-2">
                                <table className="table generic-table custom-table">
                                  <thead>
                                    <tr>
                                      <th scope="colSpan">Tên sách</th>
                                      <th scope="colSpan">Giá</th>
                                      <th scope="colSpan">Số lượng</th>
                                      <th scope="colSpan">Thành tiền</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ borderBottom: "none" }}>
                                    {currentPost.postDetailDtos.map(
                                      (post, index) => {
                                        return (
                                          <tr key={index}>
                                            <th scope="row">
                                              <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                                <div className="media-body">
                                                  <h5 className="fs-15 fw-medium">
                                                    <Link
                                                      to={`/detail-book/${post.bookDto.id}`}
                                                    >
                                                      {post.bookDto.name}
                                                    </Link>
                                                  </h5>
                                                </div>
                                              </div>
                                            </th>
                                            <td>{post.bookDto.price}</td>
                                            <td>{post.quantity}</td>
                                            <td>
                                              {post.bookDto.price *
                                                post.quantity}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>

                              {!isAdmin && (
                                <div className="buy">
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleRentBook()}
                                  >
                                    <FontAwesomeIcon icon={faCartPlus} /> {"  "}
                                    Thêm vào giỏ
                                  </button>
                                  <button
                                    className="btn btn-info"
                                    onClick={() => confirmRentNow()}
                                  >
                                    <FontAwesomeIcon icon={faBagShopping} />{" "}
                                    {"  "}
                                    Thuê ngay
                                  </button>
                                </div>
                              )}
                            </div>
                            <Dialog open={open} onClose={handleClose}>
                              <DialogTitle>Xác nhận thuê ngay?</DialogTitle>

                              <DialogActions>
                                <Button onClick={handleRentNow}>
                                  Xác nhận
                                </Button>
                                <Button onClick={handleClose}>Hủy</Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}
