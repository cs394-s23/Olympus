import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import { connectAuthEmulator, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration for our app
const firebaseAppConfig = {
  apiKey: "AIzaSyC7eA771iXqjKeZlvib1NB8jXFm4ESkyD8",
  authDomain: "olympus-stats-screen.firebaseapp.com",
  projectId: "olympus-stats-screen",
  storageBucket: "olympus-stats-screen.appspot.com",
  messagingSenderId: "839647182634",
  appId: "1:839647182634:web:6cbe608a0a272dbcfb6853",
  measurementId: "G-64161NK765"
};

const firebaseDatabaseConfig = {
// your firebase config here
};

// Initialize Firebase for app
export const app = firebase.initializeApp(firebaseAppConfig);
export const db = getDatabase(app);
// const analytics = getAnalytics(app);
const projectAuth = getAuth();;


export { projectAuth };
