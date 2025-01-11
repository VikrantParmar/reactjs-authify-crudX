import axiosServices from "@/utils/axios";

// Fetch categories with pagination, sorting, and filters
const fetchCategoriesService = async (
  pageIndex,
  pageSize,
  sorting,
  filters
) => {
  return await axiosServices.get("categories", {
    params: {
      pageIndex,
      pageSize,
      sorting: sorting, //JSON.stringify(sorting),
      filters: filters,
    },
  });
};

const fetchAllCategoryService = async () => {
  return await axiosServices.get("categories/all");
};

// Insert Category
const insertCategory = (newCategory) => {
  return axiosServices
    .post("categories", newCategory)
    .then((response) => response);
};

// Update Category
const updateCategory = (id, updatedCategory) => {
  return axiosServices
    .put(`categories/${id}`, updatedCategory)
    .then((response) => response);
};

// Delete a category
const deleteCategory = async (id) => {
  return await axiosServices.delete(`categories/${id}`);
};

const CategoryService = {
  fetchCategoriesService,
  insertCategory,
  updateCategory,
  deleteCategory,
  fetchAllCategoryService,
};

export default CategoryService;
