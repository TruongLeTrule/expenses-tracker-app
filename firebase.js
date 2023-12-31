import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8qVZuMph6bnPH2mcilFVwzuRx9rCQXas",
  authDomain: "expense-tracker-app-auth.firebaseapp.com",
  projectId: "expense-tracker-app-auth",
  storageBucket: "expense-tracker-app-auth.appspot.com",
  messagingSenderId: "252331918559",
  appId: "1:252331918559:web:726ea2ed0e4cfabe9fd56a",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore(app);
const storage = getStorage(app);
const EmailAuthProvider = firebase.auth.EmailAuthProvider;

export { auth, db, EmailAuthProvider, storage };
