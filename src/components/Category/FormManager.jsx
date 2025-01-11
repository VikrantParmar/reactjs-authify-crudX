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
} from "@mui/material";
import { _loader } from "@/utils/loaderHelper";
import * as Yup from "yup";
import { useShowNotification } from "@/hooks/useShowNotification";
import { NotificationMessage } from "@/components/@extended/NotificationMessage";
//import AlertRecordDelete from "@/components/Category/AlertRecordDelete";
import { useDispatch, useSelector } from "react-redux";
import AnimateButton from "@/components/@extended/AnimateButton";
import {
  insertCategory,
  updateCategory,
} from "@/store/categories/categorySlice";
const recordDataSchema = Yup.object().shape({
  name: Yup.string().max(255).required("Category Name is required"),
});

export default function FormManager({ recordData, closeModal, onSuccess }) {
  const dispatch = useDispatch();
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const modalRef = useRef(null);

  const initialValues = useMemo(() => {
    return {
      ...recordData,
      name: recordData?.name || "",
    };
  }, [recordData]);

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
      if (recordData) {
        await dispatch(updateCategory({ id: values.id, categoryData: values }))
          .unwrap()
          .then((response) => {
            showNotification(
              response?.message || "Category updated successfully.",
              "success"
            );
            resetForm();
            setSubmitting(false);
            if (onSuccess) {
              onSuccess(response);
            }
            closeModal();
          })
          .catch((error) => {
            setSubmitting(false);
            if (error?.errors) {
              setErrors(error.errors);
            } else {
              setStatus({
                success: false,
                message:
                  error?.message ||
                  "An error occurred while updating the category.",
              });
            }
          });
      } else {
        await dispatch(insertCategory(values))
          .unwrap()
          .then((response) => {
            showNotification(
              response?.message || "Category inserted successfully.",
              "success"
            );
            resetForm();
            setSubmitting(false);
            if (onSuccess) {
              onSuccess(response);
            }
            closeModal();
          })
          .catch((error) => {
            setSubmitting(false);
            if (error?.errors) {
              setErrors(error.errors);
            } else {
              setStatus({
                success: false,
                message:
                  error?.message ||
                  "An error occurred while adding the category.",
              });
            }
          });
      }
    } catch (error) {
      setSubmitting(false);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        setStatus({
          success: false,
          message:
            error?.message || "An error occurred while adding the category.",
        });
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={recordDataSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Ensures form values reset when initialValues change
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
              {recordData ? "Update Category" : "New Category"}
            </DialogTitle>
            <Divider />
            {status && status.message && <NotificationMessage data={status} />}
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
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
                        onClick={() => closeModal()}
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
                          isAdd: recordData,
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
      {/* {recordData && (
        <AlertRecordDelete
          id={Number(recordData.id)}
          recordData={recordData}
          open={openAlert}
          handleClose={() => {
            setOpenAlert(false);
            closeModal();
          }}
        />
      )} */}
    </>
  );
}

FormManager.propTypes = {
  recordData: PropTypes.any,
  closeModal: PropTypes.func,
  onSuccess: PropTypes.func,
};
