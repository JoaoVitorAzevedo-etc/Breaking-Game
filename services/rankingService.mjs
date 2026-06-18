import { createDocument, getCollection, queryCollection, updateDocument, readDocument } from '../firebase/firestore.mjs';

const COLLECTION = 'ranking';

async function updateRanking(uid, nome, pontos) {
	const existing = await readDocument(COLLECTION, uid);
	if (existing) {
		const newPoints = Math.max(existing.pontos || 0, pontos);
		await updateDocument(COLLECTION, uid, { nome, pontos: newPoints });
		return { uid, nome, pontos: newPoints };
	}
	await createDocument(COLLECTION, { uid, nome, pontos }, uid);
	return { uid, nome, pontos };
}

async function getTop10() {
	const all = await getCollection(COLLECTION);
	return all.sort((a, b) => (b.pontos || 0) - (a.pontos || 0)).slice(0, 10);
}

async function getPlayerPosition(uid) {
	const all = await getCollection(COLLECTION);
	const sorted = all.sort((a, b) => (b.pontos || 0) - (a.pontos || 0));
	const index = sorted.findIndex(p => p.uid === uid);
	return index >= 0 ? { position: index + 1, total: sorted.length, player: sorted[index] } : null;
}

async function getStats() {
	const all = await getCollection(COLLECTION);
	const totalPlayers = all.length;
	const avg = all.reduce((s, p) => s + (p.pontos || 0), 0) / Math.max(1, totalPlayers);
	return { totalPlayers, averagePoints: avg };
}

export { updateRanking, getTop10, getPlayerPosition, getStats };
