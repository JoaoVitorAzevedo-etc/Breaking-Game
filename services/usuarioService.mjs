import {
createDocument,
readDocument,
updateDocument
} from '../firebase/firestore.mjs';

const COLLECTION = 'usuarios';

function defaultProfile(uid, email = '') {
return {
uid,


	email,

	nome: email
		? email.split('@')[0]
		: 'Anon',

	pontuacaoTotal: 0,

	nivel: 1,

	xp: 0,

	ultimaFase: 1,

	moedas: 0,

	tema: 'light-1',

	fonte: 'inter',

	inventario: [],

	badges: [],

	criadoEm: Date.now()
};


}
const credencial = await createUserWithEmailAndPassword(auth, email, senha);

await createUserDocument(
    credencial.user.uid,
    credencial.user.email
);

async function createProfile(uid, email) {


const profile =
	defaultProfile(uid, email);

await createDocument(
	COLLECTION,
	profile,
	uid
);

return profile;


}

async function loadProfile(uid) {


return await readDocument(
	COLLECTION,
	uid
);


}

async function saveProfile(uid, updates) {


await updateDocument(
	COLLECTION,
	uid,
	updates
);


}

async function updatePoints(uid, delta) {


const user =
	await loadProfile(uid);

const pontuacaoTotal =
	(user?.pontuacaoTotal || 0) + delta;

await saveProfile(
	uid,
	{
		pontuacaoTotal
	}
);

return pontuacaoTotal;


}

async function updateXP(uid, deltaXP) {


const user =
	await loadProfile(uid);

const xp =
	(user?.xp || 0) + deltaXP;

await saveProfile(
	uid,
	{
		xp
	}
);

return xp;


}

async function updateCoins(uid, deltaCoins) {


const user =
	await loadProfile(uid);

const moedas =
	(user?.moedas || 0) + deltaCoins;

await saveProfile(
	uid,
	{
		moedas
	}
);

return moedas;


}

async function setLevel(uid, nivel) {


await saveProfile(
	uid,
	{
		nivel
	}
);


}

async function setLastPhase(uid, fase) {


await saveProfile(
	uid,
	{
		ultimaFase: fase
	}
);


}

async function setTheme(uid, tema) {


await saveProfile(
	uid,
	{
		tema
	}
);


}

async function setFont(uid, fonte) {


await saveProfile(
	uid,
	{
		fonte
	}
);


}

async function addItemToInventory(uid, item) {


const user =
	await loadProfile(uid);

const inventario =
	Array.isArray(user?.inventario)
		? [...user.inventario]
		: [];

if (!inventario.includes(item)) {
	inventario.push(item);
}

await saveProfile(
	uid,
	{
		inventario
	}
);

return inventario;
}

async function addBadge(uid, badgeId) {
const user =
	await loadProfile(uid);

const badges =
	Array.isArray(user?.badges)
		? [...user.badges]
		: [];

if (!badges.includes(badgeId)) {
	badges.push(badgeId);
}

await saveProfile(
	uid,
	{
		badges
	}
);

return badges;
}
export {
defaultProfile,
createProfile,
loadProfile,
saveProfile,
updatePoints,
updateXP,
updateCoins,
setLevel,
setLastPhase,
setTheme,
setFont,
addItemToInventory,
addBadge
};