import React from "react";
import { Container } from "react-bootstrap";
import "./home.css";
import Header from "../../components/header/Header";
import Slider from "../../components/slider/Slider";
import img_1 from "../../assets/img/skill-book.jpg";
import ListBookItem from "../../components/listBookItem/ListBookItem";
import Footer from "../../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
      <Container className="self-header wrapper ta-l">
        <p className="categories-title">Khám phá danh mục</p>
        <div className="list-categories">
          {[...Array(14)].map((x, index) => {
            return (
              <div className="category-item" key={index}>
                <div className="img-wrapper">
                  <img src={img_1} alt="" />
                </div>
                <p>Sach ky nang</p>
              </div>
            );
          })}
        </div>
      </Container>
      <ListBookItem title={"Tin đăng mới"} />
      <Footer />
    </>
  );
}
