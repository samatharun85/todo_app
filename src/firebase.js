import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "todo-8869a.firebaseapp.com",
  projectId: "todo-8869a",
  storageBucket: "todo-8869a.appspot.com",
  messagingSenderId: "814910476889",
  appId: "1:814910476889:web:35341fa7fef45de4ba5748",
  measurementId: "G-NZYY7MN294"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);