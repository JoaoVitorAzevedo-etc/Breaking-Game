import { getQuestionsByPhase } from './perguntas.mjs';

import {
	calculateScore
} from '../services/pontuacao.mjs';

import {
	updateProgress
} from '../services/progresso.mjs';

import {
	recordMatch
} from '../services/historico.mjs';

import {
	loadProfile,
	updatePoints
} from '../services/usuarioService.mjs';

import {
	checkUnlockRules,
	awardBadgeToUser
} from '../services/badgeService.mjs';

import {
	grantItem
} from '../services/inventario.mjs';

import {
	passedPhase,
	getPhaseReward,
	getNextPhase
} from './fases.mjs';

/**
 * Corrige as respostas do jogador
 */
function evaluateAnswers(
	phaseId,
	userAnswers
) {

	const questions =
		getQuestionsByPhase(phaseId);

	let correctCount = 0;

	questions.forEach(
		(question, index) => {

			if (
				userAnswers[index] ===
				question.answer
			) {
				correctCount++;
			}

		}
	);

	return {
		correctCount,
		totalQuestions:
			questions.length
	};
}

/**
 * Executa toda a lógica de finalização da fase
 */
async function finishPhase({
	uid,
	phaseId,
	userAnswers,
	timeTakenSeconds = 0,
	hintsUsed = 0
}) {

	// Corrigir respostas
	const {
		correctCount,
		totalQuestions
	} = evaluateAnswers(
		phaseId,
		userAnswers
	);

	// Calcular pontuação
	const score =
		calculateScore(
			correctCount,
			totalQuestions,
			timeTakenSeconds,
			hintsUsed
		);

	// Verificar aprovação
	const approved =
		passedPhase(
			phaseId,
			score
		);

	// Porcentagem de acerto
	const percentualAcerto =
		Math.round(
			(correctCount /
				totalQuestions) * 100
		);

	// Salvar histórico
	await recordMatch(
		uid,
		{
			fase: phaseId,
			acertos: correctCount,
			totalPerguntas:
				totalQuestions,
			dicasUsadas:
				hintsUsed,
			tempo:
				timeTakenSeconds,
			percentualAcerto,
			pontos: score,
			aprovado:
				approved
		}
	);

	// Atualizar pontuação total
	await updatePoints(
		uid,
		score
	);

	// Atualizar progresso
	if (approved) {

		const nextPhase =
			getNextPhase(
				phaseId
			);

		await updateProgress(
			uid,
			{
				ultimaFase:
					nextPhase
						? nextPhase.id
						: phaseId,
				faseAtual:
					nextPhase
						? nextPhase.id
						: phaseId
			}
		);

		// Recompensas
		const reward =
			getPhaseReward(
				phaseId
			);

		if (
			reward?.item
		) {
			await grantItem(
				uid,
				reward.item
			);
		}

		// Futuro sistema de moedas
		// reward.moedas
	}

	// Recarregar usuário
	const updatedUser =
		await loadProfile(uid);

	// Verificar badges
	const badges =
		await checkUnlockRules(
			updatedUser,
			uid
		);

	const novosBadges = [];

	for (const badgeId of badges) {

		const unlocked =
			await awardBadgeToUser(
				uid,
				badgeId
			);

		if (unlocked) {
			novosBadges.push(
				badgeId
			);
		}

	}

	return {
		success: true,

		phaseId,

		score,

		approved,

		correctCount,

		totalQuestions,

		percentualAcerto,

		newBadges:
			novosBadges
	};
}

/**
 * Dados da fase
 */
function startPhase(
	phaseId
) {

	const questions =
		getQuestionsByPhase(
			phaseId
		);

	return {
		phaseId,
		questions,
		totalQuestions:
			questions.length
	};
}

export {
	startPhase,
	finishPhase,
	evaluateAnswers
};