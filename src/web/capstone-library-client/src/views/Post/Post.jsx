import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
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
    pageSize: 1,
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

  const listNumberPage = [1, 2, 3, 40, 50];
  const handleChangePageSize = (event) => {
    setPagination(prev => {
      return {
        ...prev,
        pageSize: event.target.value
      }
    });
    setupPage(0);
  }

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
                    {/* <div className="filter-option-box w-20">
                    <select className="select-container">
                      <option className="newest">Newest </option>
                      <option className="featured">Bountied (390)</option>
                      <option className="frequent">Frequent </option>
                      <option className="votes">Votes </option>
                    </select>
                  </div> */}
                  </div>
                  <div className="question-main-bar">
                    <div className="questions-snippet">
                      <ListPost posts={listPost} />
                      <div className="row paging"  style={{marginTop: '50px'}}>
                      <div className="col-md-6" style={{paddingTop: '20px'}}>
                      <Stack spacing={2}>
                        <Pagination count={pagination.numberOfPage} color="primary" onChange={handleChangePage}/>
                      </Stack>
                      </div>
                      <div className="col-md-6">
                      <FormControl style={{width: '100px'}}>
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
