import { combineReducers } from "redux";
import auth from "./authReducer";
import category from "./categoryReducer";

const allReducers = combineReducers({
    auth,
    category,
});

export default allReducers;
