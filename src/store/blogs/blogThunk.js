import { createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "./blogService";

// Create the fetch thunk
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ pageIndex, pageSize, sorting, filters }, { rejectWithValue }) => {
    try {
      // Call the BlogService to fetch blogs with the provided arguments
      const response = await BlogService.fetchBlogsService(
        pageIndex,
        pageSize,
        sorting,
        filters
      );
      // Return the data if the request is successful
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the insert thunk
export const insertBlog = createAsyncThunk(
  "blogs/insertBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      // Call the BlogService to insert the blog
      const response = await BlogService.insertBlog(blogData);
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the update thunk
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const response = await BlogService.updateBlog(id, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the delete thunk
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BlogService.deleteBlog(id);
      return response.data; // Return response data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
