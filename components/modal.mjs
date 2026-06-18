export function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
}

export function toggleModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}
