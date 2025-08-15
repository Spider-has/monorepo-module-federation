import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdCUFlzuE32mKh4PeCbzqfaroSAoR0BCU",
  authDomain: "real-time-chat-5e10f.firebaseapp.com",
  projectId: "real-time-chat-5e10f",
  storageBucket: "real-time-chat-5e10f.firebasestorage.app",
  messagingSenderId: "778137741153",
  appId: "1:778137741153:web:06501c0ac321c0b3064720",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
