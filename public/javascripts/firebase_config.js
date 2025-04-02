
//const {initializeApp} = require("firebase/app");

//const {getFirestore, collection, addDoc, doc, getDocs, query, where, limit, updateDoc} = require("firebase/firestore");

//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
//import { getFirestore, collection, addDoc, doc, getDocs, query, where, limit, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, limit, updateDoc, getDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBmltChBbiMDZOB26QOeuSMt8Hi8kuu1Lg",
    authDomain: "restaurante-eb4cc.firebaseapp.com",
    projectId: "restaurante-eb4cc",
    storageBucket: "restaurante-eb4cc.appspot.com",
    messagingSenderId: "328765970187",
    appId: "1:328765970187:web:5d75b96ef982b96b0d740e",
    measurementId: "G-PK6S3XR105"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando Firestore
const db = getFirestore(app);

//module.exports = { db, collection, addDoc, doc, getDocs, query, where, limit, updateDoc };
export { db, collection, addDoc, doc, getDocs, query, where, limit, updateDoc, getDoc };