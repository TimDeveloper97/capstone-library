import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import category from "./categoryReducer";
import book from "./bookReducer";

const allReducers = combineReducers({
  user,
  category,
  book
});

export default allReducers;
