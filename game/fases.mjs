export const ROADMAP = [
  {
    id: 1,
    title: 'Módulo 1: Química Básica',
    badgeId: 'mestre_quimica_basica',
    phases: [
      {
        id: 1,
        tag: '1.1',
        name: 'Separação de Misturas',
        description: 'Métodos de separação básicos e aplicações.',
        minScore: 60,
        reward: { moedas: 20 }
      },
      {
        id: 2,
        tag: '1.2',
        name: 'Forças Intermoleculares',
        description: 'Entender forças de London, dipolo-dipolo e ligação de hidrogênio.',
        minScore: 60,
        reward: { moedas: 20 }
      },
      {
        id: 3,
        tag: '1.3',
        name: 'Polaridade',
        description: 'Como eletronegatividade e geometria determinam polaridade.',
        minScore: 65,
        reward: { moedas: 25 }
      },
      {
        id: 4,
        tag: '1.4',
        name: 'Ligações Químicas',
        description: 'Iônicas, covalentes e metálicas.',
        minScore: 65,
        reward: { moedas: 25 }
      },
      {
        id: 5,
        tag: '1.5',
        name: 'Propriedades da Matéria',
        description: 'Extensivas e intensivas; mudanças de estado.',
        minScore: 70,
        reward: {
          moedas: 50,
          item: 'tema_basico'
        }
      }
    ]
  },

  {
    id: 2,
    title: 'Módulo 2: Físico-Química',
    badgeId: 'sabio_fisico_quimico',
    phases: [
      {
        id: 6,
        tag: '2.1',
        name: 'Estequiometria',
        description: 'Cálculos estequiométricos e reagente limitante.',
        minScore: 70,
        reward: { moedas: 30 }
      },
      {
        id: 7,
        tag: '2.2',
        name: 'Soluções',
        description: 'Concentração, molaridade e diluições.',
        minScore: 70,
        reward: { moedas: 30 }
      },
      {
        id: 8,
        tag: '2.3',
        name: 'Eletroquímica',
        description: 'Pilhas, eletrólise, ânodo e cátodo.',
        minScore: 75,
        reward: { moedas: 35 }
      },
      {
        id: 9,
        tag: '2.4',
        name: 'Termoquímica',
        description: 'Entalpia, exotérmico/endotérmico.',
        minScore: 75,
        reward: { moedas: 35 }
      },
      {
        id: 10,
        tag: '2.5',
        name: 'Cinética Química',
        description: 'Velocidade de reação e fatores que a influenciam.',
        minScore: 80,
        reward: {
          moedas: 75,
          item: 'tema_cientifico'
        }
      }
    ]
  },

  {
    id: 3,
    title: 'Módulo 3: Química Orgânica',
    badgeId: 'genio_quimica_organica',
    phases: [
      {
        id: 11,
        tag: '3.1',
        name: 'Funções Orgânicas',
        description: 'Grupos funcionais e nomenclatura.',
        minScore: 80,
        reward: { moedas: 40 }
      },
      {
        id: 12,
        tag: '3.2',
        name: 'Reações Orgânicas',
        description: 'Esterificação, adição e saponificação.',
        minScore: 80,
        reward: { moedas: 40 }
      },
      {
        id: 13,
        tag: '3.3',
        name: 'Isomeria e Propriedades',
        description: 'Isomeria plana, geométrica e óptica.',
        minScore: 85,
        reward: {
          moedas: 100,
          item: 'tema_organico'
        }
      }
    ]
  },

  {
    id: 4,
    title: 'Desafio Final',
    badgeId: 'campeao_breaking_game',
    phases: [
      {
        id: 14,
        tag: 'FINAL',
        name: 'Prova Abrangente - 10 Perguntas',
        description: 'Prova integradora cobrindo todos os módulos.',
        minScore: 60,
        reward: {
          moedas: 250,
          item: 'titulo_mestre_supremo'
        }
      }
    ]
  }
];

export function getPhaseById(phaseId) {
  for (const mod of ROADMAP) {
    for (const phase of mod.phases) {
      if (phase.id === phaseId) {
        return {
          module: mod,
          phase
        };
      }
    }
  }

  return null;
}

export function getAllPhases() {
  return ROADMAP.flatMap(
    module => module.phases
  );
}

export function isFinalPhase(phaseId) {
  return phaseId === 14;
}

export function getModuleByPhase(phaseId) {
  return ROADMAP.find(
    module =>
      module.phases.some(
        phase => phase.id === phaseId
      )
  );
}

export function getNextPhase(phaseId) {

  const phases =
    getAllPhases();

  const index =
    phases.findIndex(
      phase => phase.id === phaseId
    );

  if (index === -1) {
    return null;
  }

  return phases[index + 1] || null;
}

export function passedPhase(
  phaseId,
  score
) {

  const result =
    getPhaseById(phaseId);

  if (!result) {
    return false;
  }

  return (
    score >=
    result.phase.minScore
  );
}

export function getPhaseReward(
  phaseId
) {

  const result =
    getPhaseById(phaseId);

  return (
    result?.phase?.reward || {
      moedas: 0
    }
  );
}

export function getModuleProgress(
  moduleId,
  completedPhases = []
) {

  const module =
    ROADMAP.find(
      mod => mod.id === moduleId
    );

  if (!module) {
    return 0;
  }

  const completed =
    module.phases.filter(
      phase =>
        completedPhases.includes(
          phase.id
        )
    ).length;

  return Math.round(
    (
      completed /
      module.phases.length
    ) * 100
  );
}

export function getModuleBadge(
  moduleId
) {

  const module =
    ROADMAP.find(
      mod => mod.id === moduleId
    );

  return module?.badgeId || null;
}