import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsNW5--WjV_fjLEPhSXVGknZai5-FLYA0",
  authDomain: "eco-platform-28fd0.firebaseapp.com",
  projectId: "eco-platform-28fd0",
  storageBucket: "eco-platform-28fd0.firebasestorage.app",
  messagingSenderId: "183204207006",
  appId: "1:183204207006:web:690ea9df7282fdf790de8f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
