// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Apenas configuração e inicialização do Firebase
const firebaseConfig = {
  apiKey: ,
  authDomain: "breakinggame-e9f98.firebaseapp.com",
  projectId: "breakinggame-e9f98",
  storageBucket: "breakinggame-e9f98.appspot.com",
  messagingSenderId: "331603651456",
  appId: "1:331603651456:web:6335cecb75ec4850326f65"
};

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };