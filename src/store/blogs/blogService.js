import axiosServices from "@/utils/axios";

// Fetch blogs with pagination, sorting, and filters
const fetchBlogsService = async (pageIndex, pageSize, sorting, filters) => {
  return await axiosServices.get("blogs", {
    params: {
      pageIndex,
      pageSize,
      sorting: sorting, //JSON.stringify(sorting),
      filters: filters,
    },
  });
};
// Fetch blogs with pagination, sorting, and filters
const fetchBlogByUserService = async (
  pageIndex,
  pageSize,
  sorting,
  filters
) => {
  return await axiosServices.get("blogs/my", {
    params: {
      pageIndex,
      pageSize,
      sorting: sorting,
      filters: filters,
    },
  });
};
// Insert Blog
const insertBlog = (newBlog) => {
  return axiosServices.post("blogs", newBlog).then((response) => response);
};

// Update Blog
const updateBlog = (id, updatedBlog) => {
  return axiosServices
    .put(`blogs/${id}`, updatedBlog)
    .then((response) => response);
};

// Delete a category
const deleteBlog = async (id) => {
  return await axiosServices.delete(`blogs/${id}`);
};

const BlogService = {
  fetchBlogsService,
  fetchBlogByUserService,
  insertBlog,
  updateBlog,
  deleteBlog,
};

export default BlogService;
