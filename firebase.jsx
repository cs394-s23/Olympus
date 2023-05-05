import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import { connectAuthEmulator, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase } from "firebase/database";
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
  apiKey: "AIzaSyA7NAaL6Sl9sZ2gRoQi97w6J8-urpVX0nc",
  authDomain: "olympus-app-9d635.firebaseapp.com",
  databaseURL: "https://olympus-app-9d635-default-rtdb.firebaseio.com",
  projectId: "olympus-app-9d635",
  storageBucket: "olympus-app-9d635.appspot.com",
  messagingSenderId: "526654239507",
  appId: "1:526654239507:web:e49136e3a5746a8e1560e6",
  measurementId: "G-BNY8WBLRG2"
};

// Initialize Firebase for app
export const app = firebase.initializeApp(firebaseAppConfig);
export const dbApp = firebase.initializeApp(firebaseDatabaseConfig, "database");
export const db = getDatabase(app);
const analytics = getAnalytics(app);
const projectAuth = firebase.auth();


// if (process.env.NODE_ENV!== 'production') {
//   connectAuthEmulator(projectAuth, "http://127.0.0.1:9099");
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);

//   signInWithCredential(projectAuth, GoogleAuthProvider.credential(
//     '{"sub": "XBfU5lqHTUjeFo9jYVoKz1hkGpAe", "email": "cindy@gmail.com", "displayName":"Cindy Hu", "email_verified": true}'
//   ));
// }


export { projectAuth };
