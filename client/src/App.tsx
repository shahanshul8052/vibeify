// src/App.tsx
import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";


const App: React.FC = () => {
  console.log("App loaded ✅");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

// PrivateRoute component to protect routes
// This component checks if the user is authenticated
// If authenticated, it renders the requested component
// If not, it redirects to the login page
const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? element : <div>Access denied. Please <a href="/login">login</a>.</div>;
};


export default App;
