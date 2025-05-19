// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

// Define the shape of our context
// This will hold the user object and loading state
// The user object will be of type firebase.User or null
// The loading state will be a boolean indicating if the auth state is being loaded
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context
// This will be used to provide the authentication state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap around the app
// This component will manage the authentication state
// and provide it to the rest of the app
// It uses the useEffect hook to listen for changes in the authentication state
// and updates the context accordingly
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase listener
    // This effect runs once when the component mounts
    // It sets up a listener for authentication state changes
    // When the user logs in or out, the listener updates the user state
    // and sets loading to false
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });
    return unsubscribe; // Cleanup
  }, []);

    // Return the context provider with the user and loading state
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
// This hook allows components to access the authentication context
// without needing to use the useContext hook directly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
