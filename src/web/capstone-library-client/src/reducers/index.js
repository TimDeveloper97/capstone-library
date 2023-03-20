import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import category from "./categoryReducer";

const allReducers = combineReducers({
  user,
  category,
});

export default allReducers;
