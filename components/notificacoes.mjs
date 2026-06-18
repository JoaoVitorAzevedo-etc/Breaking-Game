export function notifySuccess(message) {
  alert(message);
}

export function notifyError(message) {
  console.error(message);
  alert('Erro: ' + message);
}

export function notifyInfo(message) {
  console.log(message);
}
