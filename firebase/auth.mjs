import { app } from './config.mjs';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously as _signInAnonymously,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as _signInWithEmailAndPassword,
    signOut as _signOut,
    onAuthStateChanged
} from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

async function signInAnonymously() {
    const result = await _signInAnonymously(auth);
    return result.user;
}

async function signUpWithEmail(email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
}

async function signInWithEmail(email, password) {
    const result = await _signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

async function signOutUser() {
    return await _signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}

function onAuthChanged(cb) {
    return onAuthStateChanged(auth, cb);
}

export {
    auth,
    signInWithGoogle,
    signInAnonymously,
    signUpWithEmail,
    signInWithEmail,
    signOutUser,
    getCurrentUser,
    onAuthChanged
};