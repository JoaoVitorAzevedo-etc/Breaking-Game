import { updateDocument, readDocument } from '../firebase/firestore.mjs';

async function recordMatch(uid, entry) {
  const user = await readDocument('usuarios', uid);
  const historico = Array.isArray(user?.historico) ? user.historico : [];
  historico.push({ ...entry, date: new Date().toISOString() });
  await updateDocument('usuarios', uid, { historico });
  return historico;
}

async function getHistory(uid) {
  const user = await readDocument('usuarios', uid);
  return user?.historico || [];
}

export { recordMatch, getHistory };
