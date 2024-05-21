// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6Kkom2jxYK_2lOqIP8mkXwFJPldusMaw",
    authDomain: "ticketapi-22560.firebaseapp.com",
    projectId: "ticketapi-22560",
    storageBucket: "ticketapi-22560.appspot.com",
    messagingSenderId: "1012018632340",
    appId: "1:1012018632340:web:198f16bf550878321a8681",
    measurementId: "G-7J7KCS7CDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);