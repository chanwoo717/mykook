// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWZe88qLicLNGbOYSjZ8DvYT8oXkEqnUY",
  authDomain: "kookkook-52378.firebaseapp.com",
  projectId: "kookkook-52378",
  storageBucket: "kookkook-52378.appspot.com",
  messagingSenderId: "168982881198",
  appId: "1:168982881198:web:0526f180d8fc8374e39e3f",
  measurementId: "G-ES3N7NFTLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);