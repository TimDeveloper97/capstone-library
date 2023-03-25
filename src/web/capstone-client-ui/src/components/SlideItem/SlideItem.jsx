import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookItem from "../bookItem/BookItem";

export default function SlideItem(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Container className="self-header ta-l profile relevant-item">
      <h6>{props.title}</h6>
      <Carousel responsive={responsive}>
        {[...Array(10)].map((item, index) => {
          return <BookItem key={index} />;
        })}
      </Carousel>
    </Container>
  );
}
