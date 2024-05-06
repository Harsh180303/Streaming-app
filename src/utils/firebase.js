// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuqj9M_N7HvfG42QDjTmWIhyS-Ldy_PDY",
  authDomain: "streaming-pro-h.firebaseapp.com",
  projectId: "streaming-pro-h",
  storageBucket: "streaming-pro-h.appspot.com",
  messagingSenderId: "847416858055",
  appId: "1:847416858055:web:c024318ac115a38b5775e2",
  measurementId: "G-PK3Z3FKTQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
