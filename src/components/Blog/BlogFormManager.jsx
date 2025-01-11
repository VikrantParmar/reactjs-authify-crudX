import PropTypes from "prop-types";
import { useEffect, useState, useMemo, useRef } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Stack,
  Grid,
  Divider,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { _loader } from "@/utils/loaderHelper";
import * as Yup from "yup";
import { useShowNotification } from "@/hooks/useShowNotification";
import { NotificationMessage } from "@/components/@extended/NotificationMessage";
import { useDispatch, useSelector } from "react-redux";
import AnimateButton from "@/components/@extended/AnimateButton";
import { insertBlog, updateBlog } from "@/store/blogs/blogSlice";
import { fetchCategories } from "@/store/categories/categorySlice";
import { useLocation, useNavigate } from "react-router";
const blogDataSchema = Yup.object().shape({
  title: Yup.string().max(255).required("Blog Title is required"),
  content: Yup.string().required("Blog Description is required"),
  category_id: Yup.string().required("Blog Category is required"),
});

export default function BlogFormManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [blogData, setBlogData] = useState(blog);
  const modalRef = useRef(null);

  const { categories, rowCount, isLoading, isError, isRefetching } =
    useSelector((state) => state.categories);
  // Fetch categories on mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        await dispatch(fetchCategories({ isAll: true })).unwrap();
      } catch (error) {
        showNotification("Failed to load categories", "error");
      }
    };
    fetchCategoriesData();
  }, [dispatch]);

  const initialValues = useMemo(() => {
    return {
      ...blogData,
      title: blogData?.title || "",
      content: blogData?.content || "",
      category_id: blogData?.category_id || "",
    };
  }, [blogData]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [openAlert]);

  if (loading) {
    return _loader({ type: 1 });
  }

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      if (blogData) {
        await dispatch(updateBlog({ id: values.id, blogData: values }))
          .unwrap()
          .then((response) => {
            showNotification(
              response?.message || "Blog updated successfully.",
              "success"
            );
            resetForm();
            setSubmitting(false);
            navigate("/my-articles");
          })
          .catch((error) => {
            setSubmitting(false);
            if (error?.errors && Object.keys(error.errors).length > 0) {
              setErrors(error.errors);
            } else {
              setStatus({
                success: false,
                message:
                  error?.message ||
                  "An error occurred while updating the blog.",
              });
            }
          });
      } else {
        await dispatch(insertBlog(values))
          .unwrap()
          .then((response) => {
            showNotification(
              response?.message || "Blog inserted successfully.",
              "success"
            );
            resetForm();
            setSubmitting(false);
            navigate("/my-articles");
          })
          .catch((error) => {
            setSubmitting(false);
            if (error?.errors && Object.keys(error.errors).length > 0) {
              setErrors(error.errors);
            } else {
              setStatus({
                success: false,
                message:
                  error?.message || "An error occurred while adding the blog.",
              });
            }
          });
      }
    } catch (error) {
      setSubmitting(false);
      if (error?.errors && Object.keys(error.errors).length > 0) {
        setErrors(error.errors);
      } else {
        setStatus({
          success: false,
          message: error?.message || "An error occurred while adding the blog.",
        });
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={blogDataSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          status,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <DialogTitle fontWeight="bold">
              {blogData ? "Update Article" : "New Article"}
            </DialogTitle>
            <Divider />
            {status && status.message && <NotificationMessage data={status} />}
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={touched.category_id && Boolean(errors.category_id)}
                  >
                    <InputLabel>Blog Category</InputLabel>
                    <Select
                      name="category_id"
                      value={values.category_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Blog Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category_id && errors.category_id && (
                      <FormHelperText>{errors.category_id}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Blog Title"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="content"
                    as={TextField}
                    label="Blog Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    error={touched.content && Boolean(errors.content)}
                    helperText={touched.content && errors.content}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>{/* Conditional delete button */}</Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => navigate("/my-articles")}
                        sx={{ minWidth: "5vw" }}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ minWidth: "5vw" }}
                      >
                        {_loader({
                          type: "crud",
                          isSubmitting: isSubmitting,
                          isAdd: blogData,
                        })}
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );
}
