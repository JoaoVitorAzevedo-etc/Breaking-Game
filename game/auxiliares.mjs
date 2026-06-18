export const auxiliares = {
  professores: [],
  assistentes: [],
  conselheiros: []
};

export function registerAuxiliar(type, obj) {
  if (!['professor','assistente','conselheiro'].includes(type)) return;
  auxiliares[type + 's'].push(obj);
}

export function getAuxiliares() {
  return auxiliares;
}
