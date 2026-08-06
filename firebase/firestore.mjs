// ===========================================
// firebase/firestore.mjs
// Inicialização do Firebase e Firestore
// ===========================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ===========================================
// CONFIGURAÇÃO DO FIREBASE
// Substitua pelos dados do seu projeto.
// ===========================================

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJETO.firebasestorage.app",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};


// ===========================================
// INICIALIZAÇÃO
// Evita inicializar duas vezes.
// ===========================================

const app = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);


// ===========================================
// SERVIÇOS
// ===========================================

const db = getFirestore(app);
const auth = getAuth(app);


// ===========================================
// CACHE OFFLINE
// ===========================================

enableIndexedDbPersistence(db)
    .catch(() => {
        // Ignora erro caso outra aba já utilize o cache.
    });


// ===========================================
// EXPORTAÇÕES
// ===========================================

export { app, db, auth };