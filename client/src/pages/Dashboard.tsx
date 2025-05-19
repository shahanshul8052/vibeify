// src/pages/Dashboard.tsx

import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";

// Dashboard component
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Check for auth token on load
  useEffect(() => {
    auth.currentUser?.getIdToken(true).then((token) => {
      console.log("🔥 Firebase Token:", token);
    });
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      {/* Main dashboard content */}
      <div style={{ padding: "2rem" }}>
        <h2>🎧 Welcome to Vibeify Dashboard</h2>
        <p>This is a protected route — only accessible if logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Persistent music player at the bottom */}
      <MusicPlayer />
    </>
  );
};

export default Dashboard;
