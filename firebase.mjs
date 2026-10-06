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
    apiKey: 'SUA_API_KEY',
    authDomain: 'SEU_PROJETO.firebaseapp.com',
    projectId: 'ID_DO_SEU_PROJETO',
    storageBucket: 'SEU_PROJETO.appspot.com',
    messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
    appId: 'SEU_APP_ID'
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

// Os documentos ficam em usuarios/{UID}; as regras de seguranca estao em firestore.rules.
export async function carregarPerfilFirestore(uid) {
    const snapshot = await getDoc(doc(db, 'usuarios', uid));
    return snapshot.exists() ? snapshot.data() : null;
}

export function salvarPerfilFirestore(uid, perfil) {
    const previousWrite = profileWritesByUser.get(uid) || Promise.resolve();
    const currentWrite = previousWrite
        .catch(() => {})
        .then(() => setDoc(doc(db, 'usuarios', uid), perfil, { merge: true }));
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
