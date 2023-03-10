import Slider from "../../components/slider/Slider";
import img_1 from "../../assets/img/skill-book.jpg";
import ListBookItem from "../../components/listBookItem/ListBookItem";
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/category";
export default function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  
  const categories = useSelector(state => state.category);
  return (
    <>
      <Slider />
      <Container className="self-header wrapper ta-l">
        <p className="categories-title">Khám phá danh mục</p>
        <div className="list-categories">
          {categories && categories.map((cate, index) => {
            return (
              <div className="category-item" key={index}>
                <div className="img-wrapper">
                  <img src={img_1} alt="" />
                </div>
                <p style={{textAlign: 'center'}}>{cate.name}</p>
              </div>
            );
          })}
        </div>
      </Container>
      <ListBookItem title={"Sách mới đăng"} numberItem={20} />
      <Container className="self-header">
        <p className="key-word-title">Các từ khóa phổ biến</p>
        <ul className="key-words">
          <Row>
            {[...Array(15)].map((item, index) => {
              return (
                <Col md={3} key={index}>
                  <li className="key-word-item ">
                    <a href="#">Sách kỹ năng</a>
                  </li>
                </Col>
              );
            })}
          </Row>
        </ul>
      </Container>
    </>
  );
}
