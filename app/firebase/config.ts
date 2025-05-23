// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0MN-DELFVtSI7eSmn7CtexALwFnC7mM0",
  authDomain: "advactivity-720be.firebaseapp.com",
  projectId: "advactivity-720be",
  storageBucket: "advactivity-720be.firebasestorage.app",
  messagingSenderId: "291988106369",
  appId: "1:291988106369:web:fb85be5bfe296a88a87180"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}