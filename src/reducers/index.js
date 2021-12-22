import { combineReducers } from "redux";
import { articleReducer } from "./articleReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  article: articleReducer,
});

export default rootReducer;
