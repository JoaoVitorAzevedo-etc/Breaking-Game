import { readDocument, updateDocument } from '../firebase/firestore.mjs';
import { loadProfile, addItemToInventory } from './usuarioService.mjs';

const CATALOG = [
  { id: 'tema_dark_1', nome: 'Tema Dark 1', preco: 100 },
  { id: 'fonte_pro', nome: 'Fonte Pro', preco: 50 }
];

function getCatalog() {
  return CATALOG;
}

async function canAfford(uid, preco) {
  const user = await loadProfile(uid);
  return (user?.pontuacaoTotal || 0) >= preco;
}

async function purchaseItem(uid, itemId) {
  const item = CATALOG.find(i => i.id === itemId);
  if (!item) throw new Error('Item não encontrado');
  const user = await loadProfile(uid);
  if (!user) throw new Error('Usuário não encontrado');
  if ((user.pontuacaoTotal || 0) < item.preco) throw new Error('Saldo insuficiente');
  const novoSaldo = (user.pontuacaoTotal || 0) - item.preco;
  await updateDocument('usuarios', uid, { pontuacaoTotal: novoSaldo });
  await addItemToInventory(uid, itemId);
  return { novoSaldo, itemId };
}

export { getCatalog, canAfford, purchaseItem };
