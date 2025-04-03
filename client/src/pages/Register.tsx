// Import React and hooks
import React, { useState } from "react";

// Firebase function to create user
import { createUserWithEmailAndPassword } from "firebase/auth";

// Our Firebase Auth instance
import { auth } from "../firebase";

// Router hook to redirect user after signup
import { useNavigate } from "react-router-dom";

// Define the Register component
const Register: React.FC = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error handling
  const [error, setError] = useState("");

  // Navigate hook from React Router
  const navigate = useNavigate();

  // Handles form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form reload
    try {
      // Firebase signup call
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login or dashboard after signup
      navigate("/login");
    } catch (err: any) {
      setError(err.message); // Show Firebase error
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>

      {/* Registration form */}
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Sign Up</button>
        {/* Error display */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
