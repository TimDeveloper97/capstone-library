import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import category from "./categoryReducer";
import book from "./bookReducer";
import post from "./postReducer";
import order from "./orderReducer";
import cart from "./cartReducer";

const allReducers = combineReducers({
  user,
  category,
  book,
  post,
  order,
  cart,
});

export default allReducers;
