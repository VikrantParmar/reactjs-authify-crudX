import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  insertBlog,
  updateBlog,
  deleteBlog,
} from "@/store/blogs/blogThunk";
const initialState = {
  blogs: [],
  rowCount: 0,
  isLoading: false,
  isLoadingDelete: false,
  isError: false,
  isRefetching: true, // Indicates if the data is being refetched
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setRowCount: (state, action) => {
      state.rowCount = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    resetBlogs: (state) => {
      state.blogs = [];
      state.rowCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch records
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRefetching = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefetching = false;
        /* if (action.payload) {
          state.blogs = [...state.blogs, ...(action.payload?.data?.list || [])];
          state.rowCount = action.payload?.data?.pagination?.totalItems || 0;
        } */
        if (action.payload) {
          if (action.meta.arg.isAuthenticated && !action.meta.arg.isAdmin) {
            // If authenticated, replace the blogs with the new data
            state.blogs = action.payload?.data?.list || [];
          } else {
            // If not authenticated, concatenate the new data with existing blogs
            state.blogs = [
              ...state.blogs,
              ...(action.payload?.data?.list || []),
            ];
          }
          state.rowCount = action.payload?.data?.pagination?.totalItems || 0;
        }
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isRefetching = false;
      })

      //Delete Record
      .addCase(deleteBlog.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.isLoadingDelete = false;
      })
      .addCase(deleteBlog.rejected, (state) => {
        state.isLoadingDelete = false;
      });
  },
});

export const { setBlogs, setRowCount, setLoading, setError, resetBlogs } =
  blogSlice.actions;
export { fetchBlogs, insertBlog, updateBlog, deleteBlog };
export default blogSlice.reducer;
