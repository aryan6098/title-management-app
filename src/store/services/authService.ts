import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
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
      dispatch(setError("Something went wrong!"));
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
    } catch (err) {
      dispatch(setError("Something went wrong!"));
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
