import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNumberOfCart } from "../../actions/cart";

export default function Cart() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/order", { replace: true });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNumberOfCart());
  }, []);
  const cart = useSelector((state) => state.cart);
  return (
    <div className="notice-wrapper" onClick={handleClick}>
      <FontAwesomeIcon icon={faCartShopping} size={"lg"} color="#fff" />
      {cart !== 0 && <span className="notice-number">{cart}</span>}
    </div>
  );
}
