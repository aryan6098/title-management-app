import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { signUp } from "../../store/services/authService";
import { useAppDispatch } from "../../hook/reduxHooks";
import InputField from "../Common/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { setError } from "../../store/authSlice";
import { signupValidationSchema } from "../../utils/validationUtils";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const success = await dispatch(signUp(values.email, values.password));
    if (success) navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} style={{ padding: "20px", width: "400px" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <InputField name="email" label="Email" type="email" required />
              <InputField
                name="password"
                label="Password"
                type="password"
                required
              />
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                style={{ marginTop: "20px" }}
              >
                Sign Up
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  resetForm();
                  dispatch(setError(""));
                  navigate("/login");
                }}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Already have an account? Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default SignUp;
