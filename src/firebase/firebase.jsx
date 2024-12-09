import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6Kkom2jxYK_2lOqIP8mkXwFJPldusMaw",
  authDomain: "ticketapi-22560.firebaseapp.com",
  databaseURL: "https://ticketapi-22560-default-rtdb.firebaseio.com",
  projectId: "ticketapi-22560",
  storageBucket: "ticketapi-22560.firebasestorage.app",
  messagingSenderId: "1012018632340",
  appId: "1:1012018632340:web:198f16bf550878321a8681",
  measurementId: "G-7J7KCS7CDX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
