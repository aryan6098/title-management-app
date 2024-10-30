import React from "react";
import { Button, Paper, Typography, Box, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import InputField from "../Common/InputField/InputField";
import { signUp } from "../../store/services/authService";
import { useAppDispatch } from "../../hook/reduxHooks";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const { login, error } = useAuth();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: isLogin
      ? Yup.string().notRequired()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: any) => {
    if (isLogin) {
      await login(values.email, values.password); 
    } else {
       await dispatch(signUp(values.email, values.password)); 
    }
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
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        {error && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
              {!isLogin && (
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                />
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                style={{ marginTop: "20px" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setIsLogin((prev) => !prev);
                  resetForm();
                }}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                {isLogin
                  ? "Create an account"
                  : "Already have an account? Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Auth;
