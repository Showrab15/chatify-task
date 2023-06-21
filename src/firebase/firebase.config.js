import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDlSq0Kaz-z9cwAwiNCGIO1Qz36thvSb_4",
  authDomain: "task-19429.firebaseapp.com",
  projectId: "task-19429",
  storageBucket: "task-19429.appspot.com",
  messagingSenderId: "529707562835",
  appId: "1:529707562835:web:339aabd76c2f3957a593a6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()