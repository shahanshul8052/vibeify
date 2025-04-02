

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8dA-vPV-auPNz5hf1_fgHiXbwqdq17jg",
  authDomain: "vibeify-5cb3e.firebaseapp.com",
  projectId: "vibeify-5cb3e",
  storageBucket: "vibeify-5cb3e.firebasestorage.app",
  messagingSenderId: "141856196063",
  appId: "1:141856196063:web:5bf9e0fd9f130b31a3b06a",
  measurementId: "G-M4SHL3R19Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);