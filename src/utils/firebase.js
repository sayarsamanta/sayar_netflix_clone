// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

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
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const auth = getAuth();
