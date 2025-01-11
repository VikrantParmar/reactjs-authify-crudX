import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "./categoryService";

// Create the fetch thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (
    { pageIndex, pageSize, sorting, filters, isAll },
    { rejectWithValue }
  ) => {
    try {
      // Call the CategoryService to fetch categories with the provided arguments
      const response = isAll
        ? await CategoryService.fetchAllCategoryService()
        : await CategoryService.fetchCategoriesService(
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
export const insertCategory = createAsyncThunk(
  "categories/insertCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      // Call the CategoryService to insert the category
      const response = await CategoryService.insertCategory(categoryData);
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the update thunk
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await CategoryService.updateCategory(id, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the delete thunk
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await CategoryService.deleteCategory(id);
      return response.data; // Return response data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
