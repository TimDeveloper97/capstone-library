import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/post";
import Loading from "../../components/Loading/Loading";
import { getImgUrl } from "../../helper/helpFunction";
import ListPost from "./ListPost";

export default function Post() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const posts = useSelector((state) => state.post);
  const [listPost, setListPost] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    numberOfPage: 1,
  });
  const setupPage = (page) => {
    const start = page * pagination.pageSize;
    setPagination((prev) => {
      return {
        ...prev,
        numberOfPage: Math.ceil(posts.length / prev.pageSize),
      };
    });
    setListPost(posts.slice(start, start + pagination.pageSize));
  };

  useEffect(() => {
    posts && setupPage(0);
  }, [posts]);

  const handleChangePage = (e, p) => {
    setupPage(p - 1);
  };

  const listNumberPage = [10, 20, 30, 40, 50];
  const handleChangePageSize = (event) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageSize: event.target.value,
      };
    });
    setupPage(0);
  };

  const [arrange, setArrange] = useState(0);
  const listArrange = [
    { value: 0, text: "Chọn tiêu chí" },
    { value: 1, text: "Tên" },
    { value: 2, text: "Ngày cho thuê" },
    { value: 3, text: "Phí" },
  ];

  const handleChangeSelect = (event) => {
    setArrange(event.target.value);
    switch (event.target.value) {
      case 1:
        setListPost((prev) =>
          prev.sort((a, b) => a.title.localeCompare(b.title)).slice()
        );
        break;
      case 2:
        setListPost((prev) => prev.sort((a, b) => a.noDays - b.noDays).slice());
        break;
      case 3:
        setListPost((prev) => prev.sort((a, b) => a.fee - b.fee).slice());
        break;
      default:
        setListPost((prev) => prev.sort((a, b) => a.id - b.id).slice());
        break;
    }
  };
  const [keyword, setKeyword] = useState("");
  const handleSearch = (event) => {
    //event.preventDefault();
    setKeyword(event.target.value);
    console.log(keyword);
    setListPost(
      posts.filter((post) => post.title.indexOf(event.target.value) !== -1)
    );
  };

  return posts ? (
    <section className="question-area pb-40px">
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div className="question-tabs mb-50px">
              <div className="tab-content pt-40px" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <div className="filters d-flex align-items-center justify-content-between pb-4">
                    <h3 className="fs-17 fw-medium">Tất cả post</h3>

                    <div
                      className="filter-option-box"
                      style={{ display: "flex" }}
                    >
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div
                          className="form-group mb-0"
                          style={{ width: "300px", marginRight: "30px" }}
                        >
                          <input
                            className="form-control form--control"
                            type="text"
                            name="search"
                            placeholder="Nhập tên post..."
                            value={keyword}
                            onChange={(e) => handleSearch(e)}
                          />
                          <button className="form-btn" type="submit">
                            <i className="la la-search"></i>
                          </button>
                        </div>
                      </form>
                      <FormControl style={{ width: "200px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Sắp xếp
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={arrange}
                          label="Sắp xếp"
                          onChange={handleChangeSelect}
                        >
                          {listArrange.map((arrange, index) => {
                            return (
                              <MenuItem value={arrange.value} key={index}>
                                {arrange.text}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      {listPost && <ListPost posts={listPost} />}
                      <div className="row paging" style={{ marginTop: "50px" }}>
                        <div
                          className="col-md-6"
                          style={{ paddingTop: "20px" }}
                        >
                          <Stack spacing={2}>
                            <Pagination
                              count={pagination.numberOfPage}
                              color="primary"
                              onChange={handleChangePage}
                            />
                          </Stack>
                        </div>
                        <div className="col-md-6">
                          <FormControl style={{ width: "100px" }}>
                            <InputLabel id="demo-simple-select-label">
                              Bản ghi
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={pagination.pageSize}
                              label="Bản ghi"
                              onChange={handleChangePageSize}
                            >
                              {listNumberPage.map((num, index) => {
                                return (
                                  <MenuItem value={num} key={index}>
                                    {num}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
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
