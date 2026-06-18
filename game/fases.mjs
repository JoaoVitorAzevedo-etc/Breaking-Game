export const ROADMAP = [
  {
    id: 1,
    title: 'Módulo 1: Química Básica',
    phases: [
      { id: 1, tag: '1.1', name: 'Separação de Misturas', description: 'Métodos de separação básicos e aplicações.' },
      { id: 2, tag: '1.2', name: 'Forças Intermoleculares', description: 'Entender forças de London, dipolo-dipolo e ligação de hidrogênio.' },
      { id: 3, tag: '1.3', name: 'Polaridade', description: 'Como eletronegatividade e geometria determinam polaridade.' },
      { id: 4, tag: '1.4', name: 'Ligações Químicas', description: 'Iônicas, covalentes e metálicas.' },
      { id: 5, tag: '1.5', name: 'Propriedades da Matéria', description: 'Extensivas e intensivas; mudanças de estado.' }
    ]
  },
  {
    id: 2,
    title: 'Módulo 2: Físico-Química',
    phases: [
      { id: 6, tag: '2.1', name: 'Estequiometria', description: 'Cálculos estequiométricos e reagente limitante.' },
      { id: 7, tag: '2.2', name: 'Soluções', description: 'Concentração, molaridade e diluições.' },
      { id: 8, tag: '2.3', name: 'Eletroquímica', description: 'Pilhas, eletrólise, ânodo e cátodo.' },
      { id: 9, tag: '2.4', name: 'Termoquímica', description: 'Entalpia, exotérmico/endotérmico.' },
      { id: 10, tag: '2.5', name: 'Cinética Química', description: 'Velocidade de reação e fatores que a influenciam.' }
    ]
  },
  {
    id: 3,
    title: 'Módulo 3: Química Orgânica',
    phases: [
      { id: 11, tag: '3.1', name: 'Funções Orgânicas', description: 'Grupos funcionais e nomenclatura.' },
      { id: 12, tag: '3.2', name: 'Reações Orgânicas', description: 'Esterificação, adição, saponificação.' },
      { id: 13, tag: '3.3', name: 'Isomeria e Propriedades', description: 'Isomeria plana, geométrica e óptica.' }
    ]
  },
  {
    id: 4,
    title: 'Desafio Final',
    phases: [
      { id: 14, tag: 'FINAL', name: 'Prova Abrangente - 10 Perguntas', description: 'Prova integradora cobrindo todos os módulos.' }
    ]
  }
];

export function getPhaseById(phaseId) {
  for (const mod of ROADMAP) {
    for (const p of mod.phases) {
      if (p.id === phaseId) return { module: mod, phase: p };
    }
  }
  return null;
}

export function getAllPhases() {
  return ROADMAP.flatMap(m => m.phases);
}

export function isFinalPhase(phaseId) {
  return phaseId === 14;
}
