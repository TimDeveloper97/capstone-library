import React from 'react'
import { Star } from 'react-bootstrap-icons'
import './bookItem.css'

export default function BookItem() {
  return (
    <div className='book-item'>
    <img />
    <p className="book-title"></p>
    <div>
        4.8 <Star></Star> <span>|</span> Đã được thuê 5000+
    </div>
    <div className="book-price">100.000 đ</div>
    <div className="sub-title">Sách rất hay</div>
    <a href='#'></a>
</div>
  )
}
