// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-f25ae.firebaseapp.com",
  projectId: "food-f25ae",
  storageBucket: "food-f25ae.firebasestorage.app",
  messagingSenderId: "656007502208",
  appId: "1:656007502208:web:6e8a5190627abe38d08965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {app,auth}