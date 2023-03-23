import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import category from "./categoryReducer";
import book from "./bookReducer";
import post from "./postReducer";

const allReducers = combineReducers({
  user,
  category,
  book,
  post
});

export default allReducers;
