// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCoBWw5L_ddI1gyqicI8ItIeQvztMnYCQ",
  authDomain: "fir-auth-67a3c.firebaseapp.com",
  projectId: "fir-auth-67a3c",
  storageBucket: "fir-auth-67a3c.appspot.com",
  messagingSenderId: "505537454939",
  appId: "1:505537454939:web:818ab3f61d3e2a946d307e",
  measurementId: "G-D084S8LZK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}