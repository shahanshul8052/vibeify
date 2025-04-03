// Importing React and necessary hooks
import React, { useState } from "react";

// Importing Firebase Auth function for sign-in
import { signInWithEmailAndPassword } from "firebase/auth";

// Our custom Firebase auth instance (from firebase.ts)
import { auth } from "../firebase";

// React Router hook for navigation after login
import { useNavigate } from "react-router-dom";

// Login component (functional component using TypeScript)
const Login: React.FC = () => {
  // State for user input (email and password)
  const [email, setEmail] = useState("");        
  const [password, setPassword] = useState("");  

  // State to handle and display error messages
  const [error, setError] = useState("");        

  // useNavigate allows us to redirect the user after login
  const navigate = useNavigate();                

  // Function to handle form submission and login logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Call Firebase's sign-in method with user input
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, redirect to dashboard page
      navigate("/dashboard");
    } catch (err: any) {
      // If there's an error (e.g., wrong password), display it
      setError(err.message);  
    }
  };

  // The return block renders the login form UI
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        
        {/* Email input */}
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <br />

        {/* Password input */}
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <br />

        {/* Submit button */}
        <button type="submit">Log In</button>

        {/* If there's an error, show it */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

// Export the component so it can be used in routes
export default Login;
