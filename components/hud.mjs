export function updateHUD({ pontos, fase, progresso }) {
  const pEl = document.getElementById('hud-pontos');
  const fEl = document.getElementById('hud-fase');
  const prEl = document.getElementById('hud-progresso');
  if (pEl) pEl.textContent = String(pontos ?? '0');
  if (fEl) fEl.textContent = String(fase ?? '-');
  if (prEl) prEl.style.width = `${(progresso || 0) * 100}%`;
}

export function initHUD() {
  updateHUD({ pontos: 0, fase: 1, progresso: 0 });
}
