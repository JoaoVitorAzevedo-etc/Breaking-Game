import { app } from './config.mjs';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';

const db = getFirestore(app);

async function createDocument(collectionName, data, id) {
	if (id) {
		const ref = doc(db, collectionName, id);
		await setDoc(ref, data, { merge: true });
		return ref;
	}
	return await addDoc(collection(db, collectionName), data);
}

async function readDocument(collectionName, id) {
	const ref = doc(db, collectionName, id);
	const snap = await getDoc(ref);
	return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function updateDocument(collectionName, id, updates) {
	const ref = doc(db, collectionName, id);
	await updateDoc(ref, updates);
	return ref;
}

async function deleteDocument(collectionName, id) {
	const ref = doc(db, collectionName, id);
	await deleteDoc(ref);
}

async function queryCollection(collectionName, field, op, value) {
	const q = query(collection(db, collectionName), where(field, op, value));
	const snap = await getDocs(q);
	return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function getCollection(collectionName) {
	const snap = await getDocs(collection(db, collectionName));
	return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
async function executeBatch(operations) {
  const batch = writeBatch(db);

  for (const operation of operations) {

    const ref = doc(
      db,
      operation.collection,
      operation.id
    );

    switch (operation.type) {

      case 'set':
        batch.set(ref, operation.data, {
          merge: true
        });
        break;

      case 'update':
        batch.update(ref, operation.data);
        break;

      case 'delete':
        batch.delete(ref);
        break;

      default:
        throw new Error(
          `Operação inválida: ${operation.type}`
        );
    }
  }

  await batch.commit();

  return true;
}
async function salvarFimDeFase({
  uid,
  xp,
  moedas,
  nivel,
  pontuacao,
  fase
}) {

  const batch = writeBatch(db);

  batch.update(
    doc(db, "usuarios", uid),
    {
      xp,
      nivel
    }
  );

  batch.update(
    doc(db, "inventarios", uid),
    {
      moedas
    }
  );

  batch.set(
    doc(db, "ranking", uid),
    {
      pontuacaoTotal: pontuacao
    },
    { merge: true }
  );

  batch.set(
    doc(
      db,
      "historico",
      crypto.randomUUID()
    ),
    {
      uid,
      fase,
      pontuacao,
      criadoEm: serverTimestamp()
    }
  );

  await batch.commit();
}

export {
  db,
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
  queryCollection,
  getCollection,
  executeBatch
};