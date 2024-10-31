import React from "react";
import { Button, Paper, Typography, Box, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import { useAuth } from "../../context/AuthContext";
import InputField from "../Common/InputField/InputField";
import { setError } from "../../store/authSlice";
import { useAppDispatch } from "../../hook/reduxHooks";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../utils/validationUtils";

const Login: React.FC = () => {
  const { login, error } = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await login(values.email, values.password);
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
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                style={{ marginTop: "20px" }}
              >
                Login
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  resetForm();
                  dispatch(setError(""));
                  navigate("/signup");
                }}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Create an account
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
