import { combineReducers } from "redux";
import authReducer from "@/store/auth/authSlice";
import categoryReducer from "@/store/categories/categorySlice";
import blogReducer from "@/store/blogs/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  blogs: blogReducer,
});

export default rootReducer;
