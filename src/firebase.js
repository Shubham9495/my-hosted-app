import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOLjT4H4jz2jmBNMq7C5XR4Eemz7gO1xQ",
  authDomain: "salon-booking-app-a8ce4.firebaseapp.com",
  projectId: "salon-booking-app-a8ce4",
  storageBucket: "salon-booking-app-a8ce4.appspot.com",
  messagingSenderId: "596761243879",
  appId: "1:596761243879:web:bde42158f7f3f241567242",
  measurementId: "G-QP95M1J9B4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };
