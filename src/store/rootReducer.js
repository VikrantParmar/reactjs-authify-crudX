import { combineReducers } from "redux";
import authReducer from "@/store/auth/authSlice";
import categoryReducer from "@/store/categories/categorySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
});

export default rootReducer;
