import { combineReducers } from "redux";
import auth from "./authReducer";

const allReducers = combineReducers({
    auth,
});

export default allReducers;
