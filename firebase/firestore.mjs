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
	addDoc
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

export {
	db,
	createDocument,
	readDocument,
	updateDocument,
	deleteDocument,
	queryCollection,
	getCollection
};
