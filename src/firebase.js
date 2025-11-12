// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// (Optional) import analytics only if you plan to use it
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOLjT4H4jz2jmBNMq7C5XR4Eemz7gO1xQ",
  authDomain: "salon-booking-app-a8ce4.firebaseapp.com",
  projectId: "salon-booking-app-a8ce4",
  storageBucket: "salon-booking-app-a8ce4.firebasestorage.app",
  messagingSenderId: "596761243879",
  appId: "1:596761243879:web:bde42158f7f3f241567242",
  measurementId: "G-QP95M1J9B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore and export it
export const db = getFirestore(app);

// (Optional) Enable analytics separately if you want
// const analytics = getAnalytics(app);
