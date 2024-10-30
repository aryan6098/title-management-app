import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkhCucbi08Klquk5dpPFPjX8o0_wJhJXo",
    authDomain: "login-auth-eb704.firebaseapp.com",
    projectId: "login-auth-eb704",
    storageBucket: "login-auth-eb704.appspot.com",
    messagingSenderId: "243554809900",
    appId: "1:243554809900:web:17574ed17f83509f49b989"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in your project
export const auth = getAuth(app);
export const db = getFirestore(app);
