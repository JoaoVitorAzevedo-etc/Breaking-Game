import {
loadProfile,
addItemToInventory,
saveProfile
} from '../services/usuarioService.mjs';

async function getInventory(uid) {


const user =
	await loadProfile(uid);

return Array.isArray(user?.inventario)
	? user.inventario
	: [];


}

async function hasItem(uid, itemId) {


const inventory =
	await getInventory(uid);

return inventory.includes(itemId);


}

async function grantItem(uid, itemId) {


const inventory =
	await addItemToInventory(
		uid,
		itemId
	);

return inventory;


}

async function removeItem(uid, itemId) {


const user =
	await loadProfile(uid);

if (!user) {
	throw new Error(
		'Usuário não encontrado'
	);
}

const inventario =
	(user.inventario || [])
		.filter(
			item =>
				item !== itemId
		);

await saveProfile(
	uid,
	{
		inventario
	}
);

return inventario;


}

async function applyItem(
uid,
itemId
) {


const user =
	await loadProfile(uid);

if (!user) {
	throw new Error(
		'Usuário não encontrado'
	);
}

const tema =
	itemId.startsWith('tema_')
		? itemId
		: null;

const fonte =
	itemId.startsWith('fonte_')
		? itemId
		: null;

if (tema) {
	await saveProfile(
		uid,
		{
			tema
		}
	);
}

if (fonte) {
	await saveProfile(
		uid,
		{
			fonte
		}
	);
}

return {
	tema,
	fonte
};


}

export {
getInventory,
hasItem,
grantItem,
removeItem,
applyItem
};
