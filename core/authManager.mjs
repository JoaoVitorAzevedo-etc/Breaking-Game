import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app as firebaseApp } from '../firebase/config.mjs';

export class AuthManager {
  constructor(appContext) {
    this.appContext = appContext;
    this.auth = getAuth(firebaseApp);
    this.googleProvider = new GoogleAuthProvider();
  }

  async loginGoogle() {
    const result = await signInWithPopup(this.auth, this.googleProvider);
    return result.user;
  }

  async loginEmail(email, password) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  async loginAnonimo() {
    const result = await signInAnonymously(this.auth);
    return result.user;
  }

  async logout() {
    await signOut(this.auth);
  }

  trocarConta() {
    return this.logout();
  }

  verificarSessao() {
    return this.auth.currentUser;
  }

  onAuthChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  async criarConta(email, password) {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  async redefinirSenha(email) {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    return sendPasswordResetEmail(this.auth, email);
  }

  async verificarEmail() {
    return this.auth.currentUser?.emailVerified ?? false;
  }
}
