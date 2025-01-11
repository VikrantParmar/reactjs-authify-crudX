import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
} from "@/store/categories/categoryThunk";
const initialState = {
  categories: [],
  rowCount: 0,
  isLoading: false,
  isLoadingDelete: false,
  isError: false,
  isRefetching: true, // Indicates if the data is being refetched
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      //Fetch records
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRefetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefetching = false;
        if (action.payload) {
          state.categories = action.payload?.data?.list || [];
          state.rowCount = action.payload?.data?.pagination?.totalItems || 0;
        }
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isRefetching = false;
      })

      //Delete Record
      .addCase(deleteCategory.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoadingDelete = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoadingDelete = false;
      });
  },
});

export const { setCategories, setRowCount, setLoading, setError } =
  categorySlice.actions;
export { fetchCategories, insertCategory, updateCategory, deleteCategory };
export default categorySlice.reducer;
