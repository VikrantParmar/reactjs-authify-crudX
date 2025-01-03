import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "@/store/auth/authSlice";
import { _loader } from "@/utils/loaderHelper";
import { NotificationMessage } from "@/components/custom/NotificationMessage";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { updateLoading, message } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handlePasswordSubmit = (values, { setErrors, resetForm }) => {
    dispatch(updatePassword(values))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        if (error?.errors) {
          // Set API validation errors on the form fields
          setErrors(error.errors);
        }
      });
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Change Password
          </Typography>
          <Divider />
          {message && <NotificationMessage data={message} />}
          <Formik
            initialValues={{
              current_password: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Field
                      name="current_password"
                      as={TextField}
                      label="Current Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.current_password}
                      error={
                        touched.current_password &&
                        Boolean(errors.current_password)
                      }
                      helperText={
                        touched.current_password && errors.current_password
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      as={TextField}
                      label="New Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password_confirmation"
                      as={TextField}
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                      error={
                        touched.password_confirmation &&
                        Boolean(errors.password_confirmation)
                      }
                      helperText={
                        touched.password_confirmation &&
                        errors.password_confirmation
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={updateLoading}
                    >
                      {_loader({
                        type: "btn",
                        isSubmitting: updateLoading,
                        btnTitle: "Update Password",
                      })}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePasswordForm;
