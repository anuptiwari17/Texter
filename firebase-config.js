// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw6NOeGTWr_xagr8JqwX3Qv_TnRRwANO8",
  authDomain: "sample-project-c1e86.firebaseapp.com",
  projectId: "sample-project-c1e86",
  storageBucket: "sample-project-c1e86.firebasestorage.app",
  messagingSenderId: "823647905098",
  appId: "1:823647905098:web:00f730c2444529f58f0db3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth for use in firebase-auth.js
export { auth };
