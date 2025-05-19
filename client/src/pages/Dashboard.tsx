// src/pages/Dashboard.tsx

import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/musicSlice";


// Dashboard component
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Define a test track object
  const testTrack = {
    id: "1",
    title: "Test Song",
    artist: "Test Artist",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  return (
    <>
      {/* Main dashboard content */}
      <div style={{ padding: "2rem" }}>
      <h2>🎧 Welcome to Vibeify Dashboard</h2>
      <p>This is a protected route — only accessible if logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <button
        onClick={() => dispatch(setCurrentTrack(testTrack))}
        style={{ marginTop: "1rem", padding: "0.5rem", backgroundColor: "#28a745", color: "white" }}
      >
        ▶️ Play Test Song
      </button>
    </div>


      {/* Persistent music player at the bottom */}
      <MusicPlayer />
    </>
  );
};

export default Dashboard;
