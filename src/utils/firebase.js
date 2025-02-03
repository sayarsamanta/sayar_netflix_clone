// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmugWgSu8Apxa24H8N4Zw9Gm7O0Thps5k",
  authDomain: "sayarnetflixclone.firebaseapp.com",
  projectId: "sayarnetflixclone",
  storageBucket: "sayarnetflixclone.firebasestorage.app",
  messagingSenderId: "232728765342",
  appId: "1:232728765342:web:2800ec8e2cb3e9af782c8f",
  measurementId: "G-8X3TYJ4VYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
