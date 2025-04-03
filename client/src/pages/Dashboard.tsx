// src/pages/Dashboard.tsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Dashboard component (functional component using TypeScript)
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    await signOut(auth); // Firebase logout
    navigate("/login");  // Redirect to login
  };

  return (
    // Main dashboard UI
    <div style={{ padding: "2rem" }}>
      <h2>🎧 Welcome to Vibeify Dashboard</h2>
      <p>This is a protected route — only accessible if logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
