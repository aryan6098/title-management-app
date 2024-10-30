import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { toast } from "react-toastify";

import { clearUser, setError, setLoading, setUser } from "../authSlice";
import { auth } from "../../config/firebaseConfig";

export const signUp = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
    } catch (error: any) {
      let errorMessage;

      // Check Firebase error codes and provide specific messages
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already exists. Please use a different email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else {
        errorMessage = "Something went wrong! Please try again.";
      }
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    }
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading());
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", email);
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      toast.success("Login successful!");
    } catch (error: any) {
      let errorMessage = "Something went wrong!";
      // Handle specific Firebase error messages
      if (error.code === "auth/invalid-credential") {
        errorMessage =
          "Invalid credentials. Please check your email and password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      }
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    }
  };
};

export const logout = () => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser);
  } catch (error: any) {
    dispatch(setError("Something went wrong!"));
  }
};
