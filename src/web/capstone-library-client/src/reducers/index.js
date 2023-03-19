import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";

const allReducers = combineReducers({
  user,
});

export default allReducers;
