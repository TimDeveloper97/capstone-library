import React from "react";
import { Container } from "react-bootstrap";
import BookItem from "../bookItem/BookItem";

export default function ListBookItem(props) {
  return (
    <Container className="self-header wrapper ta-l">
      <p className="categories-title">{props.title}</p>
      <div className="list-categories">
        {
            [...Array(props.numberItem)].map((item, index) => {
                return <BookItem key={index} id={index} />
            })
        }
      </div>
    </Container>
  );
}
