import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
    doc,
    getDoc,
    getFirestore,
    setDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// COLE AQUI a configuracao do app Web em Firebase Console > Configuracoes do projeto.
// Essa configuracao publica identifica o projeto; nunca coloque senhas de usuarios ou chaves privadas aqui.
const firebaseConfig = {
    apiKey: 'AIzaSyCTp-ByKrzLtUv6tQtr7Tla-67t12DMSog',
    authDomain: 'breakinggame-e9f98.firebaseapp.com',
    databaseURL: 'https://breakinggame-e9f98-default-rtdb.firebaseio.com',
    projectId: 'breakinggame-e9f98',
    storageBucket: 'breakinggame-e9f98.firebasestorage.app',
    messagingSenderId: '331603651456',
    appId: '1:331603651456:web:6335cecb75ec4850326f65'
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const firebaseConfigurado = () => !Object.values(firebaseConfig).some(valor =>
    typeof valor !== 'string' || valor.startsWith('SUA_') || valor.startsWith('SEU_') || valor === 'ID_DO_SEU_PROJETO'
);

const profileWritesByUser = new Map();

export const entrarComEmailESenha = (email, senha) => signInWithEmailAndPassword(auth, email, senha);
export const cadastrarComEmailESenha = (email, senha) => createUserWithEmailAndPassword(auth, email, senha);
export const encerrarSessaoFirebase = () => signOut(auth);

// Os documentos ficam em usuario/{UID}; as regras de seguranca estao em firestore.rules.
export async function carregarPerfilFirestore(uid) {
    const snapshot = await getDoc(doc(db, 'usuario', uid));
    return snapshot.exists() ? snapshot.data() : null;
}

export function salvarPerfilFirestore(uid, perfil) {
    const previousWrite = profileWritesByUser.get(uid) || Promise.resolve();
    const currentWrite = previousWrite
        .catch(() => {})
        .then(() => setDoc(doc(db, 'usuario', uid), perfil, { merge: true }));
    profileWritesByUser.set(uid, currentWrite);
    currentWrite.then(
        () => { if (profileWritesByUser.get(uid) === currentWrite) profileWritesByUser.delete(uid); },
        () => { if (profileWritesByUser.get(uid) === currentWrite) profileWritesByUser.delete(uid); }
    );
    return currentWrite;
}

export function observarSessaoInicial(callback) {
    let primeiraVerificacao = true;
    const cancelar = onAuthStateChanged(auth, usuario => {
        if (!primeiraVerificacao) return;
        primeiraVerificacao = false;
        cancelar();
        callback(usuario);
    });
    return cancelar;
}
