export function calculateScore(
  correctCount,
  totalQuestions,
  timeTakenSeconds,
  hintsUsed
) {
  const base =
    Math.max(
      0,
      Math.round(
        (correctCount / totalQuestions) * 100
      )
    );

  const timeBonus =
    Math.max(
      0,
      Math.round(
        ((300 - timeTakenSeconds) / 300) * 20
      )
    );

  const hintPenalty =
    hintsUsed * 5;

  return Math.max(
    0,
    base + timeBonus - hintPenalty
  );
}

export function applyMultipliers(
  score,
  multiplier = 1
) {
  return Math.round(
    score * multiplier
  );
}

export function calculateXP(
  score
) {
  return Math.max(
    10,
    Math.round(score * 0.5)
  );
}

export function calculateCoins(
  score
) {
  return Math.max(
    1,
    Math.round(score * 0.2)
  );
}