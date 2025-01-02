import React, { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetError } from "@/store/auth/authSlice";
import { useShowNotification } from "@/hooks/useShowNotification";
import { NotificationMessage } from "@/components/custom/NotificationMessage";
import { _loader } from "@/utils/loaderHelper";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useShowNotification();
  const { isLoading, message } = useSelector((state) => state.auth);
  // Validation schema using Yup
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (values, { setErrors, resetForm }) => {
    //showNotification("This is testing messaege", "success");
    // Dispatch the register thunk
    dispatch(register(values))
      .unwrap() // Ensure error handling with `createAsyncThunk`
      .then((response) => {
        resetForm();
        navigate("/login", {
          replace: true,
          state: { message: response?.message || "" },
        });
      })
      .catch((error) => {
        if (error?.errors) {
          // Set API validation errors on the form fields
          setErrors(error.errors);
        }
      });
  };
  return (
    <Container>
      <Box className="auth-box" sx={{ mx: "auto", my: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Register
            </Typography>
            <Divider />
            {message && <NotificationMessage data={message} />}
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
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
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Field
                        name="first_name"
                        as={TextField}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        error={touched.first_name && Boolean(errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="last_name"
                        as={TextField}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        error={touched.last_name && Boolean(errors?.last_name)}
                        helperText={touched.last_name && errors?.last_name}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="phone_number"
                        as={TextField}
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone_number}
                        error={
                          touched.phone_number && Boolean(errors?.phone_number)
                        }
                        helperText={
                          touched.phone_number && errors?.phone_number
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="email"
                        as={TextField}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        autoComplete="new-email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="password"
                        as={TextField}
                        label="Password"
                        variant="outlined"
                        type="password"
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
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
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
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                      >
                        {_loader({
                          type: "btn",
                          isSubmitting: isLoading,
                          btnTitle: "Register",
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
    </Container>
  );
};

export default RegisterPage;
