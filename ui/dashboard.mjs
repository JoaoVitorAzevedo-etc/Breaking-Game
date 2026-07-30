import { loadProfile } from '../services/usuarioService.mjs';
import { getPlayerRank, getTopPlayers } from '../services/rankingService.mjs';
import { getHistory } from '../services/historico.mjs';
import { getUserProgress } from '../game/progresso.mjs';

/**
 * Retorna informações básicas do jogador
 */
async function getPlayerSummary(uid) {

	const user = await loadProfile(uid);

	if (!user) {
		throw new Error('Usuário não encontrado');
	}

	return {
		uid: user.uid,
		nome: user.nome || 'Jogador',
		email: user.email || '',
		nivel: user.nivel || 1,
		pontuacaoTotal: user.pontuacaoTotal || 0
	};
}

/**
 * Calcula estatísticas gerais
 */
async function getPlayerStats(uid) {

	const user = await loadProfile(uid);
	const history = await getHistory(uid);

	const totalPartidas = history.length;

	const totalAcertos =
		history.reduce(
			(total, partida) =>
				total + (partida.acertos || 0),
			0
		);

	const totalPerguntas =
		history.reduce(
			(total, partida) =>
				total + (partida.totalPerguntas || 0),
			0
		);

	const mediaAcertos =
		totalPerguntas > 0
			? Math.round(
					(totalAcertos / totalPerguntas) * 100
			  )
			: 0;

	return {
		totalPartidas,
		totalAcertos,
		totalPerguntas,
		mediaAcertos,

		fasesConcluidas:
			history.filter(
				h => h.aprovado
			).length,

		totalBadges:
			(user.badges || []).length,

		totalItens:
			(user.inventario || []).length
	};
}

/**
 * Retorna progresso do jogador
 */
async function getDashboardProgress(uid) {

	const progress =
		await getUserProgress(uid);

	return {
		faseAtual:
			progress?.currentLevel || 1,

		ultimaFase:
			progress?.lastCompletedPhase || 0,

		percentual:
			progress?.completionPercentage || 0
	};
}

/**
 * Últimas partidas
 */
async function getRecentMatches(
	uid,
	limit = 5
) {

	const history =
		await getHistory(uid);

	return history
		.sort(
			(a, b) =>
				new Date(b.date) -
				new Date(a.date)
		)
		.slice(0, limit);
}

/**
 * Dados do ranking
 */
async function getDashboardRanking(uid) {

	const playerRank =
		await getPlayerRank(uid);

	const top10 =
		await getTopPlayers(10);

	return {
		posicao:
			playerRank?.position || null,

		player:
			playerRank?.player || null,

		top10
	};
}

/**
 * Carrega dashboard completo
 */
async function loadDashboard(uid) {

	const user =
		await loadProfile(uid);

	if (!user) {
		throw new Error(
			'Usuário não encontrado'
		);
	}

	const [
		summary,
		stats,
		progress,
		ranking,
		recentMatches
	] = await Promise.all([
		getPlayerSummary(uid),
		getPlayerStats(uid),
		getDashboardProgress(uid),
		getDashboardRanking(uid),
		getRecentMatches(uid)
	]);

	return {

		usuario: summary,

		progresso: progress,

		ranking,

		badges:
			user.badges || [],

		inventario:
			user.inventario || [],

		historico:
			recentMatches,

		estatisticas:
			stats
	};
}

/**
 * Exibe dashboard formatado
 */
async function generateDashboardView(uid) {

	const dashboard =
		await loadDashboard(uid);

	return `
═══════════════════════════════

👤 ${dashboard.usuario.nome}

⭐ Nível: ${dashboard.usuario.nivel}
🏆 Pontos: ${dashboard.usuario.pontuacaoTotal}

📈 Progresso
Fase Atual: ${dashboard.progresso.faseAtual}
Última Fase: ${dashboard.progresso.ultimaFase}
Conclusão: ${dashboard.progresso.percentual}%

🏅 Badges: ${dashboard.badges.length}

🎒 Inventário:
${dashboard.inventario.length} itens

🥇 Ranking:
Posição #${dashboard.ranking.posicao || '-'}

📜 Últimas Partidas:
${dashboard.historico
	.map(
		h =>
			`Fase ${h.fase} - ${h.pontos} pts`
	)
	.join('\n')}

📊 Estatísticas
Partidas: ${dashboard.estatisticas.totalPartidas}
Acertos: ${dashboard.estatisticas.mediaAcertos}%
Fases Concluídas: ${dashboard.estatisticas.fasesConcluidas}

═══════════════════════════════
`;
}

export {

	loadDashboard,

	getPlayerSummary,

	getPlayerStats,

	getDashboardProgress,

	getDashboardRanking,

	getRecentMatches,

	generateDashboardView
};