import { combineReducers } from "redux";
import form from "./form";
import auth from "./auth";

const rootReducer = combineReducers({
  form,
  auth,
});

export default rootReducer;
