import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnwigvN0PX4WUQ5NlNL8AIouF1d_0sGwM",
  authDomain: "gerenciamento-casamento.firebaseapp.com",
  projectId: "gerenciamento-casamento",
  storageBucket: "gerenciamento-casamento.firebasestorage.app",
  messagingSenderId: "196479050428",
  appId: "1:196479050428:web:c1e60ddec0a51c1c5666b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };