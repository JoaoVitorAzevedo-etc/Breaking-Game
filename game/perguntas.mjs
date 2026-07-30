export const QUESTIONS = {

  1: [
    {
      id: '1_1',
      question: 'Para separar um sólido de um líquido, qual método você usaria?',
      options: [
        'Destilação',
        'Filtração',
        'Decantação',
        'Evaporação'
      ],
      answer: 1,
      explanation:
        'Filtração é ideal para separar sólidos de líquidos usando um filtro.',
      hint:
        'O papel de filtro retém o sólido e deixa o líquido passar.',
      difficulty: 'easy',
      points: 20
    },

    {
      id: '1_2',
      question: 'Qual método separa dois líquidos com diferentes pontos de ebulição?',
      options: [
        'Filtração',
        'Decantação',
        'Destilação',
        'Catação'
      ],
      answer: 2,
      explanation:
        'Destilação aquece a mistura e separa os líquidos por seus pontos de ebulição diferentes.',
      hint:
        'O líquido que ferve primeiro é o de menor ponto de ebulição.',
      difficulty: 'easy',
      points: 20
    },

    {
      id: '1_3',
      question: 'Uma mistura de feijão com impurezas deve ser separada por qual método?',
      options: [
        'Centrifugação',
        'Catação',
        'Filtração',
        'Decantação'
      ],
      answer: 1,
      explanation:
        'Catação é a separação manual, como catar feijão impuro um por um.',
      hint:
        'Este é o processo mais simples: separação com as mãos!',
      difficulty: 'easy',
      points: 20
    },

    {
      id: '1_4',
      question: 'Se você tem uma mistura de água e areia, o que acontece se deixar em repouso?',
      options: [
        'Ambos desaparecem',
        'A areia decanta no fundo',
        'A água seca',
        'Ficam misturados para sempre'
      ],
      answer: 1,
      explanation:
        'Decantação usa a densidade: areia (mais densa) vai para o fundo, água fica em cima.',
      hint:
        'Densidade diferente = decantação por gravidade.',
      difficulty: 'easy',
      points: 20
    },

    {
      id: '1_5',
      question: 'Qual método é mais rápido para separar um sólido denso de um líquido?',
      options: [
        'Decantação lenta',
        'Centrifugação',
        'Evaporação',
        'Destilação'
      ],
      answer: 1,
      explanation:
        'Centrifugação usa rotação rápida para acelerar a decantação, forçando o sólido para o fundo.',
      hint:
        'A força centrífuga simula uma "gravidade" muito mais forte!',
      difficulty: 'easy',
      points: 20
    }
  ],

  2: [
    {
      id: '2_1',
      question: 'Entre forças de London, dipolo-dipolo e ligação de hidrogênio, qual é a mais fraca?',
      options: [
        'Ligação de Hidrogênio',
        'Dipolo-dipolo',
        'Forças de London',
        'Todas iguais'
      ],
      answer: 2,
      explanation:
        'Forças de London são as mais fracas, ocorrem entre moléculas apolares.',
      hint:
        'Londres é uma força muito fraca (London)!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '2_2',
      question: 'Por que a água ferve a 100°C enquanto gasolina ferve a ~70°C?',
      options: [
        'Água tem mais átomos',
        'Água tem ligações de hidrogênio mais fortes',
        'Gasolina é mais pesada',
        'Não há razão'
      ],
      answer: 1,
      explanation:
        'Água tem ligações de hidrogênio muito fortes, exigindo mais calor para evaporar.',
      hint:
        'Quanto mais forte a intermolecular, maior o ponto de ebulição.',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '2_3',
      question: 'Moléculas apolares interagem principalmente por qual força?',
      options: [
        'Ligação de Hidrogênio',
        'Dipolo-dipolo',
        'Forças de London',
        'Ligação Iônica'
      ],
      answer: 2,
      explanation:
        'Moléculas apolares (sem carga distribuída) só podem interagir por forças de London, as mais fracas.',
      hint:
        'Apolares = sem dipolos permanentes = só London!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '2_4',
      question: 'O hidrogênio em uma ligação de hidrogênio está ligado a qual(is) elemento(s)?',
      options: [
        'Carbono',
        'Oxigênio, Nitrogênio ou Flúor',
        'Qualquer elemento',
        'Apenas Oxigênio'
      ],
      answer: 1,
      explanation:
        'Ligações de hidrogênio ocorrem quando H está ligado a O, N ou F (elementos muito eletronegativos).',
      hint:
        'O, N, F = elementos muito eletronegativos!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '2_5',
      question: 'Aumentar a força intermolecular afeta qual propriedade?',
      options: [
        'Densidade somente',
        'Ponto de ebulição e ponto de fusão',
        'Cor da substância',
        'Nenhuma propriedade'
      ],
      answer: 1,
      explanation:
        'Quanto mais forte a intermolecular, mais calor é necessário para mudar de estado.',
      hint:
        'Força intermolecular controla transições de fase!',
      difficulty: 'medium',
      points: 25
    }
  ],

  3: [
    {
      id: '3_1',
      question: 'Uma molécula é apolar quando:',
      options: [
        'Tem poucas ligações',
        'Seus vetores de dipolo se anulam',
        'É muito grande',
        'Contém apenas hidrogênio'
      ],
      answer: 1,
      explanation:
        'Geometria linear como CO2 faz os vetores se cancelarem, resultando em molécula apolar.',
      hint:
        'Geometria simétrica = vetores se anulam = apolar!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '3_2',
      question: 'A água é polar porque:',
      options: [
        'É um líquido',
        'Tem geometria angular e os dipolos não se anulam',
        'Tem hidrogênio',
        'Tem oxigênio'
      ],
      answer: 1,
      explanation:
        'H2O tem geometria angular (não linear), então o dipolo O-H não é cancelado.',
      hint:
        'Angular = polar, Linear = pode ser apolar!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '3_3',
      question: 'Por que óleo não se mistura com água?',
      options: [
        'Têm densidades diferentes',
        'Óleo flutua',
        'Água é polar e óleo é apolar',
        'Óleo é mais denso'
      ],
      answer: 2,
      explanation:
        'Semelhante dissolve semelhante: polar dissolve polar, apolar dissolve apolar. Água e óleo não se misturam.',
      hint:
        '"Semelhante dissolve semelhante" é a regra!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '3_4',
      question: 'Qual propriedade define se uma molécula é polar?',
      options: [
        'Sua massa molecular',
        'Eletronegatividade + Geometria',
        'O número de átomos',
        'Sua cor'
      ],
      answer: 1,
      explanation:
        'Polaridade depende tanto de diferenças de eletronegatividade quanto da geometria molecular.',
      hint:
        'Dois fatores: diferença de carga + forma da molécula!',
      difficulty: 'medium',
      points: 25
    },

    {
      id: '3_5',
      question: 'Uma molécula tetraédrica com 4 grupos diferentes será:',
      options: [
        'Sempre apolar',
        'Polar',
        'Nem polar nem apolar',
        'Depende da temperatura'
      ],
      answer: 1,
      explanation:
        'Geometria tetraédrica assimétrica (4 grupos diferentes) gera um dipolo resultante = polar.',
      hint:
        'Assimétrica = polar, Simétrica = apolar!',
      difficulty: 'medium',
      points: 25
    }
  ],

  4: [
    {
      id: '4_1',
      question: 'Qual tipo de ligação ocorre entre um metal e um não-metal?',
      options: [
        'Covalente',
        'Iônica',
        'Metálica',
        'Dativa'
      ],
      answer: 1,
      explanation:
        'Metal + Não-metal = Ligação Iônica (transferência de elétrons).',
      hint:
        'Metal perde, não-metal ganha = Iônico!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '4_2',
      question: 'Na ligação covalente, os elétrons são:',
      options: [
        'Completamente transferidos',
        'Compartilhados entre os átomos',
        'Perdidos',
        'Destruídos'
      ],
      answer: 1,
      explanation:
        'Ligação covalente é o compartilhamento de elétrons entre dois átomos não-metálicos.',
      hint:
        'Co-valência = compartilhamento!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '4_3',
      question: 'Por que metais são bons condutores de eletricidade?',
      options: [
        'Têm muitos átomos',
        'Têm uma "nuvem" de elétrons livres',
        'São sólidos',
        'Têm cor brilhante'
      ],
      answer: 1,
      explanation:
        'Metais têm elétrons delocalizados em um "mar", permitindo fluxo de corrente elétrica.',
      hint:
        'Mar de elétrons = movimento livre!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '4_4',
      question: 'A Regra do Octeto busca que átomos tenham quantos elétrons na valência?',
      options: [
        '2',
        '4',
        '8',
        '18'
      ],
      answer: 2,
      explanation:
        'Átomos buscam 8 elétrons na camada de valência, como os gases nobres (exceto He com 2).',
      hint:
        '8 = Octeto! Gases nobres são o modelo!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '4_5',
      question: 'NaCl é um composto iônico porque:',
      options: [
        'Tem dois elementos',
        'Na é metal (cede elétron) e Cl é não-metal (recebe)',
        'É branco',
        'Tem sódio'
      ],
      answer: 1,
      explanation:
        'Sódio (metal) perde 1 elétron para Cloro (não-metal), formando ligação iônica.',
      hint:
        'Metal perde elétron = cátion positivo. Não-metal recebe = ânion negativo.',
      difficulty: 'medium',
      points: 30
    }
  ],

  5: [
    {
      id: '5_1',
      question: 'Qual é a relação entre massa, volume e densidade?',
      options: [
        'Densidade = Volume / Massa',
        'Densidade = Massa / Volume',
        'Densidade = Massa + Volume',
        'Sem relação'
      ],
      answer: 1,
      explanation:
        'Densidade = Massa ÷ Volume. 1g de ouro e 1g de algodão têm MESMA densidade.',
      hint:
        'D = m/v (massa dividido por volume)',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '5_2',
      question: 'Quando um sólido vira gás DIRETAMENTE, sem passar por líquido, chama-se:',
      options: [
        'Fusão',
        'Evaporação',
        'Sublimação',
        'Condensação'
      ],
      answer: 2,
      explanation:
        'Sublimação: sólido → gás (ex: gelo seco, naftalina). É uma transição de fase direta.',
      hint:
        'Sub = embaixo/direto. Liga = mudança. Direto = sublimação!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '5_3',
      question: 'Ponto de fusão é:',
      options: [
        'A temperatura que sólido vira gás',
        'A temperatura que sólido vira líquido',
        'A temperatura que líquido vira gás',
        'Uma propriedade extensiva'
      ],
      answer: 1,
      explanation:
        'Ponto de fusão é quando um sólido muda para líquido. Para gelo = 0°C.',
      hint:
        'FUSão = Fusão (sólido para líquido)',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '5_4',
      question: 'Densidade é uma propriedade intensiva porque:',
      options: [
        'Depende da quantidade',
        'NÃO depende da quantidade',
        'Muda com a temperatura',
        'É sempre a mesma'
      ],
      answer: 1,
      explanation:
        '1g ou 100g de ouro têm a MESMA densidade. Propriedades intensivas NÃO dependem da quantidade.',
      hint:
        'Intensiva = Independente da quantidade!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '5_5',
      question: 'Uma reação QUÍMICA altera:',
      options: [
        'Apenas a forma',
        'Apenas a posição',
        'A natureza da matéria (forma novas substâncias)',
        'Nada permanente'
      ],
      answer: 2,
      explanation:
        'Reações químicas formam novas substâncias (combustão cria CO2 + H2O). Diferentes de mudanças físicas.',
      hint:
        'Química = NOVA substância formada!',
      difficulty: 'medium',
      points: 30
    }
  ],

  6: [
    {
      id: '6_1',
      question: 'Qual a massa de 1 mol de água (H2O)? (H=1, O=16)',
      options: [
        '17g',
        '18g',
        '10g',
        '20g'
      ],
      answer: 1,
      explanation:
        '(2x1) + 16 = 18g/mol.',
      hint:
        'Some 2 hidrogênios (1+1) + 1 oxigênio (16) = 18',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '6_2',
      question: 'O que indica o coeficiente estequiométrico?',
      options: [
        'A cor',
        'A proporção em mols',
        'A temperatura',
        'A velocidade'
      ],
      answer: 1,
      explanation:
        'Mostram a proporção molar entre reagentes e produtos.',
      hint:
        'Os números na frente da fórmula mostram as proporções.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '6_3',
      question: 'Nas CNTP, o volume de 1 mol de gás é:',
      options: [
        '10L',
        '22,4L',
        '100L',
        '5L'
      ],
      answer: 1,
      explanation:
        'Valor padrão para gases ideais nas CNTP.',
      hint:
        'Número memorável para gases: 22,4',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '6_4',
      question: 'Em uma equação balanceada 2H2 + O2 → 2H2O, qual é o reagente limitante se temos 2 mols de H2 e 2 mols de O2?',
      options: [
        'H2',
        'O2',
        'H2O',
        'Nenhum, há quantidade igual'
      ],
      answer: 1,
      explanation:
        'A proporção estequiométrica é 2:1 (H2:O2). Com 2 mols de cada, O2 é limitante (faltariam 2 mols de H2).',
      hint:
        'Divida a quantidade pelo coeficiente para encontrar qual acaba primeiro.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '6_5',
      question: 'Quantos gramas de CO2 são produzidos na combustão de 1 mol de CH4? (C=12, O=16, H=1)',
      options: [
        '32g',
        '44g',
        '88g',
        '22g'
      ],
      answer: 1,
      explanation:
        '1 mol de CH4 produz 1 mol de CO2. Massa molar CO2 = 12 + (2×16) = 44g/mol.',
      hint:
        'CH4 + 2O2 → CO2 + 2H2O. Um mol de CH4 rende um mol de CO2.',
      difficulty: 'medium',
      points: 30
    }
  ],

  7: [
    {
      id: '7_1',
      question: 'O que é molaridade?',
      options: [
        'Gramas de soluto por litro',
        'Mols de soluto por litro de solução',
        'Quantidade de solvente',
        'Densidade da solução'
      ],
      answer: 1,
      explanation:
        'Molaridade (M) = mols de soluto / litro de solução.',
      hint:
        'M = n/V (mols dividido por volume em litros)',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '7_2',
      question: 'Uma solução saturada de açúcar significa:',
      options: [
        'O açúcar dissolvido é invisível',
        'O açúcar é muito doce',
        'Há o máximo de açúcar dissolvido possível',
        'Não há mais açúcar'
      ],
      answer: 2,
      explanation:
        'Saturada = máximo de soluto dissolvido. Se adicionar mais, precipita.',
      hint:
        'Saturada = não cabe mais soluto!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '7_3',
      question: 'A fórmula de diluição é M1V1 = M2V2. Se tenho 500 mL de solução 2M e diluo para 1L, qual é a nova molaridade?',
      options: [
        '4M',
        '2M',
        '1M',
        '0,5M'
      ],
      answer: 2,
      explanation:
        'M1V1 = M2V2 → 2 × 0,5 = M2 × 1 → M2 = 1M.',
      hint:
        'Aumentar volume = diminuir molaridade. A quantidade de soluto é a mesma!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '7_4',
      question: 'Solubilidade é:',
      options: [
        'A quantidade de solvente',
        'A quantidade máxima de soluto que pode ser dissolvida',
        'A densidade da solução',
        'A velocidade de dissolução'
      ],
      answer: 1,
      explanation:
        'Solubilidade é o máximo de soluto que um solvente consegue dissolver em certas condições.',
      hint:
        'Solubilidade depende de temperatura e da natureza do soluto/solvente.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '7_5',
      question: 'Qual substância é considerada o solvente em uma solução água-sal?',
      options: [
        'O sal',
        'A água (a substância em maior quantidade)',
        'Ambos igualmente',
        'Nenhum dos dois'
      ],
      answer: 1,
      explanation:
        'Solvente é a substância em maior quantidade que dissolve o soluto.',
      hint:
        'Na maioria dos casos aquosos, a água é o solvente!',
      difficulty: 'medium',
      points: 30
    }
  ],

  8: [
    {
      id: '8_1',
      question: 'Em uma célula galvânica (pilha), o polo positivo e o processo que ocorre nele são:',
      options: [
        'Ânodo / Oxidação',
        'Cátodo / Redução',
        'Ânodo / Redução',
        'Cátodo / Oxidação'
      ],
      answer: 1,
      explanation:
        'O cátodo atrai cátions, recebe elétrons e sofre redução (polo positivo da pilha).',
      hint:
        'CRAO: Cátodo Reduz / Ânodo Oxida.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '8_2',
      question: 'OIL RIG refere-se a:',
      options: [
        'Oxidação = Ganho, Redução = Perda',
        'Oxidação = Perda, Redução = Ganho',
        'Óleo e Reação Instantânea Garantida',
        'Nenhuma das alternativas'
      ],
      answer: 1,
      explanation:
        'OIL = Oxidation Is Loss (de elétrons). RIG = Reduction Is Gain (de elétrons).',
      hint:
        'Mnemonick para lembrar oxidação (perde) e redução (ganha).',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '8_3',
      question: 'A eletrólise é:',
      options: [
        'Uma reação espontânea que gera energia',
        'Um processo que usa energia elétrica para forçar uma reação não-espontânea',
        'A queima de eletrodos',
        'A dissolução de sal'
      ],
      answer: 1,
      explanation:
        'Eletrólise controla de uma bateria externa para causar uma reação não-espontânea.',
      hint:
        'Eletrólise = oposto da pilha (consome energia ao invés de produzir).',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '8_4',
      question: 'Em uma pilha, o ânodo é:',
      options: [
        'O polo positivo',
        'O polo negativo',
        'Onde ocorre redução',
        'Onde os cátions são atraídos'
      ],
      answer: 1,
      explanation:
        'Ânodo é onde ocorre oxidação (perda de elétrons) = polo negativo da pilha.',
      hint:
        'Ânodo = Oxida (perde elétrons) = fornece elétrons = negativo.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '8_5',
      question: 'A ferrugem é um exemplo de:',
      options: [
        'Redução',
        'Oxidação não desejada',
        'Reação endotérmica',
        'Mudança de estado físico'
      ],
      answer: 1,
      explanation:
        'Ferrugem ocorre quando ferro perde elétrons para oxigênio = oxidação espontânea e indesejável.',
      hint:
        'Fe perde elétrons para O2 = oxidação',
      difficulty: 'medium',
      points: 30
    }
  ],

  9: [
    {
      id: '9_1',
      question: 'Reações exotérmicas têm ΔH:',
      options: [
        'Positivo',
        'Negativo',
        'Zero',
        'Indefinido'
      ],
      answer: 1,
      explanation:
        'Exotérmicas liberam calor = ΔH negativo (energia sai do sistema).',
      hint:
        'EXO = saída. Calor sai = energia negativa.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '9_2',
      question: 'Combustão é uma reação:',
      options: [
        'Endotérmica',
        'Exotérmica',
        'Sem mudança térmica',
        'Que absorve luz'
      ],
      answer: 1,
      explanation:
        'Combustão queima material liberando muita energia (calor e luz) = exotérmica.',
      hint:
        'Fogo = calor liberado = exotérmico.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '9_3',
      question: 'Quebrar ligações químicas é:',
      options: [
        'Exotérmico',
        'Endotérmico',
        'Neutral',
        'Não consome energia'
      ],
      answer: 1,
      explanation:
        'Quebrar ligações SEMPRE consome energia (endotérmico).',
      hint:
        'Precisa de energia para separar átomos.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '9_4',
      question: 'Formar ligações químicas é:',
      options: [
        'Endotérmico',
        'Exotérmico',
        'Neutral',
        'Sem liberação de energia'
      ],
      answer: 1,
      explanation:
        'Formar ligações SEMPRE libera energia (exotérmico).',
      hint:
        'Átomos se unem e liberam energia.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '9_5',
      question: 'A entalpia (H) representa:',
      options: [
        'A temperatura',
        'O conteúdo energético de uma substância',
        'A velocidade da reação',
        'A cor da reação'
      ],
      answer: 1,
      explanation:
        'Entalpia = energia térmica total de um sistema.',
      hint:
        'H = conteúdo energético.',
      difficulty: 'medium',
      points: 30
    }
  ],

  10: [
    {
      id: '10_1',
      question: 'A Teoria das Colisões afirma que para uma reação ocorrer é necessário:',
      options: [
        'Apenas juntar os reagentes',
        'Choques entre moléculas COM orientação correta E energia mínima',
        'Aquecer infinitamente',
        'Adicionar um sólido'
      ],
      answer: 1,
      explanation:
        'Três condições: colisão, orientação correta e energia de ativação mínima.',
      hint:
        'COleção + ORientação + Energia = reação!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '10_2',
      question: 'Um catalisador:',
      options: [
        'Aumenta a quantidade de produto',
        'Diminui a energia de ativação SEM ser consumido',
        'Para a reação',
        'Muda a temperatura'
      ],
      answer: 1,
      explanation:
        'Catalisadores facilitam a reação fazendo um caminho alternativo com menor energia.',
      hint:
        'Catalisador entra e sai da reação inalterado.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '10_3',
      question: 'Aumentar a concentração de reagentes:',
      options: [
        'Diminui a velocidade',
        'Aumenta o número de colisões = acelera a reação',
        'Não afeta a velocidade',
        'Congela a reação'
      ],
      answer: 1,
      explanation:
        'Mais moléculas = mais colisões por unidade de tempo = reação mais rápida.',
      hint:
        'Mais moléculas no mesmo espaço = mais possibilidades de colisão.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '10_4',
      question: 'A energia de ativação é:',
      options: [
        'O calor final da reação',
        'A barreira energética que deve ser superada para a reação começar',
        'A temperatura da sala',
        'A quantidade de produto'
      ],
      answer: 1,
      explanation:
        'Energia mínima necessária para iniciar a reação (conceptualizada como uma "montanha").',
      hint:
        'Precisa de energia para "montar" e iniciar a descida.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '10_5',
      question: 'Enzimas são:',
      options: [
        'Catalisadores biológicos que diminuem a energia de ativação',
        'Vitaminas',
        'Hormônios',
        'Proteínas que param reações'
      ],
      answer: 0,
      explanation:
        'Enzimas são catalisadores naturais que tornam reações biológicas possíveis em temperatura corporal.',
      hint:
        'Enzimas fazem possível a química da vida.',
      difficulty: 'medium',
      points: 30
    }
  ],

  11: [
    {
      id: '11_1',
      question: 'O grupo funcional dos álcoois é:',
      options: [
        '-CHO',
        '-OH',
        '-COOH',
        '-CO-'
      ],
      answer: 1,
      explanation:
        'Álcoois terminam com -OH (hidroxila).',
      hint:
        'ALcohol = -OH',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '11_2',
      question: 'O grupo funcional dos aldeídos é:',
      options: [
        '-OH',
        '-CHO',
        '-CO-',
        '-COOH'
      ],
      answer: 1,
      explanation:
        'Aldeídos têm -CHO (carbonila no final da cadeia).',
      hint:
        'ALdeído = -AL (aldoxo) = -CHO no final',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '11_3',
      question: 'Cetonas têm o grupo -CO- (carbonila):',
      options: [
        'No final da cadeia',
        'No meio da cadeia',
        'Em qualquer lugar',
        'Nunca'
      ],
      answer: 1,
      explanation:
        'Cetonas têm -CO- entre dois carbonos (no MEIO, não na ponta).',
      hint:
        'CO no MEIO = Cetona. CO na PONTA = Aldeído.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '11_4',
      question: 'Ácidos carboxílicos têm o grupo:',
      options: [
        '-OH',
        '-CHO',
        '-COOH',
        '-CO-'
      ],
      answer: 2,
      explanation:
        'Ácidos carboxílicos têm -COOH (carbonila + hidroxila = carboxila).',
      hint:
        'CARboxilic = -COOH',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '11_5',
      question: 'A nomenclatura "Etanol" significa:',
      options: [
        '2 carbonos, éter',
        '2 carbonos, álcool',
        '1 carbono, álcool',
        '3 carbonos, aldeído'
      ],
      answer: 1,
      explanation:
        'ET (2 carbonos) + OL (álcool) = Etanol (CH3-CH2-OH).',
      hint:
        'Prefixo (número de C) + sufixo (função)',
      difficulty: 'medium',
      points: 30
    }
  ],

  12: [
    {
      id: '12_1',
      question: 'Combustão completa de uma molécula orgânica produz:',
      options: [
        'Apenas calor',
        'CO2 + H2O (+ calor)',
        'Apenas cinzas',
        'Gases tóxicos'
      ],
      answer: 1,
      explanation:
        'Combustão completa: CxHy + O2 → CO2 + H2O (+ energia).',
      hint:
        'Combustão = queima total = CO2 + H2O.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '12_2',
      question: 'Esterificação é a reação entre:',
      options: [
        'Um álcool e um aldeído',
        'Um ácido carboxílico e um álcool → um éster',
        'Duas cetonas',
        'Um ácido e uma base'
      ],
      answer: 1,
      explanation:
        'Ácido + Álcool → Éster + Água. Produz óleos e fragrâncias.',
      hint:
        'Esterificação = Ester + acidificação.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '12_3',
      question: 'Saponificação é:',
      options: [
        'A destilação de óleos',
        'A hidrólise de gordura com base → Sabão + Glicerol',
        'A oxidação de álcoois',
        'A combustão de ésteres'
      ],
      answer: 1,
      explanation:
        'Gordura + NaOH (base) → Sabão (sais de ácidos graxos) + Glicerol.',
      hint:
        'Saponificação = fabricação de sabão!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '12_4',
      question: 'Polimerização é:',
      options: [
        'A quebra de polímeros',
        'A reação onde monômeros se unem formando cadeias gigantes (polímeros)',
        'Uma reação de esterificação',
        'A separação de molecules'
      ],
      answer: 1,
      explanation:
        'Muitos monômeros (poli = muitos) + ligação (merização) = Polímeros como plástico.',
      hint:
        'Muitos + partes = Polímero!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '12_5',
      question: 'Uma reação de ADIÇÃO em uma dupla ligação C=C:',
      options: [
        'A quebra e forma de novas ligações',
        'Cria uma nova molécula com átomos adicionados através da dupla quebrada',
        'Remove hidrogênio',
        'Não altera a estrutura'
      ],
      answer: 1,
      explanation:
        'A dupla ligação quebra (C=C → C-C) e novos grupos entram (X-Y adiciona).',
      hint:
        'Dupla ligação abre para ADICIONAR átomos.',
      difficulty: 'medium',
      points: 30
    }
  ],

  13: [
    {
      id: '13_1',
      question: 'Isomeria plana refere-se a:',
      options: [
        'Moléculas no mesmo plano',
        'Diferentes sequências de átomos (mesma fórmula molecular)',
        'Estrutura 3D diferente',
        'Diferentes estados da matéria'
      ],
      answer: 1,
      explanation:
        'Isômeros planos têm mesma fórmula mas átomos em diferentes ordens (ex: Etanol vs Metoximetano).',
      hint:
        'MESMA fórmula, DIFERENTES arranjos = propriedades diferentes!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '13_2',
      question: 'Isomeria geométrica (CIS/TRANS) ocorre:',
      options: [
        'Em saturadas',
        'Em duplas ligações rígidas com grupos diferentes',
        'Em moléculas pequenas',
        'Em qualquer molécula'
      ],
      answer: 1,
      explanation:
        'CIS = grupos no mesmo lado. TRANS = grupos em lados opostos da dupla ligação.',
      hint:
        'CIS = mesmo lado (como mãos aplauso). TRANS = lados opostos.',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '13_3',
      question: 'Isomeria óptica (estereoisomeria) ocorre com:',
      options: [
        'Duplas ligações',
        'Carbonos quirais (4 grupos diferentes ligados)',
        'Qualquer cadeia longa',
        'Moléculas apolares'
      ],
      answer: 1,
      explanation:
        'Carbono quiral = 4 grupos DIFERENTES → duas formas espelhadas (dextro/levo).',
      hint:
        'Quiral = quiro (mão). Como mãos direita/esquerda (espelhos).',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '13_4',
      question: 'Tautomeria é:',
      options: [
        'Uma mudança irreversível',
        'Um equilíbrio dinâmico entre duas formas (ex: ceto-enólica)',
        'Uma reação de combustão',
        'Sinônimo de isomeria plana'
      ],
      answer: 1,
      explanation:
        'Tautômeros estão em equilíbrio rápido - uma forma se converte na outra facilmente.',
      hint:
        'Ceto (C=O) ⇌ Enol (C=C + OH) - oscilam entre formas!',
      difficulty: 'medium',
      points: 30
    },

    {
      id: '13_5',
      question: 'Etanol (álcool) e Metoximetano (éter) são:',
      options: [
        'A mesma molécula',
        'Isômeros (mesma fórmula C2H6O, propriedades diferentes)',
        'Alótopos',
        'Polímeros'
      ],
      answer: 1,
      explanation:
        'Ambos C2H6O, mas etanol é um álcool (bebida) e metoximetano é um éter (anestésico).',
      hint:
        'Mesma fórmula molecular = isômeros = comportamentos completamente diferentes!',
      difficulty: 'medium',
      points: 30
    }
  ],

  14: [
    {
      id: '14_1',
      question: 'Se você misturar areia, sal e água, quais métodos usaria em ordem para recuperar a areia seca e o sal sólido?',
      options: [
        'Destilação e Filtração',
        'Filtração e Destilação (ou Evaporação)',
        'Decantação e Catação',
        'Centrifugação apenas'
      ],
      answer: 1,
      explanation:
        'Filtração retém a areia. Destilação/Evaporação separa a água do sal.',
      hint:
        'Primeiro tire o sólido insolúvel, depois separe o soluto dissolvido.',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_2',
      question: 'Qual das seguintes substâncias terá o maior ponto de ebulição devido às suas forças intermoleculares?',
      options: [
        'CH4 (London)',
        'H2O (Ligações de Hidrogênio)',
        'HCl (Dipolo-dipolo)',
        'H2 (London)'
      ],
      answer: 1,
      explanation:
        'A água faz ligações de hidrogênio muito fortes, exigindo muita energia térmica para ferver.',
      hint:
        'Ligações de Hidrogênio são as interações intermoleculares mais fortes.',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_3',
      question: 'O composto CH3-CH2-OH pertence a qual função orgânica?',
      options: [
        'Aldeído',
        'Álcool',
        'Cetona',
        'Éter'
      ],
      answer: 1,
      explanation:
        'CH3-CH2-OH é etanol, que tem 2 carbonos e grupo -OH = álcool. A percentagem de álcool (ethanol) em bebidas vem dessa molécula!',
      hint:
        '2 carbonos (ET) + OH (ALcool) = ETanol!',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_4',
      question: 'Como se chama a molécula CH3-CHO?',
      options: [
        'Metanal (aldeído)',
        'Etanal (aldeído)',
        'Metanol (álcool)',
        'Metatona (cetona)'
      ],
      answer: 0,
      explanation:
        'CH3-CHO tem 1 carbono na cadeia + CHO = Metanal (formol usado em laboratório).',
      hint:
        'MET (1 carbono) + AL (aldeído) = METanal!',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_5',
      question: 'Qual grupo funcional está presente em CH3-CO-CH3?',
      options: [
        'Álcool (-OH)',
        'Carboxila (-COOH)',
        'Cetona (-CO-)',
        'Aldeído (-CHO)'
      ],
      answer: 2,
      explanation:
        'O grupo -CO- no MEIO da cadeia identifica uma cetona. Esta é a acetona usada para remover esmalte!',
      hint:
        '-CO- no meio (não na ponta) = CETONA!',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_6',
      question: 'Qual molécula tem a fórmula HCOOH?',
      options: [
        'Ácido fórmico',
        'Ácido acético',
        'Formol',
        'Etanol'
      ],
      answer: 0,
      explanation:
        'HCOOH é ácido fórmico (picada de formiga). Tem 1 carbono + COOH = ácido.',
      hint:
        'H-COOH = ácido FÓRMIco!',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_7',
      question: 'Em uma célula galvânica (pilha), o polo positivo e o processo que ocorre nele são:',
      options: [
        'Ânodo / Oxidação',
        'Cátodo / Redução',
        'Ânodo / Redução',
        'Cátodo / Oxidação'
      ],
      answer: 1,
      explanation:
        'O cátodo atrai cátions, recebe elétrons e sofre redução (polo positivo da pilha).',
      hint:
        'CRAO: Cátodo Reduz / Ânodo Oxida.',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_8',
      question: 'Um estudante quer acelerar a reação de um comprimido efervescente em água. Qual ação NÃO ajuda?',
      options: [
        'Triturar o comprimido',
        'Usar água gelada',
        'Usar água quente',
        'Agitar a solução'
      ],
      answer: 1,
      explanation:
        'Água gelada diminui a energia cinética das moléculas, deixando a reação mais lenta.',
      hint:
        'O resfriamento reduz o número de colisões efetivas por segundo.',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_9',
      question: 'Identifique o tipo de isomeria entre o Cis-but-2-eno e o Trans-but-2-eno:',
      options: [
        'Isomeria de Cadeia',
        'Isomeria Geométrica',
        'Isomeria Óptica',
        'Isomeria de Posição'
      ],
      answer: 1,
      explanation:
        'Diferem na posição espacial dos ligantes ao redor da dupla ligação rígida.',
      hint:
        'Cis e Trans são designações da estereoisomeria geométrica.',
      difficulty: 'hard',
      points: 50
    },

    {
      id: '14_10',
      question: 'A molécula de paracetamol possui anel aromático ligado a um grupo hidroxila e a um grupo amida substituído. Ela NÃO possui qual característica?',
      options: [
        'Função Fenol',
        'Função Amida',
        'Átomo de Carbono Quiral',
        'Ligações pi conjugadas'
      ],
      answer: 2,
      explanation:
        'O paracetamol possui fenol (OH no anel) e amida (C=O + N no anel). Tem 3 ligações pi (anel + dupla ligação da cadeia + C=O da amida). Não possui carbonos quirais em sua estrutura padrão.',
      hint:
        'Identifique cada grupo funcional: C=O + N–H = amida; –OH no aromático = fenol; –O– no anel = éter.',
      difficulty: 'hard',
      points: 50
    }
  ]
};

export function getQuestionsByPhase(phaseId) {
  return QUESTIONS[phaseId] || [];
}

export function getRandomQuestions(
  phaseId,
  amount = 5
) {
  const questions =
    [...(QUESTIONS[phaseId] || [])];

  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);
}

export function getQuestion(
  phaseId,
  questionId
) {

  const questions =
    QUESTIONS[phaseId] || [];

  return questions.find(
    q => q.id === questionId
  );
}

export function isCorrectAnswer(
  phaseId,
  questionId,
  selectedAnswer
) {

  const question =
    getQuestion(
      phaseId,
      questionId
    );

  return (
    question &&
    selectedAnswer ===
      question.answer
  );
}

export function getHint(
  phaseId,
  questionId
) {

  const question =
    getQuestion(
      phaseId,
      questionId
    );

  return question?.hint || null;
}

export function getPhaseInfo(
  phaseId
) {

  const questions =
    QUESTIONS[phaseId] || [];

  return {
    phaseId,
    totalQuestions:
      questions.length
  };
}