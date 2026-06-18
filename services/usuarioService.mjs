import { createDocument, readDocument, updateDocument } from '../firebase/firestore.mjs';

const COLLECTION = 'usuarios';

function defaultProfile(uid, email = '') {
	return {
		uid,
		email,
		nome: email ? email.split('@')[0] : 'Anon',
		pontuacaoTotal: 0,
		nivel: 1,
		tema: 'light-1',
		fonte: 'inter',
		inventario: [],
		badges: [],
		historico: []
	};
}

async function createProfile(uid, email) {
	const profile = defaultProfile(uid, email);
	await createDocument(COLLECTION, profile, uid);
	return profile;
}

async function loadProfile(uid) {
	return await readDocument(COLLECTION, uid);
}

async function saveProfile(uid, updates) {
	await updateDocument(COLLECTION, uid, updates);
}

async function updatePoints(uid, delta) {
	const user = await loadProfile(uid);
	const pontuacaoTotal = (user?.pontuacaoTotal || 0) + delta;
	await saveProfile(uid, { pontuacaoTotal });
	return pontuacaoTotal;
}

async function setLevel(uid, nivel) {
	await saveProfile(uid, { nivel });
}

async function setTheme(uid, tema) {
	await saveProfile(uid, { tema });
}

async function setFont(uid, fonte) {
	await saveProfile(uid, { fonte });
}

async function addItemToInventory(uid, item) {
	const user = await loadProfile(uid);
	const inventario = Array.isArray(user?.inventario) ? user.inventario : [];
	if (!inventario.includes(item)) inventario.push(item);
	await saveProfile(uid, { inventario });
	return inventario;
}

export {
	defaultProfile,
	createProfile,
	loadProfile,
	saveProfile,
	updatePoints,
	setLevel,
	setTheme,
	setFont,
	addItemToInventory
};
