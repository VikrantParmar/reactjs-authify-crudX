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
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "@/store/auth/authSlice";
import { useShowNotification } from "@/hooks/useShowNotification";
import { NotificationMessage } from "@/components/custom/NotificationMessage";
import { _loader } from "@/utils/loaderHelper";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useShowNotification();
  const { isLoading, message } = useSelector((state) => state.auth);
  const location = useLocation();
  const messageFromNavigate = location.state?.message;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const handleSubmit = (values, { setErrors, resetForm }) => {
    const { email, password } = values;
    dispatch(login({ email, password }))
      .unwrap()
      .then((response) => {
        resetForm();
        navigate("/");
        showNotification(response?.message, "success");
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
              Login
            </Typography>
            <Divider />
            {message ? (
              <NotificationMessage data={message} />
            ) : messageFromNavigate ? (
              <NotificationMessage
                data={{ status: true, message: messageFromNavigate }}
              />
            ) : null}

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
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
                          btnTitle: "Login",
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

export default LoginPage;
