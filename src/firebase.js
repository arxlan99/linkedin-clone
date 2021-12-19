import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcJIgLcBcuQXxvgEusEvS-ev3zU_lFLpQ",
  authDomain: "linkedin-clone-5e6db.firebaseapp.com",
  projectId: "linkedin-clone-5e6db",
  storageBucket: "linkedin-clone-5e6db.appspot.com",
  messagingSenderId: "545765545593",
  appId: "1:545765545593:web:cb4e389fbc0b490ee466a8",
  measurementId: "G-02XCDJ1VN0",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { auth, storage, provider, signInWithPopup };
export default db;
