import {
	createDocument,
	readDocument,
	getCollection
} from '../firebase/firestore.mjs';

const COLLECTION = 'ranking';

/**
 * Atualiza ou cria a posição do jogador no ranking
 */
async function updateRanking(uid) {

	const user =
		await readDocument(
			'usuarios',
			uid
		);

	if (!user) {
		return null;
	}

	const rankingData = {

		uid,

		nome:
			user.nome ||
			'Jogador',

		pontuacaoTotal:
			user.pontuacaoTotal || 0,

		nivel:
			user.nivel || 1,

		badges:
			Array.isArray(
				user.badges
			)
				? user.badges.length
				: 0,

		historico:
			Array.isArray(
				user.historico
			)
				? user.historico.length
				: 0,

		atualizadoEm:
			Date.now()
	};

	await createDocument(
		COLLECTION,
		rankingData,
		uid
	);

	return rankingData;
}

/**
 * Retorna todo o ranking ordenado
 */
async function getRanking() {

	const ranking =
		await getCollection(
			COLLECTION
		);

	return ranking.sort(
		(a, b) =>
			(b.pontuacaoTotal || 0) -
			(a.pontuacaoTotal || 0)
	);
}

/**
 * Top jogadores
 */
async function getTopPlayers(
	limit = 10
) {

	const ranking =
		await getRanking();

	return ranking.slice(
		0,
		limit
	);
}

/**
 * Retorna posição do jogador
 */
async function getPlayerRank(
	uid
) {

	const ranking =
		await getRanking();

	const position =
		ranking.findIndex(
			player =>
				player.uid === uid
		);

	if (
		position === -1
	) {
		return null;
	}

	return {
		position:
			position + 1,
		player:
			ranking[position]
	};
}

/**
 * Retorna dados de um jogador
 */
async function getPlayerRankingData(
	uid
) {

	return await readDocument(
		COLLECTION,
		uid
	);
}

/**
 * Estatísticas gerais
 */
async function getRankingStats() {

	const ranking =
		await getRanking();

	const totalPlayers =
		ranking.length;

	const totalPoints =
		ranking.reduce(
			(total, player) =>
				total +
				(player.pontuacaoTotal || 0),
			0
		);

	const averagePoints =
		totalPlayers > 0
			? Math.round(
					totalPoints /
					totalPlayers
			  )
			: 0;

	const highestScore =
		ranking[0]
			?.pontuacaoTotal || 0;

	return {

		totalPlayers,

		totalPoints,

		averagePoints,

		highestScore
	};
}

/**
 * Retorna jogadores próximos do usuário
 */
async function getNearbyPlayers(
	uid,
	range = 2
) {

	const ranking =
		await getRanking();

	const index =
		ranking.findIndex(
			player =>
				player.uid === uid
		);

	if (
		index === -1
	) {
		return [];
	}

	const start =
		Math.max(
			0,
			index - range
		);

	const end =
		Math.min(
			ranking.length,
			index + range + 1
		);

	return ranking
		.slice(start, end)
		.map(
			(player, i) => ({
				posicao:
					start + i + 1,
				...player
			})
		);
}

export {

	updateRanking,

	getRanking,

	getTopPlayers,

	getPlayerRank,

	getPlayerRankingData,

	getRankingStats,

	getNearbyPlayers
};