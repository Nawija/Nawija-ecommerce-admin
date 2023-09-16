import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBw0KjNG9W9qreYgooYUThToGljSNW_aZo",
    authDomain: "next-ecommerce-399010.firebaseapp.com",
    projectId: "next-ecommerce-399010",
    storageBucket: "next-ecommerce-399010.appspot.com",
    messagingSenderId: "155306113106",
    appId: "1:155306113106:web:f776a1bbd66088746bc78b",
    measurementId: "G-N8QDTPBMZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)