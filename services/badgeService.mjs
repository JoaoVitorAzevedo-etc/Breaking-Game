async function checkUnlockRules(user, uid) {

if (!user) {
	return [];
}

const earned = [];

const historico =
	await queryCollection(
		'historico',
		'uid',
		'==',
		uid
	);

const totalPartidas =
	historico.length;

const totalPontos =
	user.pontuacaoTotal || 0;

const ultimaFase =
	user.ultimaFase || 1;

// Primeiros Passos
if (totalPartidas >= 1) {
	earned.push('primeiros_passos');
}

// Independente
if (
	historico.some(
		partida =>
			(partida.dicasUsadas || 0) === 0
	)
) {
	earned.push('independente');
}

// Rápido Aprendiz
if (ultimaFase >= 3) {
	earned.push('rapido_aprendiz');
}

// Perfeição Química
if (
	historico.some(
		partida =>
			partida.acertos ===
			partida.totalPerguntas
	)
) {
	earned.push('perfeicao_quimica');
}

// Mente Brilhante
if (totalPontos >= 500) {
	earned.push('mente_brilhante');
}

// Inteligência Pura
const semDicas =
	historico.filter(
		partida =>
			(partida.dicasUsadas || 0) === 0
	);

if (semDicas.length >= 5) {
	earned.push('inteligencia_pura');
}

// Aprendiz Consistente
const consistentes =
	historico.filter(
		partida =>
			(partida.acertos || 0) >= 4
	);

if (consistentes.length >= 5) {
	earned.push('aprendiz_consistente');
}

// Mestre Química Básica
if (ultimaFase >= 5) {
	earned.push('mestre_quimica_basica');
}

// Sábio Físico-Químico
if (ultimaFase >= 10) {
	earned.push('sabio_fisico_quimico');
}

// Gênio da Química Orgânica
if (ultimaFase >= 15) {
	earned.push('genio_quimica_organica');
}

// Vencedor de Desafios
if (ultimaFase >= 10) {
	earned.push('vencedor_desafios');
}

// Químico Impecável
if (
	historico.some(
		partida =>
			partida.fase >= 6 &&
			partida.acertos ===
			partida.totalPerguntas
	)
) {
	earned.push('quimico_impecavel');
}

// Lenda Viva
if (totalPontos >= 1000) {
	earned.push('lenda_viva');
}

// Jornada Épica
if (totalPartidas >= 10) {
	earned.push('jornada_epica');
}

// Mestre Supremo
if (
	historico.some(
		partida =>
			partida.fase === 20 &&
			partida.acertos ===
			partida.totalPerguntas
	)
) {
	earned.push('mestre_supremo');
}

// Campeão do Breaking Game
if (
	historico.some(
		partida =>
			partida.fase === 14 &&
			(partida.percentualAcerto || 0) >= 60
	)
) {
	earned.push(
		'campeao_breaking_game'
	);
}

return earned;

}