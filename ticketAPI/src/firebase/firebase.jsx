// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: `Bearer ${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: `Bearer ${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
    projectId: `Bearer ${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
    storageBucket: `Bearer ${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `Bearer ${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `Bearer ${import.meta.env.VITE_FIREBASE_APP_ID}`,
    measurementId: `Bearer ${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);