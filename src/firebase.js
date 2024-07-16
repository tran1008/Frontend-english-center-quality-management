import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDUHlqdBCzUH47FeZRtDaQuIcnXn91yzfs",
  authDomain: "coffeorderingapp-cef55.firebaseapp.com",
  databaseURL: "https://coffeorderingapp-cef55-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffeorderingapp-cef55",
  storageBucket: "coffeorderingapp-cef55.appspot.com",
  messagingSenderId: "400369578925",
  appId: "1:400369578925:web:727a547076e3de6d34e724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);