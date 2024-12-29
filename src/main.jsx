import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABrr2GX5OCrrOMDkWf8GyQa6tgqGt6kg4",
  authDomain: "wordly-game-f8de5.firebaseapp.com",
  projectId: "wordly-game-f8de5",
  storageBucket: "wordly-game-f8de5.firebasestorage.app",
  messagingSenderId: "28121026911",
  appId: "1:28121026911:web:75195dad9a21d5993e66ea",
  measurementId: "G-CE39ZKP0Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
