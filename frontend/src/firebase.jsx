import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqqYHyZbAQkNzpd0zhgKcppySZcswyDTk",
  authDomain: "stack-overflow-f3a43.firebaseapp.com",
  projectId: "stack-overflow-f3a43",
  storageBucket: "stack-overflow-f3a43.appspot.com",
  messagingSenderId: "807516608726",
  appId: "1:807516608726:web:36f12a9cf6cb89eebe1177",
  measurementId: "G-XPT6TY571F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
