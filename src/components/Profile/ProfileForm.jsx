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
import { updateProfile, fetchProfile } from "@/store/auth/authThunks";
import { _loader } from "@/utils/loaderHelper";
import { useShowNotification } from "@/hooks/useShowNotification";
import { NotificationMessage } from "@/components/@extended/NotificationMessage";
import AnimateButton from "@/components/@extended/AnimateButton";
const ProfileForm = () => {
  const dispatch = useDispatch();
  const { showNotification } = useShowNotification();
  const { isLoading, updateLoading, user, message } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  useEffect(() => {
    // Check if user data is not loaded and avoid fetching if already loading
    dispatch(fetchProfile());
  }, []);

  const handleSubmit = (values, { setErrors }) => {
    //console.log(profile);return false;
    //showNotification("This is testing messaege", "success");
    // Dispatch the register thunk
    dispatch(updateProfile(values))
      .unwrap() // Ensure error handling with `createAsyncThunk`
      .then(() => {})
      .catch((error) => {
        if (error?.errors && Object.keys(error.errors).length > 0) {
          // Set API validation errors on the form fields
          setErrors(error.errors);
        }
      });
  };
  if (isLoading) {
    return _loader({ type: "" });
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Update Profile
          </Typography>
          <Divider />

          {message && <NotificationMessage data={message} />}
          <Formik
            initialValues={{
              first_name: user?.first_name || "",
              last_name: user?.last_name || "",
              email: user?.email || "",
              phone_number: user?.phone_number || "",
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
                <Divider />
                <Grid container spacing={2} sx={{ mt: 2 }}>
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
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      disabled
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
                        touched.phone_number && Boolean(errors.phone_number)
                      }
                      helperText={touched.phone_number && errors.phone_number}
                    />
                  </Grid>
                  <Grid item>
                    <AnimateButton>
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
                          btnTitle: "Save Changes",
                        })}
                      </Button>
                    </AnimateButton>
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

export default ProfileForm;
