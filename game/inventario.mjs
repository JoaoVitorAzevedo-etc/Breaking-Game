import { loadProfile, addItemToInventory, saveProfile } from '../services/usuarioService.mjs';

async function applyItem(uid, itemId) {
  const user = await loadProfile(uid);
  if (!user) throw new Error('Usuário não encontrado');
  // Aplicação mínima: atualiza tema ou fonte se o item for reconhecido
  const tema = itemId.startsWith('tema_') ? itemId : null;
  const fonte = itemId.startsWith('fonte_') ? itemId : null;
  if (tema) await saveProfile(uid, { tema });
  if (fonte) await saveProfile(uid, { fonte });
  return { tema, fonte };
}

export { applyItem };
