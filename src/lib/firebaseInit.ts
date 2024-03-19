import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2TxWSQYodVEALxrXmDx1kjLw3c7wpCfE",
  authDomain: "kookkook-99003.firebaseapp.com",
  projectId: "kookkook-99003",
  storageBucket: "kookkook-99003.appspot.com",
  messagingSenderId: "587179969152",
  appId: "1:587179969152:web:88871816dc9ba43661b465",
  measurementId: "G-HY019R423S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);