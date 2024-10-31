import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import TitleDashboard from "./components/Dashboard/TitleDashboard";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Dashboard/Header";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <ToastContainer />
      {isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />

        <Route
          path="/"
          element={
            isAuthenticated ? <TitleDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
