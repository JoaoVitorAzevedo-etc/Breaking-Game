export function calculateScore(correctCount, totalQuestions, timeTakenSeconds, hintsUsed) {
  const base = Math.max(0, Math.round((correctCount / totalQuestions) * 100));
  const timeBonus = Math.max(0, Math.round((Math.max(0, 300 - timeTakenSeconds) / 300) * 20));
  const hintPenalty = hintsUsed * 5;
  const score = Math.max(0, base + timeBonus - hintPenalty);
  return score;
}

export function applyMultipliers(score, multiplier = 1) {
  return Math.round(score * multiplier);
}
