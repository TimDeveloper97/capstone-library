import {
  faBagShopping,
  faCartPlus,
  faDeleteLeft,
  faDongSign,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkout, orderBook } from "../../actions/order";
import { deletePost, getPostById } from "../../apis/post";
import Carousel from "../../components/Carousel/Carousel";
import Loading from "../../components/Loading/Loading";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "./post.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { formatMoney } from "../../helper/helpFunction";
import { addToCart } from "../../actions/cart";
import { getUser } from "../../actions/user";

export default function DetailPost() {
  const [currentPost, setCurrentPost] = useState();
  const [listImg, setListImg] = useState([]);
  const [sum, setSum] = useState(0);

  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("user"))?.roles[0];

  useEffect(() => {
    dispatch(getUser(JSON.parse(window.localStorage.getItem("user")).id));
  }, []);

  const userInfo = useSelector((state) => state.user);

  const { id } = useParams();
  //const books = useSelector(state => state.book);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await getPostById(id);
      setCurrentPost(data.value);
      let tempList = [];
      let tempSum = 0;
      data.value.postDetailDtos.forEach((post) => {
        post.bookDto.imgs.forEach((img) => {
          tempList.push(img.fileName);
        });
        tempSum += post.bookDto.price * post.quantity;
      });
      setListImg(tempList);
      setSum(tempSum);
    };
    fetchPost();
  }, [id]);
  const navigate = useNavigate();
  const handleRentBook = async () => {
    if (user) {
      const response = await dispatch(orderBook(currentPost.id));
      if (response.success) {
        dispatch(addToCart());
        NotificationManager.success(response.message, "Thông báo", 1000);
      } else {
        NotificationManager.error(response.message, "Lỗi", 1000);
      }
    } else {
      navigate("/login", { replace: true });
    }
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const confirmRentNow = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login", { replace: true });
    }
  };

  const handleRentNow = async () => {
    const response = await dispatch(
      checkout({ orders: [{ id: currentPost.id }] })
    );
    if (response.success) {
      NotificationManager.success(response.message, "Thông báo", 1000);
    } else {
      NotificationManager.error(response.message, "Lỗi", 1000);
    }
    setOpen(false);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const confirmDelete = () => {
    setOpenDelete(true);
  };
  const handleDeletePost = async () => {
    const res = await deletePost(currentPost.id);
    if (res.data.success) {
      navigate("/post", { replace: true });
    } else {
      NotificationManager.error(res.data.message, "Lỗi", 1000);
      setOpenDelete(false);
    }
  };

  return currentPost ? (
    <section className="question-area pb-40px">
      <NotificationContainer />
      <div className="container">
        <div className="row" style={{ backgroundColor: "#efefef" }}>
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
                              <h4 className="book-title cl-b">
                                {currentPost?.title}
                              </h4>
                              <div className="number cl-b">
                                <h5 className="publisher">
                                  Đăng bởi: {currentPost?.user}
                                </h5>
                                <h5 className="publisher">
                                  Ngày cho thuê: {currentPost?.noDays}
                                </h5>
                              </div>
                              <p className="price">
                                <span className="description">
                                  <span style={{ color: "#0D233E" }}>
                                    Tổng tiền:
                                  </span>{" "}
                                  {formatMoney(sum + currentPost?.fee)}{" "}
                                  <FontAwesomeIcon icon={faDongSign} />
                                </span>
                              </p>
                              <h6>Mô tả</h6>
                              <p className="">{currentPost?.content}</p>
                              <h6>
                                <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ
                              </h6>
                              <p>{currentPost?.address}</p>
                              <div className="cart-form table-responsive px-2">
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
                                            <td>
                                              {formatMoney(post.bookDto.price)}
                                            </td>
                                            <td>{post.quantity}</td>
                                            <td>
                                              {formatMoney(
                                                post.bookDto.price *
                                                  post.quantity
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              {(user === undefined ||
                                (user !== "ROLE_MANAGER_POST" &&
                                  user !== "ROLE_ADMIN")) && (
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
                              {user && user === "ROLE_MANAGER_POST" ? (
                                <div className="buy">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => confirmDelete()}
                                  >
                                    <FontAwesomeIcon icon={faDeleteLeft} />{" "}
                                    {"  "}
                                    Xóa post
                                  </button>
                                </div>
                              ) : null}
                            </div>
                            <Dialog open={open} onClose={handleClose}>
                              <DialogTitle>Xác nhận thuê ngay?</DialogTitle>
                              <DialogContent>
                                <p>
                                  Số tiền của bạn:{" "}
                                  {formatMoney(userInfo?.balance)} đ
                                </p>
                                <p>
                                  Số tiền còn lại sau thanh toán:{" "}
                                  {formatMoney(
                                    userInfo?.balance - (sum + currentPost?.fee)
                                  )}{" "}
                                  đ
                                </p>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleRentNow}>
                                  Xác nhận
                                </Button>
                                <Button onClick={handleClose}>Hủy</Button>
                              </DialogActions>
                            </Dialog>
                            <Dialog
                              open={openDelete}
                              onClose={() => setOpenDelete(false)}
                            >
                              <DialogTitle>
                                Xác nhận xóa bài đăng: {currentPost.title}?
                              </DialogTitle>

                              <DialogActions>
                                <Button onClick={() => handleDeletePost()}>
                                  Xác nhận
                                </Button>
                                <Button onClick={() => setOpenDelete(false)}>
                                  Hủy
                                </Button>
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
