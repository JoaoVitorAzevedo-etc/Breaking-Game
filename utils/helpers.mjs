export function formatDateISO(iso) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}

export function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

export function uid() { return Math.random().toString(36).slice(2, 10); }
