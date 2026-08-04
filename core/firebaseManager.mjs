import { signInWithGoogle, signInAnonymously, signUpWithEmail, signInWithEmail, signOutUser, onAuthChanged, getCurrentUser } from '../firebase/auth.mjs';
import { createDocument, readDocument, updateDocument, deleteDocument, queryCollection, getCollection, executeBatch, salvarFimDeFase } from '../firebase/firestore.mjs';

export class FirebaseManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
    this.offline = false;
  }

  init() {
    this.state.cache.firebase = true;
    return this;
  }

  async authWithGoogle() {
    return await signInWithGoogle();
  }

  async authAnonymously() {
    return await signInAnonymously();
  }

  async authWithEmail(email, password) {
    return await signInWithEmail(email, password);
  }

  async createUser(email, password) {
    return await signUpWithEmail(email, password);
  }

  async logout() {
    await signOutUser();
    return true;
  }

  onAuthChanged(cb) {
    return onAuthChanged(cb);
  }

  currentUser() {
    return getCurrentUser();
  }

  async saveDocument(collectionName, data, id) {
    return await createDocument(collectionName, data, id);
  }

  async readDocument(collectionName, id) {
    return await readDocument(collectionName, id);
  }

  async updateDocument(collectionName, id, updates) {
    return await updateDocument(collectionName, id, updates);
  }

  async deleteDocument(collectionName, id) {
    return await deleteDocument(collectionName, id);
  }

  async queryCollection(collectionName, field, op, value) {
    return await queryCollection(collectionName, field, op, value);
  }

  async getCollection(collectionName) {
    return await getCollection(collectionName);
  }

  async batch(operations) {
    return await executeBatch(operations);
  }

  async syncGameResult(payload) {
    return await salvarFimDeFase(payload);
  }
}
