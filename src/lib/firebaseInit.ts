// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3BPxeFwJZoA0qM6Dwj9BwJp4sctDrwuA",
  authDomain: "kookkook-ff390.firebaseapp.com",
  projectId: "kookkook-ff390",
  storageBucket: "kookkook-ff390.appspot.com",
  messagingSenderId: "518421874937",
  appId: "1:518421874937:web:356ccad87cbbdd5c78ba28",
  measurementId: "G-MGMN9KZ0J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);