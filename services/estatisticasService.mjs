import { getCollection } from '../firebase/firestore.mjs';

async function getGeneralStats() {
  const usuarios = await getCollection('usuarios');
  const fasesConcluidas = usuarios.reduce((s, u) => s + ((u.historico || []).length || 0), 0);
  const badgesLiberadas = usuarios.reduce((s, u) => s + ((u.badges || []).length || 0), 0);
  const tempoUsoEstimado = usuarios.length * 3600; // placeholder: 1h por usuário
  return {
    numeroJogadores: usuarios.length,
    fasesConcluidas,
    badgesLiberadas,
    tempoUsoEstimado
  };
}

export { getGeneralStats };
