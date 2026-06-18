import { calculateScore, applyMultipliers } from './pontuacao.mjs';
import { loadProfile, saveProfile, updatePoints, setLevel } from '../services/usuarioService.mjs';
import { recordMatch } from './historico.mjs';
import { checkUnlockRules, awardBadgeToUser } from '../services/badgeService.mjs';
import { getPhaseById, isFinalPhase } from './fases.mjs';

async function calculatePhaseResult({ correctCount, totalQuestions, timeTakenSeconds, hintsUsed, multiplier = 1 }) {
  const base = calculateScore(correctCount, totalQuestions, timeTakenSeconds, hintsUsed);
  const final = applyMultipliers(base, multiplier);
  return { base, final };
}

async function completePhase(uid, phaseId, stats) {
  // stats: { correctCount, totalQuestions, timeTakenSeconds, hintsUsed, multiplier }
  const phaseInfo = getPhaseById(phaseId);
  if (!phaseInfo) throw new Error('Fase inválida');

  const result = await calculatePhaseResult(stats);

  // atualizar pontos do usuário
  const newTotal = await updatePoints(uid, result.final);

  // registrar histórico
  await recordMatch(uid, {
    fase: phaseId,
    acertos: stats.correctCount,
    pontos: result.final,
    dicasUsadas: stats.hintsUsed || 0
  });

  // atualizar nível máximo se necessário (nível = maior fase desbloqueada)
  const user = await loadProfile(uid);
  const currentLevel = user?.nivel || 1;
  const newLevel = Math.max(currentLevel, phaseId + 1);
  if (newLevel !== currentLevel) await setLevel(uid, newLevel);

  // verificar badges a desbloquear
  const possible = checkUnlockRules(user);
  const awarded = [];
  for (const b of possible) {
    const got = await awardBadgeToUser(uid, b);
    if (got) awarded.push(got);
  }

  // resultado agregado
  return {
    phaseId,
    baseScore: result.base,
    finalScore: result.final,
    totalPoints: newTotal,
    awarded
  };
}

async function canAccessPhase(uid, phaseId) {
  const user = await loadProfile(uid);
  if (!user) return false;
  // regra simples: pode acessar se já completou a fase anterior ou se for a primeira
  if (phaseId === 1) return true;
  const historico = user.historico || [];
  const prev = historico.find(h => h.fase === (phaseId - 1));
  if (prev) return true;
  // também permitir se nível do usuário for maior ou igual ao id do módulo
  if ((user.nivel || 1) >= phaseId) return true;
  return false;
}

async function getUserProgress(uid) {
  const user = await loadProfile(uid);
  if (!user) return null;
  const completed = (user.historico || []).map(h => h.fase);
  return {
    uid,
    nivel: user.nivel || 1,
    pontuacaoTotal: user.pontuacaoTotal || 0,
    completed
  };
}

export { calculatePhaseResult, completePhase, canAccessPhase, getUserProgress };