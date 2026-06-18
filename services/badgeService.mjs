import { readDocument, updateDocument } from '../firebase/firestore.mjs';

const CATALOG = [
    { id: 'primeiros_passos', nome: 'Primeiros Passos', icone: '👶', descricao: 'Conclua a sua primeira fase', pontos: 10 },
    { id: 'independente', nome: 'Independente', icone: '💪', descricao: 'Complete uma fase sem usar dicas', pontos: 50 },
    { id: 'mente_brilhante', nome: 'Mente Brilhante', icone: '⭐', descricao: 'Acumule 500 pontos', pontos: 100 }
];

function getCatalog() {
    return CATALOG;
}

function getBadgeById(id) {
    return CATALOG.find(b => b.id === id) || null;
}

async function awardBadgeToUser(uid, badgeId) {
    const user = await readDocument('usuarios', uid);
    if (!user) return null;
    const badges = Array.isArray(user.badges) ? user.badges : [];
    if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        await updateDocument('usuarios', uid, { badges });
        return badgeId;
    }
    return null;
}

function checkUnlockRules(user, ruleId) {
    // regras simples de exemplo, podem ser expandidas
    if (!user) return [];
    const earned = [];
    if ((user.pontuacaoTotal || 0) >= 500) earned.push('mente_brilhante');
    if ((user.historico || []).length >= 1) earned.push('primeiros_passos');
    return earned;
}

export { getCatalog, getBadgeById, awardBadgeToUser, checkUnlockRules };