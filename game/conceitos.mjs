export const conceitos = {
  introducao: 'Bem-vindo ao curso de Química interativo. Aqui você encontrará textos didáticos por fase.',
  porFase: {}
};

export function setConceptForPhase(phaseId, content) {
  conceitos.porFase[phaseId] = content;
}

export function getConceptForPhase(phaseId) {
  return conceitos.porFase[phaseId] || null;
}
