import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  where, 
  updateDoc, 
  deleteDoc, 
  query, 
  limit 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmltChBbiMDZOB26QOeuSMt8Hi8kuu1Lg",
  authDomain: "restaurante-eb4cc.firebaseapp.com",
  projectId: "restaurante-eb4cc",
  storageBucket: "restaurante-eb4cc.appspot.com",
  messagingSenderId: "328765970187",
  appId: "1:328765970187:web:5d75b96ef982b96b0d740e",
  measurementId: "G-PK6S3XR105"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { 
  db, 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  where, 
  updateDoc, 
  deleteDoc, 
  query, 
  limit 
};