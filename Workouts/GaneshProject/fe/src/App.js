import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/LoginComponent";
import SignupForm from './Components/SignupComponent';
import DashboardView from "./Components/DashboardView";
import { Box } from "@mui/material";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Box sx={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardView />} />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
