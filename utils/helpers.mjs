export function formatDateISO(iso) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}

export function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

export function uid() { return Math.random().toString(36).slice(2, 10); }

export function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce(fn, delay = 150) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit = 150) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

export function uuid() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function formatDate(value, locale = 'pt-BR') {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleString(locale);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRequired(value) {
  return String(value || '').trim().length > 0;
}
