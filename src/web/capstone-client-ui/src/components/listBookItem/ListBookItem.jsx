import React from "react";
import { Container } from "react-bootstrap";
import BookItem from "../bookItem/BookItem";
import "./listBookItem.css";

export default function ListBookItem(props) {
  return (
    <Container className="self-header wrapper ta-l">
      <p className="categories-title">{props.title}</p>
      <div className="list-categories">
        {
            [...Array(20)].map((item, index) => {
                return <BookItem key={index} />
            })
        }
      </div>
    </Container>
  );
}
