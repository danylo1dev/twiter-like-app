import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
export const app = initializeApp({
  apiKey: "AIzaSyC0c7AuYqHsZWMjP1hsCtQg50UT_756JVE",
  authDomain: "twiter-like.firebaseapp.com",
  projectId: "twiter-like",
  storageBucket: "twiter-like.appspot.com",
  messagingSenderId: "16937741345",
  appId: "1:16937741345:web:c3a70e21058c3fdcdf4760",
});
