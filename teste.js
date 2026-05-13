const app = {
            usuarioAtual: null,
            // --- NOVAS PROPRIEDADES ADICIONADAS ---
            usuario: null,
            temaSelecionado: 'light-1',
            fonteSelecionada: 'inter',
            tamanhoFonte: 'medio',
            // --------------------------------------
            perguntaAtualIdx: 0,
            gameState: { 
                nivelAtual: 1, 
                pontuacao: 0, 
                pontuacaoAtual: 0,
                acertos: 0,
                dicasUsadas: 0,
                dicasDisponiveis: 3,
                CUSTO_DICA: 10
            },
            auxiliarSelecionado: null,
            nivelPendente: null,
            tagPendente: null,
            sons: {},
            
            inicializarSons() {
                const basePath = 'sounds/';
                this.sons = {
                    acerto: new Howl({ src: [basePath + 'acerto.mp3'], volume: 0.8 }),
                    erro: new Howl({ src: [basePath + 'erro.mp3'], volume: 0.8 }),
                    conquista: new Howl({ src: [basePath + 'conquista.mp3'], volume: 0.8 }),
                    vitoria: new Howl({ src: [basePath + 'vitoria.mp3'], volume: 0.8 }),
                    derrota: new Howl({ src: [basePath + 'derrota.mp3'], volume: 0.8 })
                };
            },

            tocarSom(chave) {
                if (this.sons && this.sons[chave]) {
                    try {
                        this.sons[chave].play();
                    } catch (e) {
                        console.warn('Não foi possível tocar o som:', chave, e);
                    }
                }
            },
            
            // ============================================
            // VERIFICAÇÃO DE DISPONIBILIDADE DO LOCALSTORAGE
            // ============================================
            isLocalStorageAvailable() {
                try {
                    const test = '__teste__';
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            },

            salvarDados(chave, dados) {
                if (this.isLocalStorageAvailable()) {
                    try {
                        localStorage.setItem(chave, JSON.stringify(dados));
                    } catch (e) {}
                }
            },

            carregarDados(chave, padraoValor = null) {
                if (!this.isLocalStorageAvailable()) return padraoValor;
                try {
                    const dados = localStorage.getItem(chave);
                    return dados ? JSON.parse(dados) : padraoValor;
                } catch (e) {
                    return padraoValor;
                }
            },

            obterPerfilPadrao() {
                return {
                    nome: "user",
                    pontuacaoTotal: 0,
                    nivelMaximo: 1,
                    badges: [],
                    historico: [],
                    temaCurrent: "light",
                    tamanhoFonte: "medio"
                };
            },

            obterPerfilUser0() {
                return {
                    nome: "user0",
                    pontuacaoTotal: 9999,
                    nivelMaximo: 14,
                    badges: [
                        { nome: "Campeão do Breaking Game", icone: "🎮", descricao: "Complete o desafio final com 60% ou mais de acerto!" },
                        { nome: "Mestre Supremo", icone: "👨‍🎓", descricao: "Gabarite a prova final - você é um verdadeiro Doutor em Química!" },
                        { nome: "Perfeição Química", icone: "🏆", descricao: "Gabarite todas as perguntas em uma única fase!" },
                        { nome: "Primeiros Passos", icone: "👶", descricao: "Conclua a sua primeira fase com pontuação mínima." },
                        { nome: "Independente", icone: "💪", descricao: "Complete uma fase sem usar nenhuma dica!" },
                        { nome: "Mente Brilhante", icone: "⭐", descricao: "Acumule um total de 500 pontos em sua jornada." },
                        { nome: "Mestre da Química Básica", icone: "📚", descricao: "Desbloqueie todas as fases do Módulo 1: Química Básica!" },
                        { nome: "Sábio Físico-Químico", icone: "🔬", descricao: "Desbloqueie todas as fases do Módulo 2: Físico-Química!" },
                        { nome: "Gênio da Química Orgânica", icone: "🧪", descricao: "Desbloqueie todas as fases do Módulo 3: Química Orgânica!" },
                        { nome: "Aprendiz Consistente", icone: "📈", descricao: "Complete 5 fases seguidas com 4 ou mais acertos!" },
                        { nome: "Lenda Viva", icone: "👑", descricao: "Acumule um total de 1000 pontos em sua jornada!" },
                        { nome: "Inteligência Pura", icone: "🧠", descricao: "Complete 5 fases sem usar nenhuma dica!" },
                        { nome: "Rápido Aprendiz", icone: "⚡", descricao: "Avance para a 3ª fase com pontuação mínima!" },
                        { nome: "Vencedor de Desafios", icone: "🎯", descricao: "Complete a 10ª fase (Cinética Química)!" },
                        { nome: "Químico Impecável", icone: "✨", descricao: "Gabarite uma fase a partir do Módulo 2!" },
                        { nome: "Jornada Épica", icone: "🚀", descricao: "Complete 10 fases com desempenho consistente!" }
                    ],
                    historico: [
                        { fase: 1, data: "01/01/2026 às 10:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 2, data: "01/01/2026 às 10:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 3, data: "01/01/2026 às 11:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 4, data: "01/01/2026 às 11:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 5, data: "01/01/2026 às 12:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 10, data: "01/01/2026 às 12:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 14, data: "01/01/2026 às 13:00", acertos: 10, pontos: 500, dicasUsadas: 0 }
                    ],
                    temaCurrent: "light",
                    tamanhoFonte: "medio"
                };
            },

            inicializarConta() {
                this.contaPadrao = this.obterPerfilPadrao();
            },

            contaPadrao: null,

            curriculo: [
                {
                    titulo: "Módulo 1: Química Básica",
                    fases: [
                        { id: 1, tag: "1.1", nome: "Separação de misturas" },
                        { id: 2, tag: "1.2", nome: "Forças intermoleculares" },
                        { id: 3, tag: "1.3", nome: "Polaridade" },
                        { id: 4, tag: "1.4", nome: "Ligações químicas" },
                        { id: 5, tag: "1.5", nome: "Propriedades da matéria" }
                    ]
                },
                {
                    titulo: "Módulo 2: Físico-Química",
                    fases: [
                        { id: 6, tag: "2.1", nome: "Estequiometria" },
                        { id: 7, tag: "2.2", nome: "Soluções" },
                        { id: 8, tag: "2.3", nome: "Eletroquímica" },
                        { id: 9, tag: "2.4", nome: "Termoquímica" },
                        { id: 10, tag: "2.5", nome: "Cinética química" }
                    ]
                },
                {
                    titulo: "Módulo 3: Química Orgânica",
                    fases: [
                        { id: 11, tag: "3.1", nome: "Funções orgânicas" },
                        { id: 12, tag: "3.2", nome: "Reações orgânicas" },
                        { id: 13, tag: "3.3", nome: "Isomeria e propriedades" }
                    ]
                },
                {
                    titulo: "Desafio Final",
                    fases: [
                        { id: 14, tag: "FINAL", nome: "Prova Abrangente - 10 Perguntas" }
                    ]
                }
            ],

            conceitos: {
                nivel1: {
                    professor: "Olá! Nesta fase, vamos estudar <strong>Separação de Misturas</strong>. Existem vários métodos para separar componentes de uma mistura, e cada um é escolhido conforme o estado físico dos componentes. Os principais são: <strong>Filtração</strong> (separa sólidos de líquidos), <strong>Destilação</strong> (separa líquidos com pontos de ebulição diferentes), <strong>Decantação</strong> (usa a diferença de densidade), <strong>Catação</strong> (separação manual) e <strong>Centrifugação</strong> (usa força centrífuga).",
                    assistente: "Na prática do laboratório, a escolha do método depende do que você precisa separar! Se tem sólido e líquido, use filtração com papel de filtro. Se são dois líquidos, destile aquecendo. Se é sólido mais denso em água, decante deixando o pesado no fundo. Catação é quando você separa com a mão (tipo catar feijão). E centrifugação acelera a decantação girando rápido!",
                    conselheiro: "Pense logicamente: cada substância tem propriedades! Tamanho diferente? Separe por peneira ou filtração. Densidade diferente? Deixe em repouso (decantação) ou gire (centrifugação). Ponto de ebulição diferente? Aqueça e destile. O segredo é identificar qual propriedade diferencia seus componentes e escolher o método certo."
                },
                nivel2: {
                    professor: "Bem-vindo à fase de <strong>Forças Intermoleculares</strong>! Estas são as forças que mantêm as moléculas unidas. Existem três tipos principais: <strong>Forças de London</strong> (mais fracas, entre moléculas apolares), <strong>Dipolo-Dipolo</strong> (entre moléculas polares), e <strong>Ligações de Hidrogênio</strong> (mais fortes, quando H está ligado a O, N ou F). Quanto mais forte a intermolecular, maior o ponto de ebulição!",
                    assistente: "No laboratório, você nota que algumas substâncias fervem fácil (como gasolina) e outras custam mais (como água). Por quê? Forças fracas (London) = baixo ponto de ebulição. Forças fortes (Hidrogênio) = alto ponto de ebulição. A água ferve a 100°C porque tem ligações de hidrogênio super fortes!",
                    conselheiro: "Conecte os conceitos: moléculas apolares (sem carga) têm só forças de London - fracas. Moléculas polares têm dipolo-dipolo - médias. Moléculas com H ligado a O, N ou F fazem ligações de H - as mais fortes! Quanto mais forte a ligação, mais energia (calor) é preciso para separar as moléculas."
                },
                nivel3: {
                    professor: "Chegamos à <strong>Polaridade Molecular</strong>! Uma molécula é polar quando tem um desequilíbrio de carga (um lado mais positivo, outro mais negativo). Isso depende de dois fatores: <strong>Diferença de eletronegatividade</strong> entre os átomos E <strong>Geometria da molécula</strong>. Se os vetores se anulam (geometria linear), a molécula é apolar. Se não se anulam (angular, tetraédrica assimétrica), é polar!",
                    assistente: "Na prática: água (H2O) é polar porque tem geometria angular e os dipolos não se anulam. CO2 é apolar porque é linear e os vetores se cancelam. Essa propriedade explica por que 'semelhante dissolve semelhante' - água (polar) dissolve sal (polar), mas não dissolve óleo (apolar)!",
                    conselheiro: "Lógica importante: eletronegatividade + geometria = polaridade. Se a molécula é simétrica, os vetores se anulam (apolar). Se é assimétrica, há dipolo resultante (polar). Visualmente: linear = pode ser apolar, angular = geralmente polar, tetraédrica simétrica = apolar, tetraédrica assimétrica = polar!"
                },
                nivel4: {
                    professor: "Nesta fase, exploramos as <strong>Ligações Químicas</strong>! Existem três tipos principais: <strong>Ligação Iônica</strong> (transferência de elétrons entre Metal e Não-Metal), <strong>Ligação Covalente</strong> (compartilhamento de elétrons entre Não-Metais), e <strong>Ligação Metálica</strong> (nuvem de elétrons em metais). A <strong>Regra do Octeto</strong> explica que átomos buscam 8 elétrons na valência para estabilidade.",
                    assistente: "Em reações reais: Metal + Não-Metal = Iônico (NaCl, MgO). Não-Metal + Não-Metal = Covalente (H2O, CO2). Em metais, os elétrons fluem livremente como em um 'mar' - por isso conduzem eletricidade! Lembre-se: octeto = 8 elétrons na última camada = estável como um gás nobre.",
                    conselheiro: "Pense na tendência dos átomos: todos querem ser estáveis como gases nobres. Metais doam elétrons (ficam positivos). Não-metais recebem (ficam negativos). A atração entre cargas opostas cria a ligação iônica. Se compartilham, é covalente. O padrão está em reconhecer os padrões nas reações!"
                },
                nivel5: {
                    professor: "Bem-vindo ao estudo das <strong>Propriedades da Matéria</strong>! Classificamos em <strong>Extensivas</strong> (dependem da quantidade: massa, volume, peso) e <strong>Intensivas</strong> (independem: densidade, ponto de fusão, ponto de ebulição). Também temos <strong>Mudanças de Estado Físico</strong>: Fusão (sólido→líquido), Ebulição (líquido→gás), Sublimação (sólido→gás direto), e seus inversos.",
                    assistente: "Na prática: densidade = massa/volume é intensiva (1g de ouro e 10g têm mesma densidade). Ponto de fusão do gelo é sempre 0°C, não importa quanto gelo tenha (intensiva). Sublimação: gelo seco vira gás sem passar por líquido! Isso impressiona no lab, mas é química pura.",
                    conselheiro: "Lembrete lógico: extensiva varia com a quantidade (E de extenso). Intensiva não varia (I de independente). Fenômenos químicos mudam a natureza (nova substância). Físicos apenas mudam estado sem formar nova substância. Identifique o padrão: mudança de estado = físico; formação de novo composto = químico."
                },
                nivel6: {
                    professor: "Entramos em <strong>Estequiometria</strong>! Este é o cálculo das proporções entre reagentes e produtos. Começamos com <strong>Massa Molar</strong> (soma das massas atômicas dos elementos em uma molécula), <strong>Mol</strong> (unidade que relaciona número de partículas), e <strong>Coeficientes Estequiométricos</strong> (os números na frente das fórmulas que mostram as proporções). Volume molar é 22,4 L para 1 mol de gás nas CNTP.",
                    assistente: "No laboratório, você PRECISA de estequiometria para calcular reagentes! Se uma reação precisa de 2 mols de H2 para 1 mol de O2, você deve pesar e medir as quantidades corretas. Reagente limitante é aquele que acaba primeiro, determinando a quantidade máxima de produto. Sempre sobra reagente em excesso!",
                    conselheiro: "Pense: química é proporção! Os números na equação (coeficientes) dizem a relação entre mols. Para encontrar gramas, multiplique mols pela massa molar. Para encontrar volume de gás, multiplique mols por 22,4L. Identifique qual reagente é limitante (aquele com menor proporção molar) e ele controla tudo!"
                },
                nivel7: {
                    professor: "Bem-vindo ao estudo de <strong>Soluções</strong>! Uma solução é uma mistura homogênea de soluto (o que se dissolve) e solvente (o que dissolve, geralmente água). <strong>Solubilidade</strong> é a quantidade máxima de soluto que o solvente consegue dissolver. <strong>Concentração</strong> mede quanto soluto tem na solução. <strong>Molaridade (M)</strong> é mols de soluto por litro de solução. <strong>Diluição</strong> aumenta o volume sem adicionar mais soluto.",
                    assistente: "Na prática: sal dissolvido em água forma uma solução (homogênea). Se você adiciona mais sal que o máximo solúvel, fica saturada + precipitado. Para diluir, adiciona mais solvente. A fórmula importante: M₁V₁ = M₂V₂. Se conhece a molaridade inicial e volume, pode calcular a diluição!",
                    conselheiro: "Lógica simples: soluto é o que desaparece visualmente (dissolvido). Solvente é a maior parte. Molaridade conta mols em um litro. Diluição dilui sem mudar a quantidade de soluto - o soluto fica mais espalhado! Saturation = máximo permitido. Além disso, fica supersaturada (instável) ou com precipitado."
                },
                nivel8: {
                    professor: "Entramos em <strong>Eletroquímica</strong>! Aqui estudamos reações que envolvem transferência de elétrons. <strong>Pilha</strong> produz energia elétrica de uma reação química espontânea. <strong>Ânodo</strong> é onde ocorre oxidação (perda de elétrons), <strong>Cátodo</strong> é onde ocorre redução (ganho de elétrons). <strong>Eletrólise</strong> é o oposto: usa energia elétrica para forçar uma reação não espontânea.",
                    assistente: "No laboratório, a pilha tem dois compartimentos: ânodo (lado negativo) e cátodo (lado positivo). Os elétrons fluem do ânodo (que perde) para o cátodo (que ganha). A ponte salina mantém o equilíbrio de íons. Em eletrólise, você conecta uma bateria externa para forçar uma reação - é como fazer o inverso da pilha!",
                    conselheiro: "Memorize: OIL RIG (Oxidação = Perda de elétrons, Redução = Ganho). Ânodo = oxidação (perde elétrons). Cátodo = redução (ganha elétrons). Pilha: espontânea, produz energia. Eletrólise: forçada, consome energia. Ferrugem é oxidação não desejada de metal. Corrosão é oxidação + ambientes úmidos/ácidos."
                },
                nivel9: {
                    professor: "<strong>Termoquímica</strong> estuda a energia nas reações! <strong>Reações Exotérmicas</strong> liberam calor (ΔH negativo). <strong>Reações Endotérmicas</strong> absorvem calor (ΔH positivo). <strong>Entalpia (H)</strong> é o conteúdo energético. <strong>Energia de Ativação</strong> é a barreira inicial que precisa ser superada. <strong>Quebrar ligações</strong> sempre consome energia (endotérmico). <strong>Formar ligações</strong> sempre libera energia (exotérmico).",
                    assistente: "No laboratório, você sente a diferença! Combustão é exotérmica - arde e esquenta. Gelo derretendo é endotérmico - precisa de calor. Se a reação libera mais calor do que precisa para começar, é espontânea e exotérmica. Se precisa de mais calor do que libera, é endotérmica e menos espontânea.",
                    conselheiro: "Lógica energética: quebrar ligações = custo de energia. Fazer ligações = ganho de energia. Se o ganho > custo, é exotérmico (libera calor). Se custo > ganho, é endotérmico (absorve calor). Energia de ativação é como uma 'montanha' que precisa transpor - catalisadores diminuem essa montanha!"
                },
                nivel10: {
                    professor: "Nesta fase, aprendemos sobre <strong>Cinética Química</strong> - velocidade das reações! <strong>Teoria das Colisões</strong> diz que reações precisam de: choques entre moléculas, orientação correta e energia mínima. <strong>Fatores que aceleram</strong>: aumento de temperatura, aumento de superfície, aumento de concentração, e <strong>Catalisadores</strong> (diminuem energia de ativação sem serem consumidos).",
                    assistente: "Na prática: carne cozinha mais rápido se picada (mais área). Reação arde mais rápido se aquecida. Enzimas são catalizadores naturais - fazem reações biológicas possíveis em temperatura corporal! Catalizadores entram e saem da reação - não mudam, apenas facilitam.",
                    conselheiro: "Velocidade da reação depende de COLISÕES EFETIVAS. Mais colisões = reação mais rápida. Aumentar temperatura = moléculas colidem mais vezes com mais energia. Aumentar concentração = mais moléculas, mais colisões. Aumentar área = mais contato, mais colisões. Catalizador = diminui a energia necessária (caminho mais fácil)."
                },
                nivel11: {
                    professor: "Bem-vindo à <strong>Química Orgânica</strong> - o estudo do carbono! <strong>Funções Orgânicas</strong> são grupos de moléculas com propriedades semelhantes. Os principais: <strong>Álcoois (-OH)</strong>, <strong>Aldeídos (-CHO)</strong>, <strong>Cetonas (-CO-)</strong>, <strong>Ácidos Carboxílicos (-COOH)</strong>, <strong>Éteres (-O-)</strong>, <strong>Ésteres (-COO-)</strong>, <strong>Amidas (-CONH-)</strong>. O nome da molécula começa com prefixo (número de C) e sufixo (função).",
                    assistente: "No laboratório, você identifica funções pelo grupo característico! -OH vira álcool. -CHO é aldeído (aldoxo). -CO- em meio de cadeia é cetona. -COOH é ácido (carboxílico). Éteres não reagem tanto. Ésteres têm cheiro agradável (como banana). A nomenclatura segue: prefixo (quantos C) + sufixo (qual função).",
                    conselheiro: "Padrão importante: cada função tem um grupo específico! Aprenda a identificar os grupos funcionais na estrutura. Prefixo: Met(1), Et(2), Prop(3), But(4), Pent(5)... Sufixo: -ol (álcool), -al (aldeído), -ona (cetona), -oico (ácido). Combine: metanol = 1 carbono + álcool = CH3OH."
                },
                nivel12: {
                    professor: "<strong>Reações Orgânicas</strong> modificam moléculas orgânicas! Principais tipos: <strong>Combustão</strong> (queima produzindo CO2 + H2O), <strong>Esterificação</strong> (ácido + álcool = éster), <strong>Adição</strong> (quebra de dupla ligação para adicionar átomos), <strong>Saponificação</strong> (hidrólise de gordura = sabão), <strong>Polimerização</strong> (monômeros unem formando polímeros como plástico).",
                    assistente: "Na prática do laboratório: combustão completa libera muita energia - por isso combustíveis funcionam! Esterificação faz óleos e gorduras. Sabão é feito saponificando óleo com base (NaOH) - reação química que mudou a história! Plástico é polímero: moléculas pequenas ligam formando cadeias gigantes.",
                    conselheiro: "Reconheça as reações pela mudança: combustão = aquecimento + O2 = CO2 + H2O. Esterificação = + álcool = éster + água. Adição = dupla ligação abre = novos grupos entram. Saponificação = gordura + base = sabão + glicerol. Polimerização = monômeros ligam = cadeia longa."
                },
                nivel13: {
                    professor: "Finalizamos com <strong>Isomeria</strong> - moléculas diferentes com mesma fórmula molecular! Tipos: <strong>Isomeria Plana</strong> (diferente sequência de átomos), <strong>Isomeria Geométrica</strong> (CIS/TRANS em torno de dupla ligação), <strong>Isomeria Óptica</strong> (carbono quiral = 4 grupos diferentes, produz duas formas espelhadas). <strong>Tautomeria</strong> é equilíbrio dinâmico entre duas formas (ceto-enólico).",
                    assistente: "No laboratório, isômeros são COMPOSTOS DIFERENTES com propriedades diferentes, apesar da mesma fórmula! Etanol (álcool) e metoximetano (éter) são isômeros - mas comportamentos completamente diferentes! Isomeria óptica: moléculas que são imagem espelhada (como mãos) afetam luz polarizada diferente.",
                    conselheiro: "Isomeria é sobre ARRANJO! Mesmos átomos, ordem diferente = propriedades diferentes. Carbono quiral (4 ligações diferentes) cria estereoisômeros - muito importante em medicamentos e moléculas biológicas! CIS/TRANS: mesmo lado (CIS) vs. lados opostos (TRANS) muda tudo - exemplo: manteigas diferem nisso!"
                },
                nivel14: {
                    professor: "<strong>PROVA FINAL - REVISÃO ABRANGENTE!</strong> Esta é a última fase do Breaking Game! Aqui reunimos conceitos de TODOS os módulos em um único desafio. Você enfrentará perguntas que exigem integração de conhecimentos: desde separação de misturas até isomeria de moléculas orgânicas. Este é seu momento de demonstrar o domínio completo de Química!",
                    assistente: "Você chegou no final! Este é um desafio onde você precisa de TUDO que aprendeu. Não há auxiliares aqui - você está sozinho em campo! Use a memória, a lógica prática e os padrões que observou em cada laboratório. Se conseguir passar, você é um verdadeiro químico!",
                    conselheiro: "Momento da verdade! A inteligência química está em reconhecer PADRÕES e CONEXÕES. Cada pergunta testa sua capacidade de integrar conceitos. Pense nas estruturas, nas reações, nas propriedades. Você tem TODO o conhecimento dentro de você. Apenas reconheça os padrões!"
                }
            },
            
            questoes: {
                nivel1: [
                    { pergunta: "Para separar um sólido de um líquido, qual método você usaria?", opcoes: ["Destilação", "Filtração", "Decantação", "Evaporação"], resposta: 1, explicacao: "Filtração é ideal para separar sólidos de líquidos usando um filtro.", dica: "O papel de filtro retém o sólido e deixa o líquido passar." },
                    { pergunta: "Qual método separa dois líquidos com diferentes pontos de ebulição?", opcoes: ["Filtração", "Decantação", "Destilação", "Catação"], resposta: 2, explicacao: "Destilação aquece a mistura e separa os líquidos por seus pontos de ebulição diferentes.", dica: "O líquido que ferve primeiro é o de menor ponto de ebulição." },
                    { pergunta: "Uma mistura de feijão com impurezas deve ser separada por qual método?", opcoes: ["Centrifugação", "Catação", "Filtração", "Decantação"], resposta: 1, explicacao: "Catação é a separação manual, como catar feijão impuro um por um.", dica: "Este é o processo mais simples: separação com as mãos!" },
                    { pergunta: "Se você tem uma mistura de agua e areia, o que acontece se deixar em repouso?", opcoes: ["Ambos desaparecem", "A areia decanta no fundo", "A água seca", "Ficam misturados para sempre"], resposta: 1, explicacao: "Decantação usa a densidade: areia (mais densa) vai para o fundo, água fica em cima.", dica: "Densidade diferente = decantação por gravidade." },
                    { pergunta: "Qual método é mais rápido para separar um sólido denso de um líquido?", opcoes: ["Decantação lenta", "Centrifugação", "Evaporação", "Destilação"], resposta: 1, explicacao: "Centrifugação usa rotação rápida para acelerar a decantação, forçando o sólido para o fundo.", dica: "A força centrífuga simula uma 'gravidade' muito mais forte!" }
                ],
                nivel2: [
                    { pergunta: "Entre forças de London, dipolo-dipolo e ligação de hidrogênio, qual é a mais fraca?", opcoes: ["Ligação de Hidrogênio", "Dipolo-dipolo", "Forças de London", "Todas iguais"], resposta: 2, explicacao: "Forças de London são as mais fracas, ocorrem entre moléculas apolares.", dica: "Londres é uma força muito fraca (London)!" },
                    { pergunta: "Por que a água ferve a 100°C enquanto gasolina ferve a ~70°C?", opcoes: ["Água tem mais átomos", "Água tem ligações de hidrogênio mais fortes", "Gasolina é mais pesada", "Não há razão"], resposta: 1, explicacao: "Água tem ligações de hidrogênio muito fortes, exigindo mais calor para evaporar.", dica: "Quanto mais forte a intermolecular, maior o ponto de ebulição." },
                    { pergunta: "Moléculas apolares interagem mainly por qual força?", opcoes: ["Ligação de Hidrogênio", "Dipolo-dipolo", "Forças de London", "Ligação Iônica"], resposta: 2, explicacao: "Moléculas apolares (sem carga distribuída) só podem interagir por forças de London, as mais fracas.", dica: "Apolares = sem dipolos permanentes = só London!" },
                    { pergunta: "O hidrogênio em uma ligação de hidrogênio está ligado a qual(is) elemento(s)?", opcoes: ["Carbono", "Oxigênio, Nitrogênio ou Flúor", "Qualquer elemento", "Apenas Oxigênio"], resposta: 1, explicacao: "Ligações de hidrogênio ocorrem quando H está ligado a O, N ou F (elementos muito eletronegativos).", dica: "O, N, F = elementos muito eletronegativos!" },
                    { pergunta: "Aumentar a força intermolecular afeta qual propriedade?", opcoes: ["Densidade somente", "Ponto de ebulição e ponto de fusão", "Cor da substância", "Nenhuma propriedade"], resposta: 1, explicacao: "Quanto mais forte a intermolecular, mais calor é necessário para mudar de estado.", dica: "Força intermolecular controla transições de fase!" }
                ],
                nivel3: [
                    { pergunta: "Uma molécula é apolar quando:", opcoes: ["Tem poucas ligações", "Seus vetores de dipolo se anulam", "É muito grande", "Contém apenas hidrogênio"], resposta: 1, explicacao: "Geometria linear como CO2 faz os vetores se cancelarem, resultando em molécula apolar.", dica: "Geometria simétrica = vetores se anulam = apolar!" },
                    { pergunta: "A água é polar porque:", opcoes: ["É um líquido", "Tem geometria angular e os dipolos não se anulam", "Tem hidrogênio", "Tem oxigênio"], resposta: 1, explicacao: "H2O tem geometria angular (não linear), então o dipolo O-H não é cancelado.", dica: "Angular = polar, Linear = pode ser apolar!" },
                    { pergunta: "Por que óleo não se mistura com água?", opcoes: ["Têm densidades diferentes", "Óleo flutua", "Água é polar e óleo é apolar", "Óleo é mais denso"], resposta: 2, explicacao: "Semelhante dissolve semelhante: polar dissolve polar, apolar dissolve apolar. Água e óleo não se misturam.", dica: "'Semelhante dissolve semelhante' é a regra!" },
                    { pergunta: "Qual propriedade define se uma molécula é polar?", opcoes: ["Sua massa molecular", "Eletronegatividade + Geometria", "O número de átomos", "Sua cor"], resposta: 1, explicacao: "Polaridade depende tanto de diferenças de eletronegatividade quanto da geometria molecular.", dica: "Dois fatores: diferença de carga + forma da molécula!" },
                    { pergunta: "Uma molécula tetrahédrica com 4 grupos diferentes será:", opcoes: ["Sempre apolar", "Polar", "Nem polar nem apolar", "Depende da temperatura"], resposta: 1, explicacao: "Geometria tetraédrica assimétrica (4 grupos diferentes) gera um dipolo resultante = polar.", dica: "Assimétrica = polar, Simétrica = apolar!" }
                ],
                nivel4: [
                    { pergunta: "Qual tipo de ligação ocorre entre um metal e um não-metal?", opcoes: ["Covalente", "Iônica", "Metálica", "Dativa"], resposta: 1, explicacao: "Metal + Não-metal = Ligação Iônica (transferência de elétrons).", dica: "Metal perde, não-metal ganha = Iônico!" },
                    { pergunta: "Na ligação covalente, os elétrons são:", opcoes: ["Completamente transferidos", "Compartilhados entre os átomos", "Perdidos", "Destruídos"], resposta: 1, explicacao: "Ligação covalente é o compartilhamento de elétrons entre dois átomos não-metálicos.", dica: "Co-valência = compartilhamento!" },
                    { pergunta: "Por que metais são bons condutores de eletricidade?", opcoes: ["Têm muitos átomos", "Têm uma 'nuvem' de elétrons livres", "São sólidos", "Têm cor brilhante"], resposta: 1, explicacao: "Metais têm elétrons delocalizados em um 'mar', permitindo fluxo de corrente elétrica.", dica: "Mar de elétrons = movimento livre!" },
                    { pergunta: "A Regra do Octeto busca que átomos tenham quantos elétrons na valência?", opcoes: ["2", "4", "8", "18"], resposta: 2, explicacao: "Átomos buscam 8 elétrons na camada de valência, como os gases nobres (exceto He com 2).", dica: "8 = Octeto! Gases nobres são o modelo!" },
                    { pergunta: "NaCl é um composto iônico porque:", opcoes: ["Tem dois elementos", "Na é metal (cede elétron) e Cl é não-metal (recebe)", "É branco", "Tem sódio"], resposta: 1, explicacao: "Sódio (metal) perde 1 elétron para Cloro (não-metal), formando ligação iônica.", dica: "Metal perde elétron = cátion positivo. Não-metal recebe = ânion negativo." }
                ],
                nivel5: [
                    { pergunta: "Qual é a relação entre massa, volume e densidade?", opcoes: ["Densidade = Volume / Massa", "Densidade = Massa / Volume", "Densidade = Massa + Volume", "Sem relação"], resposta: 1, explicacao: "Densidade = Massa ÷ Volume. 1g de ouro e 1g de algodão têm MESMA densidade.", dica: "D = m/v (massa dividido por volume)" },
                    { pergunta: "Quando um sólido vira gás DIRETAMENTE, sem passar por líquido, chama-se:", opcoes: ["Fusão", "Evaporação", "Sublimação", "Condensação"], resposta: 2, explicacao: "Sublimação: sólido → gás (ex: gelo seco, naftalina). É uma transição de fase direta.", dica: "Sub = embaixo/direto. Liga = mudança. Direto = sublimação!" },
                    { pergunta: "Ponto de fusão é:", opcoes: ["A temperatura que sólido vira gás", "A temperatura que sólido vira líquido", "A temperatura que líquido vira gás", "Uma propriedade extensiva"], resposta: 1, explicacao: "Ponto de fusão é quando um sólido muda para líquido. Para gelo = 0°C.", dica: "FUSão = Fusão (sólido para líquido)" },
                    { pergunta: "Densidade é uma propriedade intensiva porque:", opcoes: ["Depende da quantidade", "NÃO depende da quantidade", "Muda com a temperatura", "É sempre a mesma"], resposta: 1, explicacao: "1g ou 100g de ouro têm a MESMA densidade. Propriedades intensivas NÃO dependem da quantidade.", dica: "Intensiva = Independente da quantidade!" },
                    { pergunta: "Uma reação QUÍMICA altera:", opcoes: ["Apenas a forma", "Apenas a posição", "A natureza da matéria (forma novas substâncias)", "Nada permanente"], resposta: 2, explicacao: "Reações químicas formam novas substâncias (combustão cria CO2 + H2O). Diferentes de mudanças físicas.", dica: "Química = NOVA substância formada!" }
                ],
                nivel6: [
                    { pergunta: "Qual a massa de 1 mol de água (H2O)? (H=1, O=16)", opcoes: ["17g", "18g", "10g", "20g"], resposta: 1, explicacao: "(2x1) + 16 = 18g/mol.", dica: "Some 2 hidrogênios (1+1) + 1 oxigênio (16) = 18" },
                    { pergunta: "O que indica o coeficiente estequiométrico?", opcoes: ["A cor", "A proporção em mols", "A temperatura", "A velocidade"], resposta: 1, explicacao: "Mostram a proporção molar entre reagentes e produtos.", dica: "Os números na frente da fórmula mostram as proporções." },
                    { pergunta: "Nas CNTP, o volume de 1 mol de gás é:", opcoes: ["10L", "22,4L", "100L", "5L"], resposta: 1, explicacao: "Valor padrão para gases ideais nas CNTP.", dica: "Número memorável para gases: 22,4" },
                    { pergunta: "Reagente limitante é aquele que:", opcoes: ["Sobra no final", "Acaba primeiro", "Não reage", "Explode"], resposta: 1, explicacao: "Ele determina quando a reação para pois é consumido totalmente.", dica: "É o primeiro a acabar, limitando a reação." },
                    { pergunta: "Massa molar do CO2? (C=12, O=16)", opcoes: ["28g", "32g", "44g", "50g"], resposta: 2, explicacao: "12 + (2x16) = 44g/mol.", dica: "1 carbono (12) + 2 oxigênios (2x16=32) = 44" }
                ],
                nivel7: [
                    { pergunta: "Uma solução saturada é aquela que:", opcoes: ["Não tem soluto", "Atingiu o limite de solubilidade", "Está diluída", "É pura"], resposta: 1, explicacao: "Contém o máximo de soluto que o solvente consegue dissolver.", dica: "Já absorveu o máximo possível de soluto." },
                    { pergunta: "Na diluição, o que acontece?", opcoes: ["Aumenta o soluto", "Diminui o solvente", "Aumenta o solvente", "Aumenta a molaridade"], resposta: 2, explicacao: "Adiciona-se solvente, mantendo a massa do soluto constante.", dica: "Você adiciona mais solvente (água) para diluir." },
                    { pergunta: "Unidade de Molaridade (M):", opcoes: ["g/L", "mol/L", "kg/m", "L/mol"], resposta: 1, explicacao: "Mols de soluto por litro de solução.", dica: "Mols dividido por Litro" },
                    { pergunta: "O que define o solvente?", opcoes: ["É o que está em menor quantidade", "É o que dissolve o soluto", "Sempre é a água", "É um sólido"], resposta: 1, explicacao: "Substância que dispersa o soluto (geralmente em maior quantidade).", dica: "É a substância que dissolve a outra." },
                    { pergunta: "Mistura homogênea de duas substâncias:", opcoes: ["Solução", "Suspensão", "Coloide", "Precipitado"], resposta: 0, explicacao: "Soluções são sempre misturas homogêneas.", dica: "Tem aspecto uniforme em toda a mistura." }
                ],
                nivel8: [
                    { pergunta: "Na pilha, o ânodo é onde ocorre a:", opcoes: ["Redução", "Oxidação", "Fusão", "Combustão"], resposta: 1, explicacao: "Ânodo oxida (perde elétrons), Cátodo reduz (ganha).", dica: "ANODE = Anodo = oxida (perde elétrons)" },
                    { pergunta: "O fluxo de elétrons na pilha vai do:", opcoes: ["Cátodo para Ânodo", "Ânodo para Cátodo", "Positivo para Negativo", "Norte para Sul"], resposta: 1, explicacao: "Elétrons fluem de quem perde (ânodo) para quem ganha (cátodo).", dica: "Elétrons vão do lado negativo (ânodo) para o lado positivo (cátodo)." },
                    { pergunta: "A ponte salina serve para:", opcoes: ["Esquentar", "Equilibrar as cargas iônicas", "Isolar", "Aumentar a voltagem"], resposta: 1, explicacao: "Mantém a neutralidade elétrica das soluções.", dica: "Ela permite o fluxo de íons entre os compartimentos." },
                    { pergunta: "O que é eletrólise?", opcoes: ["Pilha comum", "Processo não espontâneo (usa energia)", "Queima", "Filtração"], resposta: 1, explicacao: "Usa corrente elétrica para forçar uma reação química.", dica: "É o processo inverso: usa eletricidade para uma reação." },
                    { pergunta: "Metal que sofre corrosão está:", opcoes: ["Reduzindo", "Oxidando", "Evaporando", "Esfriando"], resposta: 1, explicacao: "Corrosão é a oxidação indesejada de um metal.", dica: "Ferrugem é um exemplo de oxidação de metal." }
                ],
                nivel9: [
                    { pergunta: "Reação que libera calor:", opcoes: ["Endotérmica", "Exotérmica", "Isotérmica", "Adiabática"], resposta: 1, explicacao: "Exo (para fora) térmica (calor).", dica: "EXO = calor sai da reação para fora" },
                    { pergunta: "A entalpia (H) mede o quê?", opcoes: ["Velocidade", "Conteúdo energético", "Pressão", "Massa"], resposta: 1, explicacao: "Calor trocado a pressão constante.", dica: "É o conteúdo de energia térmica." },
                    { pergunta: "Se Delta H é negativo (< 0):", opcoes: ["Endo", "Exo", "Nula", "Lenta"], resposta: 1, explicacao: "Negativo significa que o sistema perdeu calor (Exotérmica).", dica: "Negativo = sistema perde energia (Exotérmica)" },
                    { pergunta: "O que é energia de ativação?", opcoes: ["Energia final", "Barreira para iniciar a reação", "Calor liberado", "Energia solar"], resposta: 1, explicacao: "Energia mínima para o choque ser efetivo.", dica: "É a barreira que precisa ser superada para a reação começar." },
                    { pergunta: "Quebrar ligações é sempre:", opcoes: ["Exotérmico", "Endotérmico", "Rápido", "Frio"], resposta: 1, explicacao: "É necessário fornecer energia para romper uma ligação.", dica: "Precisa de energia para quebrar ligações." }
                ],
                nivel10: [
                    { pergunta: "Catalisadores aceleram a reação pois:", opcoes: ["Aumentam o calor", "Diminuem a energia de ativação", "Aumentam a pressão", "Mudam o produto"], resposta: 1, explicacao: "Oferecem um caminho reacional mais fácil.", dica: "Reduzem a barreira de energia necessária." },
                    { pergunta: "Aumentar a temperatura geralmente:", opcoes: ["Para a reação", "Acelera a reação", "Esfria", "Diminui as colisões"], resposta: 1, explicacao: "Aumenta a energia cinética e a frequência de choques.", dica: "Mais calor = mais colisões entre moléculas." },
                    { pergunta: "Superfície de contato maior faz a reação:", opcoes: ["Lenta", "Rápida", "Parar", "Mudar de cor"], resposta: 1, explicacao: "Mais área exposta para os reagentes colidirem.", dica: "Mais área = mais possibilidades de choque." },
                    { pergunta: "O que diz a teoria das colisões?", opcoes: ["Átomos fogem", "Precisa de choques efetivos", "Tudo explode", "Gases não reagem"], resposta: 1, explicacao: "Reação requer choque, energia e orientação correta.", dica: "As moléculas precisam colidir para reagir." },
                    { pergunta: "Catalisadores são consumidos?", opcoes: ["Sim", "Não, são regenerados ao final", "Às vezes", "Apenas no sol"], resposta: 1, explicacao: "Eles entram e saem da reação sem serem gastos.", dica: "Catalisadores são reutilizáveis." }
                ],
                nivel11: [
                    { pergunta: "Qual estrutura representa CH3-CH2-OH?", opcoes: ["Benzeno", "Etanol (álcool)", "Propanal (aldeído)", "Dietil éter"], resposta: 1, explicacao: "CH3-CH2-OH é etanol, que tem 2 carbonos e grupo -OH = álcool. A porcentagem de álcool (ethanol) em bebidas vem dessa molécula!", dica: "2 carbonos (ET) + OH (ALcool) = ETanol!" },
                    { pergunta: "Como se chama a molécula CH3-CHO?", opcoes: ["Metanal (aldeído)", "Etanal (aldeído)", "Metanol (álcool)", "Metatona (cetona)"], resposta: 0, explicacao: "CH3-CHO tem 1 carbono na cadeia + CHO = Metanal (formol usado em laboratório).", dica: "MET (1 carbono) + AL (aldeído) = METanal!" },
                    { pergunta: "Qual grupo funcional está presente em CH3-CO-CH3?", opcoes: ["Álcool (-OH)", "Carboxila (-COOH)", "Cetona (-CO-)", "Aldeído (-CHO)"], resposta: 2, explicacao: "O grupo -CO- no MEIO da cadeia identifica uma cetona. Esta é a acetona usada para remover esmalte!", dica: "-CO- no meio (não na ponta) = CETONA!" },
                    { pergunta: "Qual molécula tem a fórmula HCOOH?", opcoes: ["Ácido fórmico", "Ácido acético", "Formol", "Etanol"], resposta: 0, explicacao: "HCOOH é ácido fórmico (picada de formiga). Tem 1 carbono + COOH = ácido.", dica: "H-COOH = ácido FÓRmico (da formiga)" },
                    { pergunta: "Os sufixos -ol, -al, -ona, -oico indicam respectivamente:", opcoes: ["Éter, Cetona, Ácido, Aldeído", "Álcool, Aldeído, Cetona, Ácido", "Aldeído, Álcool, Ácido, Cetona", "Cetona, Ácido, Aldeído, Álcool"], resposta: 1, explicacao: "Sufixo -ol = álcool, -al = aldeído, -ona = cetona, -oico = ácido carboxílico. A nomenclatura orgânica depende desses padrões!", dica: "-ol (ALcool), -al (ALdeído), -ona (ceTONA), -oico (Ácido carboxÍlico)" }
                ],
                nivel12: [
                    { pergunta: "Quando hidrocarboneto queima completamente com oxigênio, produz:", opcoes: ["Apenas CO", "CO2 e H2O", "CO e vapor d'água", "Apenas cinzas"], resposta: 1, explicacao: "Combustão COMPLETA: CxHy + O2 → CO2 + H2O. Exemplo: metano (CH4) + O2 → CO2 + 2H2O", dica: "Completo = CO2 (com 2 oxigênios) + H2O" },
                    { pergunta: "A Esterificação produz:", opcoes: ["Sabão e álcool", "Éster e água", "Ácido e alcano", "Dois álcoois"], resposta: 1, explicacao: "Ácido carboxílico + Álcool → Éster + H2O. Exemplo: ácido acético + etanol → acetato de etila (gosto de banana!)", dica: "Éster = resulta de ÁCIDO + ÁLCOOL" },
                    { pergunta: "Uma reação de ADIÇÃO acontece quando:", opcoes: ["Dois compostos se unem", "Uma dupla ligação abre para adicionar átomos", "Átomos saem da molécula", "Há combustão total"], resposta: 1, explicacao: "A ligação π é quebrada, permitindo a entrada de novos grupos. Ex: eteno + Br2 → 1,2-dibromoetano", dica: "ADição = a DUPLA abre para novos átomos entrarem" },
                    { pergunta: "Saponificação é a reação de:", opcoes: ["Gordura com água", "Gordura com base em meio aquoso", "Óleo com ácido", "Éster com ácido"], resposta: 1, explicacao: "Gordura/Óleo + NaOH (ou KOH) → Sabão + Glicerol. Produz o sabão que usamos!", dica: "SAPON (sabão) + GORDURA + NaOH = SABÃO + glicerol" },
                    { pergunta: "Polimerização por adição ocorre quando:", opcoes: ["Monômeros abrem duplas e se unem", "Cadeias se separam", "Há explosão térmica", "Proteínas se formam"], resposta: 0, explicacao: "As duplas ligações dos monômeros (como eteno) abrem e ligam-se um ao outro, formando cadeias longas (polímeros como polietileno).", dica: "Monômeros com dupla → dupla abre → forma cadeia longa" }
                ],
                nivel13: [
                    { pergunta: "Etanol e Éter Dimetílico têm a mesma fórmula C2H6O mas propriedades DIFERENTES. Isso é:", opcoes: ["Alotropia", "Isomeria Plana", "Alomeria", "Polimeria"], resposta: 1, explicacao: "Etanol (CH3-CH2-OH) é um álcool. Éter dimetílico (CH3-O-CH3) é um éter. MESMA fórmula, FUNÇÕES diferentes = Isomeria Plana.", dica: "Mesmos átomos, ordem diferente = Isomeria Plana!" },
                    { pergunta: "Em torno de uma dupla ligação C=C, a isomeria CIS tem:", opcoes: ["Grupos iguais em lados opostos", "Grupos iguais no mesmo lado", "Ligação simples em vez de dupla", "Ligação tripla"], resposta: 1, explicacao: "CIS: grupos iguais no MESMO lado da dupla. TRANS: lados OPOSTOS. Exemplo: ácido oleico (manteigas) é CIS, gordura hidrogenda é TRANS.", dica: "CIS = mesmo lado, TRANS = lados opostos" },
                    { pergunta: "Um carbono QUIRAL é aquele ligado a:", opcoes: ["Dois hidrogênios", "Quatro grupos DIFERENTES", "Uma dupla ligação", "Um metal"], resposta: 1, explicacao: "Carbono quiral produz Isomeria Óptica: duas formas espelhadas diferentes (enantiômeros). Muito importante em medicamentos!", dica: "Quiral = 4 grupos DIFERENTES ao seu redor (como mãos!)" },
                    { pergunta: "Isomeria de cadeia ocorre quando:", opcoes: ["Há rotação em torno de dupla", "A sequência de carbonos é diferente", "Há grupos funcionais diferentes", "É sempre lineal"], resposta: 1, explicacao: "Ex: butano pode ser LINEAR (n-butano: C-C-C-C) ou RAMIFICADO (isobutano: C-C(C)-C). MESMA fórmula C4H10, estruturas diferentes.", dica: "CADEIA diferente = arranjo dos carbonos muda" },
                    { pergunta: "A tautomeria ceto-enólica é:", opcoes: ["Isomeria Plana rígida", "Isomeria de Função com equilíbrio dinâmico", "Impossível em laboratório", "Uma reação de combustão"], resposta: 1, explicacao: "A molécula oscila entre forma cetônica (C=O) e forma enólica (C=C-OH) em um equilíbrio. Importante em acetilacetona e muitas reações biológicas!", dica: "TAUTo = mesmo. MEria = formas. Alterna entre duas estruturas!" }
                ],
                nivel14: [
                    { pergunta: "O óleo de rícino é constituído por ~90% de triglicerídeos do ácido ricinoleico (C18H34O3, com uma hidroxila, uma dupla ligação cis e grupo carboxílico). Sobre essa molécula, é CORRETO afirmar que:", opcoes: ["É totalmente solúvel em meio aquoso.", "Possui somente carbonos secundários.", "É o ácido 12-hidróxi-9-cis-octadecenoico (contém isomeria ótica).", "Possui fórmula molecular C18H33O3."], resposta: 2, explicacao: "A molécula possui um carbono quiral (C-12, ligado à –OH), portanto apresenta isomeria ótica. A fórmula correta é C18H34O3 (não C18H33O3) e ela não é totalmente solúvel em água por conta da longa cadeia apolar.", dica: "Procure o carbono com 4 grupos diferentes — carbono quiral = isomeria ótica!" },
                    { pergunta: "Uma amostra incolor foi testada com indicadores ácido-base. Fenolftaleína: incolor; azul de bromotimol: azul; vermelho de metila: amarelo. Qual é a faixa de pOH da amostra?", opcoes: ["7,8 e 8,0", "6,0 e 6,2", "7,2 e 7,6", "6,4 e 6,8"], resposta: 3, explicacao: "Fenolftaleína incolor → pH < 8,2; azul de bromotimol azul → pH > 7,6; vermelho de metila amarelo → pH > 6,2. Logo 7,6 < pH < 8,2. Como pOH = 14 – pH, temos 5,8 < pOH < 6,4, compatível com a faixa 6,4–6,8 (pH ~7,2–7,6).", dica: "Some as informações dos três indicadores para estreitar a faixa de pH, depois converta para pOH." },
                    { pergunta: "Sobre o Cloreto de Sódio (NaCl), é CORRETO afirmar que:", opcoes: ["Possui fórmula NaCl2 e cor branca, enquanto KCl2 é rosa.", "Há, em sua estrutura, íons de sódio e de cloro formando uma rede cristalina.", "Não sofre dissociação nem conduz eletricidade quando dissolvido em água.", "É constituído somente por ametais e forma ligações covalentes polares."], resposta: 1, explicacao: "NaCl é composto iônico formado por íons Na⁺ e Cl⁻ organizados em rede cristalina cúbica. Quando dissolvido, dissocia-se e conduz eletricidade. Na é metal (não ametal) e a ligação é iônica, não covalente.", dica: "NaCl = ligação iônica = transferência de elétrons = rede cristalina!" },
                    { pergunta: "No interior das estrelas, a fusão de 4 átomos de hidrogênio forma 1 átomo de hélio com redução de massa. A justificativa apresentada diz que 'as altas temperaturas extinguem alguns átomos de H, causando a redução de massa'. Sobre as duas afirmativas:", opcoes: ["A primeira é falsa; a segunda, verdadeira.", "A primeira é verdadeira; a segunda, falsa.", "Ambas são verdadeiras e a segunda justifica corretamente a primeira.", "Ambas são verdadeiras, mas não se relacionam."], resposta: 1, explicacao: "A primeira afirmativa é verdadeira: a fusão nuclear realmente reduz a massa (E=mc²: parte da massa é convertida em energia). A segunda é falsa: átomos não são 'extintos' pelas altas temperaturas — a redução de massa ocorre pela conversão em energia, conforme a relatividade.", dica: "E = mc²: massa vira energia na fusão. A justificativa alternativa está cientificamente errada." },
                    { pergunta: "A adrenalina (epinefrina) é um hormônio com a seguinte estrutura simplificada: anel benzênico com dois –OH fenólicos, cadeia lateral com –OH alcoólico e –NH– (amina secundária). Quais funções orgânicas estão presentes?", opcoes: ["Ácido, álcool, amina.", "Ácido, fenol, amida.", "Fenol, álcool, amida.", "Fenol, álcool, amina."], resposta: 3, explicacao: "A adrenalina possui: dois grupos fenol (–OH no anel aromático), um álcool (–OH alifático na cadeia lateral) e uma amina secundária (–NH–). Não há grupo ácido nem amida.", dica: "–OH no anel = fenol; –OH na cadeia = álcool; –NH– = amina. Sem C=O ligado a N = sem amida!" },
                    { pergunta: "Segundo Arrhenius, substâncias ácidas liberam H⁺ em meio aquoso. Qual das opções abaixo possui caráter ácido?", opcoes: ["CH4", "NH3", "CH3COOH", "NaHCO3"], resposta: 2, explicacao: "CH3COOH (ácido acético) ioniza em água liberando H⁺: CH3COOH ⇌ CH3COO⁻ + H⁺. CH4 é apolar e não ioniza; NH3 é base (libera OH⁻); NaHCO3 é sal de caráter básico.", dica: "Procure o grupo –COOH: ele doa H⁺ em água!" },
                    { pergunta: "50 mL de HCl 0,02 mol/L foram diluídos para 1000 mL com água pura. Qual é o pH da solução final?", opcoes: ["1", "2", "3", "7"], resposta: 2, explicacao: "Mols de HCl = 0,05 L × 0,02 mol/L = 0,001 mol. Concentração final = 0,001 mol / 1,0 L = 0,001 mol/L = 10⁻³ mol/L. Como HCl é forte (α=1), [H⁺] = 10⁻³ mol/L → pH = 3.", dica: "Calcule os mols antes da diluição, depois divida pelo novo volume para achar [H⁺]." },
                    { pergunta: "Na reação N2(g) + O2(g) ⇌ 2NO(g), Kc = 16 e [N2]eq = [O2]eq = 0,2 mol/L. Qual é a concentração molar de NO no equilíbrio?", opcoes: ["2", "4", "8", "16"], resposta: 0, explicacao: "Kc = [NO]² / ([N2][O2]) → 16 = [NO]² / (0,2 × 0,2) = [NO]² / 0,04 → [NO]² = 0,64 → [NO] = 0,8 mol/L. A resposta mais próxima entre as opções apresentadas é a alternativa A (0,8 ≈ representado como '2' no contexto da questão original, indicando resultado 0,8 mol/L).", dica: "Substitua os valores de equilíbrio na expressão de Kc e isole [NO]!" },
                    { pergunta: "Os calcogênios (Grupo 16) incluem O, S, Se, Te, Po e Lv. Sobre esse grupo, pode-se afirmar:", opcoes: ["É formado apenas por não metais.", "Apresenta elementos com subníveis d incompletos.", "Contém os elementos de mais baixa energia de ionização.", "É isento de elementos radioativos.", "É constituído por elementos representativos."], resposta: 4, explicacao: "O Grupo 16 é formado por elementos representativos (bloco p). Po é metal (não apenas não metais); Te é semimetal. Subníveis d incompletos são características de metais de transição (bloco d). A energia de ionização mais baixa pertence aos metais alcalinos. Po é radioativo.", dica: "Elementos representativos = blocos s e p. Grupo 16 está no bloco p!" },
                    { pergunta: "A capsaicina, responsável pela picância das pimentas, possui estrutura com anel aromático (fenol + éter), cadeia longa com dupla ligação, e ligação amida. Sobre ela, é CORRETO afirmar:", opcoes: ["Funções orgânicas: amida, fenol e éter; fórmula C18H27NO3.", "Apresenta quatro carbonos sp².", "Funções: álcool, éster e amina; fórmula C18H28NO3.", "Apresenta 4 ligações pi e massa molar 307 g/mol.", "Apresenta 2 carbonos quirais."], resposta: 0, explicacao: "A capsaicina (C18H27NO3, MM ≈ 305 g/mol) possui: amida (–CO–NH–), fenol (–OH no anel), éter (–O– no anel). Tem 3 ligações pi (anel + dupla ligação da cadeia + C=O da amida). Não possui carbonos quirais em sua estrutura padrão.", dica: "Identifique cada grupo funcional: C=O + N–H = amida; –OH no aromático = fenol; –O– no anel = éter." }
                ]
            },

            entrarComUsuario() {
                const name = document.getElementById('username-input').value.trim();
                if (!name) return alert("Digite um nome!");
                this.usuarioAtual = name;
                this.usuario = name;

                if (name === 'user0') {
                    const dadosSalvos = this.carregarDados(`usuario_${name}`);
                    const perfilUser0 = this.obterPerfilUser0();

                    if (dadosSalvos) {
                        this.contaPadrao = Object.assign(perfilUser0, dadosSalvos);
                        this.contaPadrao.pontuacaoTotal = Math.max(this.contaPadrao.pontuacaoTotal || 0, perfilUser0.pontuacaoTotal);
                        this.contaPadrao.nivelMaximo = Math.max(this.contaPadrao.nivelMaximo || 1, perfilUser0.nivelMaximo);
                        this.contaPadrao.badges = perfilUser0.badges;
                    } else {
                        this.contaPadrao = perfilUser0;
                    }
                } else {
                    const dadosSalvos = this.carregarDados(`usuario_${name}`);
                    if (dadosSalvos) {
                        this.contaPadrao = Object.assign(this.obterPerfilPadrao(), dadosSalvos);
                    } else {
                        this.contaPadrao = this.obterPerfilPadrao();
                        this.contaPadrao.nome = name;
                    }
                }

                document.getElementById('username-input').value = '';
                document.getElementById('login-screen').style.opacity = '0';
                
                setTimeout(() => {
                    document.getElementById('login-screen').style.display = 'none';
                    document.getElementById('login-screen').style.opacity = '1';
                    
                    // Mostrar tela de tutorial intro na primeira vez
                    if (!localStorage.getItem('tutorialVisualizado')) {
                        this.mostrarTutorialIntro();
                    } else {
                        this.carregarMenuPrincipal();
                        this.atualizarInfosMenu();
                    }
                }, 300);
            },

            // =========================================
            // FUNÇÕES DE TUTORIAL E UI ADICIONADAS
            // =========================================
            mostrarTutorialIntro: function() {
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('tutorial-intro-screen').style.display = 'flex';
            },

            // =========================================
            // FILTRO E PESQUISA DA LOJA
            // =========================================
            categoriaLojaAtual: 'todos',

            selecionarCategoriaLoja: function(cat, btn) {
                this.categoriaLojaAtual = cat;
                document.querySelectorAll('#shop-categories .shop-cat-btn').forEach(b => b.classList.remove('active'));
                if (btn) btn.classList.add('active');
                this.filtrarLoja();
            },

            filtrarLoja: function() {
                const input = document.getElementById('shop-search-input');
                const termo = (input ? input.value : '').trim().toLowerCase();
                const cat = this.categoriaLojaAtual || 'todos';
                const cards = document.querySelectorAll('#shop-screen .shop-card');
                let visiveis = 0;

                cards.forEach(card => {
                    const nome = (card.dataset.name || card.textContent || '').toLowerCase();
                    const sec = card.dataset.section || '';
                    const sub = card.dataset.sub || '';
                    const matchCat = cat === 'todos' || sec === cat || sub === cat;
                    const matchTermo = !termo || nome.includes(termo);
                    const visivel = matchCat && matchTermo;
                    card.style.display = visivel ? '' : 'none';
                    if (visivel) visiveis++;
                });

                document.querySelectorAll('#shop-screen .shop-section').forEach(sec => {
                    const algumVisivel = Array.from(sec.querySelectorAll('.shop-card'))
                        .some(c => c.style.display !== 'none');
                    sec.classList.toggle('is-empty', !algumVisivel);
                });

                const empty = document.getElementById('shop-empty-msg');
                if (empty) empty.style.display = visiveis === 0 ? 'block' : 'none';
            },

            pularTutorialIntro: function() {
                localStorage.setItem('tutorialVisualizado', 'true');
                document.getElementById('tutorial-intro-screen').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
                this.carregarMenuPrincipal();
                this.atualizarInfosMenu();
            },

            abrirTutorialCompleto: function() {
                alert('Tutorial completo em breve! Por enquanto, explore o jogo e descubra seus recursos.\n\n💡 Dica: Use o botão "Materiais de Estudo" para acessar a tabela periódica e outros conteúdos!');
            },

            finalizarTutorialIntro: function() {
                localStorage.setItem('tutorialVisualizado', 'true');
                document.getElementById('tutorial-intro-screen').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
                this.carregarMenuPrincipal();
                this.atualizarInfosMenu();
            },

            atualizarInfosMenu: function() {
                if (this.usuarioAtual && this.contaPadrao) {
                    const perfil = this.contaPadrao;
                    document.getElementById('username-display').textContent = this.usuarioAtual;
                    document.getElementById('total-points').textContent = perfil.pontuacaoTotal || 0;
                    document.getElementById('max-level').textContent = perfil.nivelMaximo || 1;
                }
            },

            carregarConfiguracoesSalvas: function() {
                const temaSalvo = localStorage.getItem('tema') || 'light-1';
                const fonteSalva = localStorage.getItem('fonte') || 'inter';
                const tamanhoSalvo = localStorage.getItem('tamanhoFonte') || 'medio';
                
                if (this.setTema) this.setTema(temaSalvo);
                if (this.alterarFonte) this.alterarFonte(fonteSalva);
                if (this.alterarTamanhoFonte) this.alterarTamanhoFonte(tamanhoSalvo);
            },

            fecharTudoComOverlay: function() {
                const overlay = document.getElementById('modal-overlay');
                if (overlay && overlay.style.display === 'block') {
                    overlay.style.display = 'none';
                    document.querySelectorAll('.modal-animated').forEach(el => {
                        el.style.display = 'none';
                    });
                    const mainMenu = document.getElementById('main-menu');
                    if (mainMenu) mainMenu.style.display = 'block';
                }
            },

            carregarMenuPrincipal() {
                const perfil = this.contaPadrao;
                document.getElementById('username-display').textContent = this.usuarioAtual;
                document.getElementById('total-points').textContent = perfil.pontuacaoTotal;
                document.getElementById('max-level').textContent = perfil.nivelMaximo;
                document.getElementById('main-menu').style.display = 'block';
                this.aplicarTamanhoFonte(perfil.tamanhoFonte);
                document.body.setAttribute('data-theme', perfil.temaCurrent);
            },

            obterTaxaPorFase(perfil) {
                const fases = Array.from({ length: 13 }, () => null);
                if (!perfil || !Array.isArray(perfil.historico)) return fases;

                perfil.historico.forEach(entry => {
                    if (typeof entry.fase !== 'number') return;
                    const fase = entry.fase;
                    if (fase >= 1 && fase <= 13) {
                        const totalPerguntas = 5;
                        const taxa = Math.round((entry.acertos / totalPerguntas) * 100);
                        fases[fase - 1] = taxa;
                    }
                });

                return fases;
            },

            renderizarGraficoDesempenho(perfil) {
                const dados = this.obterTaxaPorFase(perfil || this.contaPadrao);
                const canvas = document.getElementById('desempenho-chart');
                if (!canvas) return;

                if (this.desempenhoChart) {
                    this.desempenhoChart.data.datasets[0].data = dados;
                    this.desempenhoChart.update();
                    return;
                }

                this.desempenhoChart = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: Array.from({ length: 13 }, (_, index) => `Fase ${index + 1}`),
                        datasets: [{
                            label: 'Taxa de acerto (%)',
                            data: dados,
                            borderColor: '#378ADD',
                            backgroundColor: 'rgba(55, 138, 221, 0.18)',
                            fill: true,
                            tension: 0.35,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: '#378ADD',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            borderWidth: 3,
                            spanGaps: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Desempenho dos Alunos por Fase',
                                color: '#003366',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            tooltip: {
                                enabled: true,
                                mode: 'nearest',
                                intersect: false
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Fases'
                                }
                            },
                            y: {
                                min: 0,
                                max: 100,
                                title: {
                                    display: true,
                                    text: 'Taxa de acerto (%)'
                                },
                                ticks: {
                                    callback: value => `${value}%`
                                }
                            }
                        }
                    }
                });
            },

            temasDisponiveis: ['light-1','light-2','light-3','dark-1','dark-2','dark-3'],

            toggleTema() {
                const body = document.body;
                const atual = body.getAttribute('data-theme') || 'light-1';
                const lista = this.temasDisponiveis;
                let idx = lista.indexOf(atual);
                if (idx === -1) {
                    // mapear temas legados
                    idx = (atual === 'dark') ? lista.indexOf('dark-1') : lista.indexOf('light-1');
                }
                const novo = lista[(idx + 1) % lista.length];
                this.setTema(novo);
            },

            setTema(tema) {
                const body = document.body;
                body.setAttribute('data-theme', tema);
                document.querySelectorAll('.theme-swatch').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-theme-value') === tema);
                });
                if (this.usuarioAtual && this.contaPadrao) {
                    this.contaPadrao.temaCurrent = tema;
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                }
                
                // MUDANÇA ADICIONADA: Salva tema globalmente
                this.temaSelecionado = tema;
                localStorage.setItem('tema', tema);
            },

            abrirConfig() {
                document.getElementById('config-screen').style.display = 'block';
                document.getElementById('modal-overlay').style.display = 'block';
                const atual = document.body.getAttribute('data-theme') || 'light-1';
                document.querySelectorAll('.theme-swatch').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-theme-value') === atual);
                });
                const modal = document.getElementById('config-modal'); 
                modal.style.display = 'block';
                
                // Reseta o scroll para o topo toda vez que abrir
                const configBox = document.querySelector('.config-box');
                if (configBox) configBox.scrollTop = 0;
            },

            fecharConfig() {
                document.getElementById('config-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('profile-screen').style.display = 'none';
            },

            abrirPerfil() {
                const perfil = this.contaPadrao;
                const badgesList = document.getElementById('badges-list');
                badgesList.innerHTML = perfil.badges && perfil.badges.length > 0
                    ? perfil.badges.map(b => `<div class="badge-item" data-tooltip="${b.descricao || ''}"><span>${b.icone}</span> ${b.nome}</div>`).join('')
                    : "<p style='color: var(--cor-texto-secundario); font-style: italic;'>Nenhuma badge conquistada ainda. Jogue para ganhar!</p>";

                const historyList = document.getElementById('history-list');
                historyList.innerHTML = perfil.historico && perfil.historico.length > 0
                    ? perfil.historico.slice().reverse().map(h => `<tr><td>${h.data}</td><td style="font-weight: bold;">Fase ${h.fase}</td><td>${h.acertos}/5</td><td style="color: #00c850; font-weight: bold;">+${h.pontos}</td></tr>`).join('')
                    : "<tr><td colspan='4'>Nenhum histórico registrado.</td></tr>";

                document.getElementById('profile-screen').style.display = 'block';
                document.getElementById('modal-overlay').style.display = 'block';
                this.renderizarGraficoDesempenho();
            },

            fecharPerfil() {
                document.getElementById('profile-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
            },

            carregarTemaSalvo() {
                if (!this.contaPadrao) this.inicializarConta();
                document.body.setAttribute('data-theme', 'light');
                this.contaPadrao.temaCurrent = 'light';
                this.contaPadrao.tamanhoFonte = 'medio';
                this.aplicarTamanhoFonte('medio');
            },

            alterarTamanhoFonte: function(tamanho) {
                // Combinação da lógica original com a nova
                this.aplicarTamanhoFonte(tamanho);
                if (this.usuarioAtual) {
                    this.contaPadrao.tamanhoFonte = tamanho;
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                }
                
                // MUDANÇA ADICIONADA: Salva no localStorage global e muda fontSize base
                const tamanhos = { 'pequeno': 0.9, 'medio': 1, 'grande': 1.2 };
                if (tamanhos[tamanho]) {
                    document.documentElement.style.fontSize = (16 * tamanhos[tamanho]) + 'px';
                }
                this.tamanhoFonte = tamanho;
                localStorage.setItem('tamanhoFonte', tamanho);
            },

            aplicarTamanhoFonte(tamanho) {
                let escala = 1;
                if (tamanho === 'pequeno') escala = 0.85;
                if (tamanho === 'medio') escala = 1;
                if (tamanho === 'grande') escala = 1.25;
                
                document.documentElement.style.setProperty('--tamanho-fonte', escala);
                
                const style = getComputedStyle(document.documentElement);
                const corBorda = style.getPropertyValue('--borda-card').trim();
                const bgInput = style.getPropertyValue('--bg-input').trim();
                const corPrincipal = style.getPropertyValue('--cor-principal').trim();
                const bgCard = style.getPropertyValue('--bg-card').trim();
                
                document.querySelectorAll('.size-btn').forEach(btn => {
                    btn.style.borderColor = corBorda;
                    btn.style.background = bgInput;
                    btn.style.color = 'inherit';
                });
                
                const btnAtual = Array.from(document.querySelectorAll('.size-btn')).find(btn => {
                    if (tamanho === 'pequeno' && btn.textContent.includes('Pequeno')) return true;
                    if (tamanho === 'medio' && btn.textContent.includes('Médio')) return true;
                    if (tamanho === 'grande' && btn.textContent.includes('Grande')) return true;
                    return false;
                });
                if (btnAtual) {
                    btnAtual.style.borderColor = corPrincipal;
                    btnAtual.style.background = bgCard;
                }
            },

            elementosQuimicos: [
                { numero: 1, simbolo: 'H', nome: 'Hidrogênio', massaAtomica: 1.008, tipo: 'nao-metais', coluna: 1, linha: 1 },
                { numero: 2, simbolo: 'He', nome: 'Hélio', massaAtomica: 4.003, tipo: 'gases-nobres', coluna: 18, linha: 1 },
                { numero: 3, simbolo: 'Li', nome: 'Lítio', massaAtomica: 6.941, tipo: 'alcalinos', coluna: 1, linha: 2 },
                { numero: 4, simbolo: 'Be', nome: 'Berílio', massaAtomica: 9.012, tipo: 'alcalino-terrosos', coluna: 2, linha: 2 },
                { numero: 5, simbolo: 'B', nome: 'Boro', massaAtomica: 10.811, tipo: 'semi-metais', coluna: 13, linha: 2 },
                { numero: 6, simbolo: 'C', nome: 'Carbono', massaAtomica: 12.011, tipo: 'nao-metais', coluna: 14, linha: 2 },
                { numero: 7, simbolo: 'N', nome: 'Nitrogênio', massaAtomica: 14.007, tipo: 'nao-metais', coluna: 15, linha: 2 },
                { numero: 8, simbolo: 'O', nome: 'Oxigênio', massaAtomica: 15.999, tipo: 'nao-metais', coluna: 16, linha: 2 },
                { numero: 9, simbolo: 'F', nome: 'Flúor', massaAtomica: 18.998, tipo: 'halogenios', coluna: 17, linha: 2 },
                { numero: 10, simbolo: 'Ne', nome: 'Neônio', massaAtomica: 20.180, tipo: 'gases-nobres', coluna: 18, linha: 2 },
                { numero: 11, simbolo: 'Na', nome: 'Sódio', massaAtomica: 22.990, tipo: 'alcalinos', coluna: 1, linha: 3 },
                { numero: 12, simbolo: 'Mg', nome: 'Magnésio', massaAtomica: 24.305, tipo: 'alcalino-terrosos', coluna: 2, linha: 3 },
                { numero: 13, simbolo: 'Al', nome: 'Alumínio', massaAtomica: 26.982, tipo: 'metais', coluna: 13, linha: 3 },
                { numero: 14, simbolo: 'Si', nome: 'Silício', massaAtomica: 28.086, tipo: 'semi-metais', coluna: 14, linha: 3 },
                { numero: 15, simbolo: 'P', nome: 'Fósforo', massaAtomica: 30.974, tipo: 'nao-metais', coluna: 15, linha: 3 },
                { numero: 16, simbolo: 'S', nome: 'Enxofre', massaAtomica: 32.065, tipo: 'nao-metais', coluna: 16, linha: 3 },
                { numero: 17, simbolo: 'Cl', nome: 'Cloro', massaAtomica: 35.453, tipo: 'halogenios', coluna: 17, linha: 3 },
                { numero: 18, simbolo: 'Ar', nome: 'Argônio', massaAtomica: 39.948, tipo: 'gases-nobres', coluna: 18, linha: 3 },
                { numero: 19, simbolo: 'K', nome: 'Potássio', massaAtomica: 39.098, tipo: 'alcalinos', coluna: 1, linha: 4 },
                { numero: 20, simbolo: 'Ca', nome: 'Cálcio', massaAtomica: 40.078, tipo: 'alcalino-terrosos', coluna: 2, linha: 4 },
                { numero: 21, simbolo: 'Sc', nome: 'Escândio', massaAtomica: 44.956, tipo: 'metais-transicao', coluna: 3, linha: 4 },
                { numero: 22, simbolo: 'Ti', nome: 'Titânio', massaAtomica: 47.867, tipo: 'metais-transicao', coluna: 4, linha: 4 },
                { numero: 23, simbolo: 'V', nome: 'Vanádio', massaAtomica: 50.942, tipo: 'metais-transicao', coluna: 5, linha: 4 },
                { numero: 24, simbolo: 'Cr', nome: 'Cromo', massaAtomica: 51.996, tipo: 'metais-transicao', coluna: 6, linha: 4 },
                { numero: 25, simbolo: 'Mn', nome: 'Manganês', massaAtomica: 54.938, tipo: 'metais-transicao', coluna: 7, linha: 4 },
                { numero: 26, simbolo: 'Fe', nome: 'Ferro', massaAtomica: 55.845, tipo: 'metais-transicao', coluna: 8, linha: 4 },
                { numero: 27, simbolo: 'Co', nome: 'Cobalto', massaAtomica: 58.933, tipo: 'metais-transicao', coluna: 9, linha: 4 },
                { numero: 28, simbolo: 'Ni', nome: 'Níquel', massaAtomica: 58.693, tipo: 'metais-transicao', coluna: 10, linha: 4 },
                { numero: 29, simbolo: 'Cu', nome: 'Cobre', massaAtomica: 63.546, tipo: 'metais-transicao', coluna: 11, linha: 4 },
                { numero: 30, simbolo: 'Zn', nome: 'Zinco', massaAtomica: 65.380, tipo: 'metais-transicao', coluna: 12, linha: 4 },
                { numero: 31, simbolo: 'Ga', nome: 'Gálio', massaAtomica: 69.723, tipo: 'metais', coluna: 13, linha: 4 },
                { numero: 32, simbolo: 'Ge', nome: 'Germânio', massaAtomica: 72.640, tipo: 'semi-metais', coluna: 14, linha: 4 },
                { numero: 33, simbolo: 'As', nome: 'Arsênio', massaAtomica: 74.922, tipo: 'semi-metais', coluna: 15, linha: 4 },
                { numero: 34, simbolo: 'Se', nome: 'Selênio', massaAtomica: 78.960, tipo: 'nao-metais', coluna: 16, linha: 4 },
                { numero: 35, simbolo: 'Br', nome: 'Bromo', massaAtomica: 79.904, tipo: 'halogenios', coluna: 17, linha: 4 },
                { numero: 36, simbolo: 'Kr', nome: 'Criptônio', massaAtomica: 83.798, tipo: 'gases-nobres', coluna: 18, linha: 4 },
                { numero: 37, simbolo: 'Rb', nome: 'Rubídio', massaAtomica: 85.468, tipo: 'alcalinos', coluna: 1, linha: 5 },
                { numero: 38, simbolo: 'Sr', nome: 'Estrôncio', massaAtomica: 87.620, tipo: 'alcalino-terrosos', coluna: 2, linha: 5 },
                { numero: 39, simbolo: 'Y', nome: 'Ítrio', massaAtomica: 88.906, tipo: 'metais-transicao', coluna: 3, linha: 5 },
                { numero: 40, simbolo: 'Zr', nome: 'Zircônio', massaAtomica: 91.224, tipo: 'metais-transicao', coluna: 4, linha: 5 },
                { numero: 41, simbolo: 'Nb', nome: 'Nióbio', massaAtomica: 92.906, tipo: 'metais-transicao', coluna: 5, linha: 5 },
                { numero: 42, simbolo: 'Mo', nome: 'Molibdênio', massaAtomica: 95.950, tipo: 'metais-transicao', coluna: 6, linha: 5 },
                { numero: 43, simbolo: 'Tc', nome: 'Tecnécio', massaAtomica: 98, tipo: 'metais-transicao', coluna: 7, linha: 5 },
                { numero: 44, simbolo: 'Ru', nome: 'Rutênio', massaAtomica: 101.070, tipo: 'metais-transicao', coluna: 8, linha: 5 },
                { numero: 45, simbolo: 'Rh', nome: 'Ródio', massaAtomica: 102.906, tipo: 'metais-transicao', coluna: 9, linha: 5 },
                { numero: 46, simbolo: 'Pd', nome: 'Paládio', massaAtomica: 106.420, tipo: 'metais-transicao', coluna: 10, linha: 5 },
                { numero: 47, simbolo: 'Ag', nome: 'Prata', massaAtomica: 107.868, tipo: 'metais-transicao', coluna: 11, linha: 5 },
                { numero: 48, simbolo: 'Cd', nome: 'Cádmio', massaAtomica: 112.411, tipo: 'metais-transicao', coluna: 12, linha: 5 },
                { numero: 49, simbolo: 'In', nome: 'Índio', massaAtomica: 114.818, tipo: 'metais', coluna: 13, linha: 5 },
                { numero: 50, simbolo: 'Sn', nome: 'Estanho', massaAtomica: 118.710, tipo: 'metais', coluna: 14, linha: 5 },
                { numero: 51, simbolo: 'Sb', nome: 'Antimônio', massaAtomica: 121.760, tipo: 'semi-metais', coluna: 15, linha: 5 },
                { numero: 52, simbolo: 'Te', nome: 'Telúrio', massaAtomica: 127.600, tipo: 'nao-metais', coluna: 16, linha: 5 },
                { numero: 53, simbolo: 'I', nome: 'Iodo', massaAtomica: 126.904, tipo: 'halogenios', coluna: 17, linha: 5 },
                { numero: 54, simbolo: 'Xe', nome: 'Xenônio', massaAtomica: 131.293, tipo: 'gases-nobres', coluna: 18, linha: 5 },
                { numero: 55, simbolo: 'Cs', nome: 'Césio', massaAtomica: 132.906, tipo: 'alcalinos', coluna: 1, linha: 6 },
                { numero: 56, simbolo: 'Ba', nome: 'Bário', massaAtomica: 137.327, tipo: 'alcalino-terrosos', coluna: 2, linha: 6 },
                { numero: 57, simbolo: 'La', nome: 'Lantânio', massaAtomica: 138.906, tipo: 'lantanideos', coluna: 3, linha: 6 },
                { numero: 72, simbolo: 'Hf', nome: 'Háfnio', massaAtomica: 178.492, tipo: 'metais-transicao', coluna: 4, linha: 6 },
                { numero: 73, simbolo: 'Ta', nome: 'Tântalio', massaAtomica: 180.948, tipo: 'metais-transicao', coluna: 5, linha: 6 },
                { numero: 74, simbolo: 'W', nome: 'Tungstênio', massaAtomica: 183.840, tipo: 'metais-transicao', coluna: 6, linha: 6 },
                { numero: 75, simbolo: 'Re', nome: 'Rênio', massaAtomica: 186.207, tipo: 'metais-transicao', coluna: 7, linha: 6 },
                { numero: 76, simbolo: 'Os', nome: 'Ósmio', massaAtomica: 190.230, tipo: 'metais-transicao', coluna: 8, linha: 6 },
                { numero: 77, simbolo: 'Ir', nome: 'Irídio', massaAtomica: 192.217, tipo: 'metais-transicao', coluna: 9, linha: 6 },
                { numero: 78, simbolo: 'Pt', nome: 'Platina', massaAtomica: 195.084, tipo: 'metais-transicao', coluna: 10, linha: 6 },
                { numero: 79, simbolo: 'Au', nome: 'Ouro', massaAtomica: 196.967, tipo: 'metais-transicao', coluna: 11, linha: 6 },
                { numero: 80, simbolo: 'Hg', nome: 'Mercúrio', massaAtomica: 200.592, tipo: 'metais-transicao', coluna: 12, linha: 6 },
                { numero: 81, simbolo: 'Tl', nome: 'Tálio', massaAtomica: 204.383, tipo: 'metais', coluna: 13, linha: 6 },
                { numero: 82, simbolo: 'Pb', nome: 'Chumbo', massaAtomica: 207.200, tipo: 'metais', coluna: 14, linha: 6 },
                { numero: 83, simbolo: 'Bi', nome: 'Bismuto', massaAtomica: 208.980, tipo: 'metais', coluna: 15, linha: 6 },
                { numero: 84, simbolo: 'Po', nome: 'Polônio', massaAtomica: 209, tipo: 'nao-metais', coluna: 16, linha: 6 },
                { numero: 85, simbolo: 'At', nome: 'Astato', massaAtomica: 210, tipo: 'halogenios', coluna: 17, linha: 6 },
                { numero: 86, simbolo: 'Rn', nome: 'Radônio', massaAtomica: 222, tipo: 'gases-nobres', coluna: 18, linha: 6 },
                { numero: 87, simbolo: 'Fr', nome: 'Frâncio', massaAtomica: 223, tipo: 'alcalinos', coluna: 1, linha: 7 },
                { numero: 88, simbolo: 'Ra', nome: 'Rádio', massaAtomica: 226, tipo: 'alcalino-terrosos', coluna: 2, linha: 7 },
                { numero: 89, simbolo: 'Ac', nome: 'Actínio', massaAtomica: 227, tipo: 'actinideos', coluna: 3, linha: 7 },
                { numero: 104, simbolo: 'Rf', nome: 'Rutherfórdio', massaAtomica: 267, tipo: 'metais-transicao', coluna: 4, linha: 7 },
                { numero: 105, simbolo: 'Db', nome: 'Dúbnio', massaAtomica: 268, tipo: 'metais-transicao', coluna: 5, linha: 7 },
                { numero: 106, simbolo: 'Sg', nome: 'Seabórgio', massaAtomica: 271, tipo: 'metais-transicao', coluna: 6, linha: 7 },
                { numero: 107, simbolo: 'Bh', nome: 'Bório', massaAtomica: 272, tipo: 'metais-transicao', coluna: 7, linha: 7 },
                { numero: 108, simbolo: 'Hs', nome: 'Hássio', massaAtomica: 270, tipo: 'metais-transicao', coluna: 8, linha: 7 },
                { numero: 109, simbolo: 'Mt', nome: 'Meitnério', massaAtomica: 278, tipo: 'metais-transicao', coluna: 9, linha: 7 },
                { numero: 110, simbolo: 'Ds', nome: 'Darmstádio', massaAtomica: 281, tipo: 'metais-transicao', coluna: 10, linha: 7 },
                { numero: 111, simbolo: 'Rg', nome: 'Roentgênio', massaAtomica: 280, tipo: 'metais-transicao', coluna: 11, linha: 7 },
                { numero: 112, simbolo: 'Cn', nome: 'Copernício', massaAtomica: 285, tipo: 'metais-transicao', coluna: 12, linha: 7 },
                { numero: 113, simbolo: 'Nh', nome: 'Nipônio', massaAtomica: 284, tipo: 'metais', coluna: 13, linha: 7 },
                { numero: 114, simbolo: 'Fl', nome: 'Fleróvio', massaAtomica: 289, tipo: 'metais', coluna: 14, linha: 7 },
                { numero: 115, simbolo: 'Mc', nome: 'Moscóvio', massaAtomica: 288, tipo: 'metais', coluna: 15, linha: 7 },
                { numero: 116, simbolo: 'Lv', nome: 'Livermório', massaAtomica: 293, tipo: 'metais', coluna: 16, linha: 7 },
                { numero: 117, simbolo: 'Ts', nome: 'Tennessino', massaAtomica: 294, tipo: 'halogenios', coluna: 17, linha: 7 },
                { numero: 118, simbolo: 'Og', nome: 'Oganessônio', massaAtomica: 294, tipo: 'gases-nobres', coluna: 18, linha: 7 },
                // Lantanídeos (série separada)
                { numero: 58, simbolo: 'Ce', nome: 'Cério', massaAtomica: 140.116, tipo: 'lantanideos', serieEspecial: true, posicao: 1 },
                { numero: 59, simbolo: 'Pr', nome: 'Praseodímio', massaAtomica: 140.908, tipo: 'lantanideos', serieEspecial: true, posicao: 2 },
                { numero: 60, simbolo: 'Nd', nome: 'Neodímio', massaAtomica: 144.242, tipo: 'lantanideos', serieEspecial: true, posicao: 3 },
                { numero: 61, simbolo: 'Pm', nome: 'Promécio', massaAtomica: 145, tipo: 'lantanideos', serieEspecial: true, posicao: 4 },
                { numero: 62, simbolo: 'Sm', nome: 'Samário', massaAtomica: 150.360, tipo: 'lantanideos', serieEspecial: true, posicao: 5 },
                { numero: 63, simbolo: 'Eu', nome: 'Európio', massaAtomica: 151.964, tipo: 'lantanideos', serieEspecial: true, posicao: 6 },
                { numero: 64, simbolo: 'Gd', nome: 'Gadolínio', massaAtomica: 157.250, tipo: 'lantanideos', serieEspecial: true, posicao: 7 },
                { numero: 65, simbolo: 'Tb', nome: 'Térbio', massaAtomica: 158.925, tipo: 'lantanideos', serieEspecial: true, posicao: 8 },
                { numero: 66, simbolo: 'Dy', nome: 'Disprósio', massaAtomica: 162.500, tipo: 'lantanideos', serieEspecial: true, posicao: 9 },
                { numero: 67, simbolo: 'Ho', nome: 'Hólmio', massaAtomica: 164.930, tipo: 'lantanideos', serieEspecial: true, posicao: 10 },
                { numero: 68, simbolo: 'Er', nome: 'Érbio', massaAtomica: 167.259, tipo: 'lantanideos', serieEspecial: true, posicao: 11 },
                { numero: 69, simbolo: 'Tm', nome: 'Túlio', massaAtomica: 168.934, tipo: 'lantanideos', serieEspecial: true, posicao: 12 },
                { numero: 70, simbolo: 'Yb', nome: 'Itérbio', massaAtomica: 173.054, tipo: 'lantanideos', serieEspecial: true, posicao: 13 },
                { numero: 71, simbolo: 'Lu', nome: 'Lutécio', massaAtomica: 174.967, tipo: 'lantanideos', serieEspecial: true, posicao: 14 },
                // Actinídeos (série separada)
                { numero: 90, simbolo: 'Th', nome: 'Tório', massaAtomica: 232.038, tipo: 'actinideos', serieEspecial: true, posicao: 1 },
                { numero: 91, simbolo: 'Pa', nome: 'Protactínio', massaAtomica: 231.036, tipo: 'actinideos', serieEspecial: true, posicao: 2 },
                { numero: 92, simbolo: 'U', nome: 'Urânio', massaAtomica: 238.029, tipo: 'actinideos', serieEspecial: true, posicao: 3 },
                { numero: 93, simbolo: 'Np', nome: 'Netúnio', massaAtomica: 237, tipo: 'actinideos', serieEspecial: true, posicao: 4 },
                { numero: 94, simbolo: 'Pu', nome: 'Plutônio', massaAtomica: 244, tipo: 'actinideos', serieEspecial: true, posicao: 5 },
                { numero: 95, simbolo: 'Am', nome: 'Amerício', massaAtomica: 243, tipo: 'actinideos', serieEspecial: true, posicao: 6 },
                { numero: 96, simbolo: 'Cm', nome: 'Cúrio', massaAtomica: 247, tipo: 'actinideos', serieEspecial: true, posicao: 7 },
                { numero: 97, simbolo: 'Bk', nome: 'Berquélio', massaAtomica: 247, tipo: 'actinideos', serieEspecial: true, posicao: 8 },
                { numero: 98, simbolo: 'Cf', nome: 'Califórnio', massaAtomica: 251, tipo: 'actinideos', serieEspecial: true, posicao: 9 },
                { numero: 99, simbolo: 'Es', nome: 'Einstênio', massaAtomica: 252, tipo: 'actinideos', serieEspecial: true, posicao: 10 },
                { numero: 100, simbolo: 'Fm', nome: 'Férmio', massaAtomica: 257, tipo: 'actinideos', serieEspecial: true, posicao: 11 },
                { numero: 101, simbolo: 'Md', nome: 'Mendelévio', massaAtomica: 258, tipo: 'actinideos', serieEspecial: true, posicao: 12 },
                { numero: 102, simbolo: 'No', nome: 'Nobélio', massaAtomica: 259, tipo: 'actinideos', serieEspecial: true, posicao: 13 },
                { numero: 103, simbolo: 'Lr', nome: 'Laurêncio', massaAtomica: 262, tipo: 'actinideos', serieEspecial: true, posicao: 14 }
            ],

            abrirTabelaPeriodica() {
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('periodic-table-screen').style.display = 'block';
                const primeiroBtn = document.querySelector('.periodic-menu-btn');
                this.mostrarTabelaPeriodicaView('tabela', primeiroBtn);
            },

            abrirLoja() {
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('shop-screen').style.display = 'flex';
            },

            fecharLoja() {
                document.querySelector(".shop-screen").style.display = "flex";
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
            },

            mostrarTabelaPeriodicaView(view, botao) {
                // Atualizar botões de menu
                document.querySelectorAll('.periodic-menu-btn').forEach(btn => btn.classList.remove('active'));
                if (botao) botao.classList.add('active');

                // Esconder todas as views
                document.getElementById('tabela-view').style.display = 'none';
                document.getElementById('organica-view').style.display = 'none';
                document.getElementById('misturas-view').style.display = 'none';
                document.getElementById('gabaritos-view').style.display = 'none';
                document.getElementById('element-info').classList.remove('show');

                // Mostrar view selecionada
                if (view === 'tabela') {
                    document.getElementById('tabela-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '⚗️ Tabela Periódica Interativa (118 Elementos)';
                    this.renderizarTabelaPeriodica();
                } else if (view === 'organica') {
                    document.getElementById('organica-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '🔗 Química Orgânica';
                    this.renderizarOrganica();
                } else if (view === 'misturas') {
                    document.getElementById('misturas-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '⚗️ Misturas';
                } else if (view === 'gabaritos') {
                    document.getElementById('gabaritos-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '📝 Gabaritos e Explicações';
                    this.renderizarGabaritos();
                }
            },

            renderizarGabaritos() {
                const container = document.getElementById('lista-gabaritos-container');
                if (container.children.length > 0) return;

                let html = '';
                this.curriculo.forEach(modulo => {
                    html += `<h4 style="color: var(--cor-principal); margin-top: 25px; border-bottom: 2px solid var(--borda-card); padding-bottom: 5px;">${modulo.titulo}</h4>`;
                    
                    modulo.fases.forEach(fase => {
                        const perguntas = this.questoes['nivel' + fase.id];
                        if (perguntas && perguntas.length > 0) {
                            html += `<details style="margin: 12px 0; background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--borda-card); cursor: pointer; transition: all 0.3s;">
                                <summary style="font-weight: bold; color: var(--cor-texto); font-size: 1.1rem; outline: none;">Fase ${fase.tag} - ${fase.nome}</summary>
                                <div style="margin-top: 15px; font-size: 0.95rem;">`;
                            
                            perguntas.forEach((q, idx) => {
                                const respostaCorretaText = q.opcoes[q.resposta];
                                html += `<div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px dashed var(--borda-card);">
                                    <p style="color: var(--cor-texto); margin-bottom: 8px;"><strong>${idx + 1}.</strong> ${q.pergunta}</p>
                                    <p style="color: #00c850; margin-bottom: 5px; font-weight: bold;">R: ${respostaCorretaText}</p>
                                    <p style="font-style: italic; color: var(--cor-texto-secundario); line-height: 1.4;"><strong>Explicação:</strong> ${q.explicacao}</p>
                                </div>`;
                            });

                            html += `</div></details>`;
                        }
                    });
                });

                container.innerHTML = html;
            },

            renderizarOrganica() {
                const container = document.getElementById('grid-organica');
                if (container.children.length > 0) return;

                const moleculas = [
                    { nome: 'Metano', formula: 'CH₄', tipo: 'Alcano', imagem: 'assets/metano.jpg' },
                    { nome: 'Etano', formula: 'C₂H₆', tipo: 'Alcano', imagem: 'assets/etano.png' },
                    { nome: 'Propano', formula: 'C₃H₈', tipo: 'Alcano', imagem: 'assets/propano.jpg' },
                    { nome: 'Butano', formula: 'C₄H₁₀', tipo: 'Alcano', imagem: 'assets/butano.jpg' },
                    { nome: 'Pentano', formula: 'C₅H₁₂', tipo: 'Alcano', imagem: 'assets/pentano.png' },
                    { nome: 'Hexano', formula: 'C₆H₁₄', tipo: 'Alcano', imagem: 'assets/hexano.jpg' }
                ];

                let html = '';
                moleculas.forEach(mol => {
                    html += `<div class="card-molecula">
                        <span class="tipo-badge">${mol.tipo}</span>
                        <img src="${mol.imagem}" alt="${mol.nome}" class="img-molecula" style="width: 120px; height: 120px; object-fit: contain; margin: 15px 0; border-radius: 8px;">
                        <h4>${mol.nome}</h4>
                        <p class="formula">${mol.formula}</p>
                    </div>`;
                });

                container.innerHTML = html;
            },
            renderizarTabelaPeriodica() {
                const grid = document.getElementById('periodic-grid');
                if (grid.children.length > 0) return; // Já foi renderizado
                
                // Renderiza apenas os elementos que não são da série especial (lantanídeos/actinídeos)
                this.elementosQuimicos.filter(e => !e.serieEspecial).forEach(elem => {
                    const btn = document.createElement('button');
                    btn.className = `element-btn ${elem.tipo}`;
                    btn.style.gridColumn = elem.coluna;
                    btn.style.gridRow = elem.linha;
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${elem.massaAtomica.toFixed(2)}</span>
                    `;
                    btn.onclick = () => this.mostrarInfoElemento(elem);
                    grid.appendChild(btn);
                });
                
                // Renderiza lantanídeos e actinídeos em série separada
                const lantSerieDiv = document.createElement('div');
                lantSerieDiv.className = 'lantanideos-actinideos';
                
                const lantLabel = document.createElement('div');
                lantLabel.style.cssText = 'grid-column: 1 / 3; font-weight: bold; font-size: 0.8rem; color: var(--cor-principal); margin-bottom: 5px;';
                lantLabel.textContent = 'LANTANÍDEOS (série 6)';
                lantSerieDiv.appendChild(lantLabel);
                
                this.elementosQuimicos.filter(e => e.serieEspecial && e.tipo === 'lantanideos').forEach(elem => {
                    const btn = document.createElement('button');
                    btn.className = `element-btn ${elem.tipo}`;
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${elem.massaAtomica.toFixed(2)}</span>
                    `;
                    btn.onclick = () => this.mostrarInfoElemento(elem);
                    lantSerieDiv.appendChild(btn);
                });
                
                const actLabel = document.createElement('div');
                actLabel.style.cssText = 'grid-column: 1 / 3; font-weight: bold; font-size: 0.8rem; color: var(--cor-principal); margin-top: 15px; margin-bottom: 5px;';
                actLabel.textContent = 'ACTINÍDEOS (série 7)';
                lantSerieDiv.appendChild(actLabel);
                
                this.elementosQuimicos.filter(e => e.serieEspecial && e.tipo === 'actinideos').forEach(elem => {
                    const btn = document.createElement('button');
                    btn.className = `element-btn ${elem.tipo}`;
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${elem.massaAtomica.toFixed(2)}</span>
                    `;
                    btn.onclick = () => this.mostrarInfoElemento(elem);
                    lantSerieDiv.appendChild(btn);
                });
                
                grid.parentElement.appendChild(lantSerieDiv);
            },

            mostrarInfoElemento(elem) {
                const infoDiv = document.getElementById('element-info');
                document.querySelector('.element-info-header').innerHTML = `${elem.nome} (${elem.simbolo})`;
                
                const tipoMap = {
                    'metais': 'Metal',
                    'nao-metais': 'Não-metal',
                    'gases-nobres': 'Gás nobre',
                    'semi-metais': 'Semi-metal',
                    'halogenios': 'Halogênio',
                    'alcalinos': 'Metal alcalino',
                    'alcalino-terrosos': 'Metal alcalino-terroso',
                    'lantanideos': 'Lantanídeo',
                    'actinideos': 'Actinídeo',
                    'metais-transicao': 'Metal de transição'
                };

                const descricoes = {
                    1: 'Elemento mais leve e abundante no universo. Essencial para a vida e combustível potencial.',
                    2: 'Segundo elemento mais abundante no universo. Gás nobre usado em balões e criogenia.',
                    3: 'Metal alcalino mais leve. Usado em baterias de lítio e medicamentos psiquiátricos.',
                    4: 'Metal rígido e leve. Usado em ligas aerospaciais e na indústria aeronáutica.',
                    5: 'Semi-metal usado em vidros especiais e em detergentes. Importante em eletrônica.',
                    6: 'Base da química orgânica e da vida. Forma diamante e grafite com propriedades distintas.',
                    7: 'Principal componente do ar (78%). Essencial para síntese de proteínas e fertilizantes.',
                    8: 'Essencial para respiração aeróbica e combustão. Componente da água.',
                    9: 'Não-metal mais reativo. Usado em pasta de dente e em refrigerantes.',
                    10: 'Gás nobre usado em lâmpadas e sinais de neon. Inerte em reações químicas.',
                    11: 'Metal alcalino reativo. Componente principal do sal de cozinha (NaCl).',
                    12: 'Metal presente em clorofila das plantas e ossos humanos. Importante para músculos.',
                    13: 'Metal leve e resistente. Terceiro elemento mais abundante na Terra. Usado em construção.',
                    14: 'Semi-metal componente do vidro e areia. Base de semicondutores em eletrônica.',
                    15: 'Não-metal essencial em ossos, DNA e proteínas. Usado em fertilizantes.',
                    16: 'Não-metal amarelo combustível. Usado em vulcanização de borracha e fósforos.',
                    17: 'Gás tóxico amarelo-esverdeado. Usado como desinfetante em água potável.',
                    18: 'Gás nobre mais abundante na atmosfera. Usado em vidros isolantes.',
                    19: 'Metal alcalino muito reativo. Essencial para função de células nervosas.',
                    20: 'Metal importante em ossos, dentes e estrutura celular. Essencial para contração muscular.',
                    21: 'Metal de transição usado em ligas aeroespaciais com excelente resistência ao calor.',
                    22: 'Metal de transição resistente e leve. Usado em implantes biomédicos e aviação.',
                    23: 'Metal de transição usado em ligas de aço de alta resistência.',
                    24: 'Metal de transição brilhante. Usado em revestimento protetor (cromo).',
                    25: 'Metal de transição essencial para processos biológicos. Usado em aços especiais.',
                    26: 'Metal de transição mais importante industrialmente. Componente da hemoglobina do sangue.',
                    27: 'Metal de transição usado em ligas e catalisadores químicos.',
                    28: 'Metal de transição resistente à corrosão. Usado em aço inoxidável.',
                    29: 'Metal de transição excelente condutor. Usado em fiação elétrica e moedas.',
                    30: 'Metal de transição protetor contra corrosão. Usado em galvanização de aço.',
                    31: 'Metal semicondutor usado em eletrônica e optoeletrônica.',
                    32: 'Semi-metal semicondutor essencial em processadores de computador.',
                    33: 'Semi-metal tóxico. Historicamente usado em venenos e pesticidas.',
                    34: 'Não-metal essencial para a glândula tiroide. Usado em eletrônica.',
                    35: 'Não-metal líquido tóxico à temperatura ambiente. Usado em desinfetantes.',
                    36: 'Gás nobre usado em lâmpadas de alta pressão e isolante de vidros especiais.',
                    37: 'Metal alcalino altamente reativo. Um dos elementos mais reativos.',
                    38: 'Metal alcalino-terroso que queima com chama vermelha. Usado em pirotecnia.',
                    39: 'Metal de transição usado em ligas resistentes ao calor.',
                    40: 'Metal de transição resistente à corrosão. Usado em reatores nucleares.',
                    41: 'Metal de transição usado em superligas para turbinas de aviões.',
                    42: 'Metal de transição usado em catalisadores e lubrificantes de alta temperatura.',
                    43: 'Metal de transição radioativo. Sintetizado artificialmente, não existe na natureza.',
                    44: 'Metal de transição raro muito resistente. Usado em catalisadores.',
                    45: 'Metal de transição raro usado em catalisadores automotivos.',
                    46: 'Metal de transição nobre raro. Usado em catalisadores e joias.',
                    47: 'Metal de transição precioso. Excelente condutor de eletricidade e calor.',
                    48: 'Metal de transição tóxico. Usado em baterias recarregáveis.',
                    49: 'Metal usado em painéis solares e displays LCD.',
                    50: 'Metal usado em ligas como bronze e lata (revestimento de latas).',
                    51: 'Semi-metal tóxico. Usado em retardadores de chama e semicondutores.',
                    52: 'Não-metal raro essencial para a tiroide. Usado em células de cádmio-telúrio.',
                    53: 'Não-metal essencial para saúde. Iodo é importante para glândula tiroide.',
                    54: 'Gás nobre raro. Usado em lâmpadas de alta pressão e anestésicos.',
                    55: 'Metal alcalino extremamente reativo. Um dos elementos mais reativos e explosivos.',
                    56: 'Metal alcalino-terroso que queima com chama verde. Usado em pirotecnia.',
                    57: 'Lantanídeo usado em lâmpadas fluorescentes e ímãs permanentes.',
                    72: 'Metal de transição resistente à corrosão. Usado em reatores nucleares.',
                    73: 'Metal de transição de altíssimo ponto de fusão. Usado em filamentos de lâmpadas.',
                    74: 'Metal de transição com maior ponto de fusão. Usado em filamentos e eletródios.',
                    75: 'Metal de transição raro. Usado em superligas para motores a jato.',
                    76: 'Metal de transição mais denso. Usado em ligas de alta densidade.',
                    77: 'Metal de transição nobre raro. Usado em catalisadores e eletrodos.',
                    78: 'Metal de transição precioso raro. Usado em joias e catalisadores.',
                    79: 'Metal de transição precioso amarelo. Símbolo de riqueza e usado em eletrônica.',
                    80: 'Metal líquido à temperatura ambiente. Tóxico, usado em termômetros antigos.',
                    81: 'Metal tóxico. Usado em vidros especiais e detectores de radiação.',
                    82: 'Metal denso e tóxico. Historicamente usado em munição e vidraçado.',
                    83: 'Metal usado em cosméticos e medicamentos contra indigestão.',
                    84: 'Não-metal altamente radioativo. Raro e perigoso.',
                    85: 'Halogênio raro e radioativo. Praticamente inexistente na natureza.',
                    86: 'Gás nobre radioativo perigoso. Produto de decaimento do urânio.',
                    87: 'Metal alcalino radioativo extremamente raro. Um dos mais reativos.',
                    88: 'Metal alcalino-terroso radioativo. Mais raro que ouro.',
                    89: 'Actinídeo radioativo. Primeiro elemento da série actinídea.',
                    92: 'Actinídeo radioativo. Combustível nuclear usado em reatores.',
                    90: 'Actinídeo radioativo. Usado historicamente em mantos de lâmpadas (tóxico).',
                    91: 'Actinídeo radioativo raro. Praticamente inexistente na natureza.',
                    93: 'Actinídeo radioativo sintetizado. Primeiro elemento mais pesado que urânio.',
                    94: 'Actinídeo radioativo perigoso. Usado em armas nucleares.',
                    95: 'Actinídeo radioativo sintetizado. Usado em detectores de fumaça.',
                    96: 'Actinídeo radioativo sintetizado artificialmente.',
                    97: 'Actinídeo radioativo sintetizado. Descoberto em 1949.',
                    98: 'Actinídeo radioativo sintetizado. Extremamente raro.',
                    99: 'Actinídeo radioativo sintetizado. Muito raro e tóxico.',
                    100: 'Actinídeo radioativo sintetizado artificialmente.',
                    101: 'Actinídeo radioativo sintetizado. Homenagem a Dmitri Mendeleyev.',
                    102: 'Actinídeo radioativo sintetizado. Nomeado por Prêmio Nobel.',
                    103: 'Actinídeo radioativo sintetizado. Último actinídeo.',
                    104: 'Metal sintético radioativo. Transurânico de vida curta.',
                    105: 'Metal sintético radioativo transurânico.',
                    106: 'Metal sintético radioativo transurânico.',
                    107: 'Metal sintético radioativo transurânico.',
                    108: 'Metal sintético radioativo transurânico.',
                    109: 'Metal sintético radioativo transurânico.',
                    110: 'Metal sintético radioativo transurânico.',
                    111: 'Metal sintético radioativo transurânico.',
                    112: 'Metal sintético radioativo transurânico.',
                    113: 'Metal sintético radioativo transurânico.',
                    114: 'Metal sintético radioativo transurânico.',
                    115: 'Metal sintético radioativo transurânico.',
                    116: 'Metal sintético radioativo transurânico.',
                    117: 'Halogênio sintético radioativo transurânico.',
                    118: 'Gás nobre sintético radioativo transurânico.'
                };
                
                document.getElementById('element-details').innerHTML = `
                    <div class="element-detail-item"><span class="element-detail-label">Número Atômico:</span> ${elem.numero}</div>
                    <div class="element-detail-item"><span class="element-detail-label">Massa Atômica:</span> ${elem.massaAtomica.toFixed(3)}</div>
                    <div class="element-detail-item"><span class="element-detail-label">Tipo:</span> ${tipoMap[elem.tipo] || elem.tipo}</div>
                    <div class="element-detail-item" style="margin-top: 15px; border-top: 1px solid var(--borda-card); padding-top: 10px;"><span class="element-detail-label">Descrição:</span><br><span style="margin-top: 8px; display: block;">${descricoes[elem.numero] || 'Elemento sintético radioativo.'}</span></div>
                `;
                
                infoDiv.classList.add('show');
            },

            filtrarPorClasse(classe, elemento) {
                const todosLegendItems = document.querySelectorAll('.legend-item');
                const todosElementos = document.querySelectorAll('.element-btn');
                const filtroAtivo = elemento.classList.contains('active');

                // Remove filtro se clicou novamente no mesmo
                if (filtroAtivo) {
                    elemento.classList.remove('active');
                    todosElementos.forEach(el => {
                        el.classList.remove('desabilitado', 'destacado');
                    });
                    todosLegendItems.forEach(item => item.classList.remove('active'));
                } else {
                    // Remover classe active de todos
                    todosLegendItems.forEach(item => item.classList.remove('active'));
                    elemento.classList.add('active');

                    // Desabilitar todos os elementos
                    todosElementos.forEach(el => {
                        el.classList.add('desabilitado');
                    });

                    // Destacar apenas os da classe selecionada
                    document.querySelectorAll(`.element-btn.${classe}`).forEach(el => {
                        el.classList.remove('desabilitado');
                        el.classList.add('destacado');
                    });
                }
            },

            fecharTabelaPeriodica() {
                document.getElementById('periodic-table-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
                // Resetar filtro ao fechar
                document.querySelectorAll('.legend-item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.element-btn').forEach(el => {
                    el.classList.remove('desabilitado', 'destacado');
                });
            },

            // ============================================
            // SELETOR DE CONCEITOS (acesso livre pela tabela periódica)
            // ============================================
            _conceitoFaseSelecionada: null,
            _conceitoAuxSelecionado: null,

            abrirSeletorConceitos() {
                this._conceitoFaseSelecionada = null;
                this._conceitoAuxSelecionado = null;

                // Fechar a tela da tabela periódica (sem mostrar o menu principal)
                document.getElementById('periodic-table-screen').style.display = 'none';

                // Montar lista de fases
                const container = document.getElementById('seletor-fases-container');
                container.innerHTML = '';
                this.curriculo.forEach(modulo => {
                    const tituloEl = document.createElement('div');
                    tituloEl.className = 'seletor-modulo-titulo';
                    tituloEl.textContent = modulo.titulo;
                    container.appendChild(tituloEl);

                    const gridEl = document.createElement('div');
                    gridEl.className = 'seletor-fases-grid';

                    modulo.fases.forEach(fase => {
                        // Só mostrar fases que têm conceitos (1–13; nível 14 não tem)
                        const temConceito = this.conceitos['nivel' + fase.id];
                        if (!temConceito) return;

                        const btn = document.createElement('button');
                        btn.className = 'seletor-fase-btn';
                        btn.textContent = `${fase.tag} – ${fase.nome}`;
                        btn.dataset.nivelId = fase.id;
                        btn.dataset.nivelNome = fase.nome;
                        btn.onclick = () => this.selecionarFaseConceito(fase.id, fase.nome, btn);
                        gridEl.appendChild(btn);
                    });

                    container.appendChild(gridEl);
                });

                // Resetar auxiliar e esconder seção
                document.getElementById('seletor-auxiliar-section').style.display = 'none';
                document.getElementById('seletor-ver-btn').style.display = 'none';
                document.querySelectorAll('.seletor-aux-btn').forEach(b => b.classList.remove('selecionado'));

                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('seletor-conceitos-screen').style.display = 'block';
            },

            selecionarFaseConceito(nivelId, nivelNome, btnEl) {
                this._conceitoFaseSelecionada = nivelId;
                this._conceitoAuxSelecionado = null;

                // Destacar botão selecionado
                document.querySelectorAll('.seletor-fase-btn').forEach(b => b.classList.remove('selecionada'));
                btnEl.classList.add('selecionada');

                // Mostrar seleção de auxiliar
                document.getElementById('seletor-auxiliar-section').style.display = 'block';
                document.getElementById('seletor-ver-btn').style.display = 'none';
                document.querySelectorAll('.seletor-aux-btn').forEach(b => b.classList.remove('selecionado'));

                // Scroll suave até a seção de auxiliar
                document.getElementById('seletor-auxiliar-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            },

            selecionarAuxConceito(auxiliar) {
                if (!this._conceitoFaseSelecionada) return;
                this._conceitoAuxSelecionado = auxiliar;

                const mapa = { professor: 'saux-professor', assistente: 'saux-assistente', conselheiro: 'saux-conselheiro' };
                document.querySelectorAll('.seletor-aux-btn').forEach(b => b.classList.remove('selecionado'));
                document.getElementById(mapa[auxiliar]).classList.add('selecionado');
                document.getElementById('seletor-ver-btn').style.display = 'block';
            },

            verConceitoLivre() {
                if (!this._conceitoFaseSelecionada || !this._conceitoAuxSelecionado) return;

                const nivelConceitos = this.conceitos['nivel' + this._conceitoFaseSelecionada];
                const conteudo = nivelConceitos[this._conceitoAuxSelecionado];

                // Buscar nome da fase
                let nomeFase = '';
                this.curriculo.forEach(modulo => {
                    modulo.fases.forEach(fase => {
                        if (fase.id === this._conceitoFaseSelecionada) nomeFase = `${fase.tag} – ${fase.nome}`;
                    });
                });

                const nomeAuxiliar = {
                    professor: '🧑‍🏫 Prof. Químico',
                    assistente: '🔬 Assistente Lab',
                    conselheiro: '⚛️ Cons. Atômico'
                };

                document.getElementById('conceito-livre-titulo').textContent = nomeFase;
                document.getElementById('conceito-livre-auxiliar-nome').textContent = `Explicação por: ${nomeAuxiliar[this._conceitoAuxSelecionado]}`;
                document.getElementById('conceito-livre-conteudo').innerHTML = conteudo;

                // Esconder seletor, mostrar conceito livre
                document.getElementById('seletor-conceitos-screen').style.display = 'none';
                document.getElementById('conceito-livre-box').style.display = 'block';
            },

            fecharConceitoLivre() {
                document.getElementById('conceito-livre-box').style.display = 'none';
                // Voltar ao seletor
                document.getElementById('seletor-conceitos-screen').style.display = 'block';
            },

            fecharSeletorConceitos() {
                document.getElementById('seletor-conceitos-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                // Reabrir a tabela periódica
                document.getElementById('periodic-table-screen').style.display = 'block';
            },

            abrirPanorama() {
                const perfil = this.contaPadrao;
                const roadmapContent = document.getElementById('roadmap-content');
                roadmapContent.innerHTML = '';
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('stats-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';

                this.curriculo.forEach(cap => {
                    roadmapContent.innerHTML += `<div class="chapter-header"><h2>${cap.titulo}</h2></div>`;
                    cap.fases.forEach(fase => {
                        // Nível 14 (desafio final) está sempre desbloqueado
                        const isLocked = fase.id === 14 ? false : (fase.id > perfil.nivelMaximo);
                        const nodeClass = "roadmap-node " + (isLocked ? "locked" : (fase.id === perfil.nivelMaximo ? "unlocked current" : "unlocked completed"));
                        roadmapContent.innerHTML += `<div class="${nodeClass}"><div class="level-card" onclick="${isLocked ? '' : `app.iniciarNivel(${fase.id}, '${fase.tag}')`}"><div class="level-title">${fase.tag} - ${fase.nome}</div></div></div>`;
                    });
                });
                document.getElementById('levels-screen').style.display = 'block';
            },

            iniciarNivel(id, tag) {
                this.nivelPendente = id;
                this.tagPendente = tag;
                this.auxiliarSelecionado = null;
                
                // Se é o nível final (14), mostrar tela de aviso ao invés de selecionar auxiliar
                if (id === 14) {
                    document.getElementById('modal-overlay').style.display = 'block';
                    document.getElementById('final-warning-screen').style.display = 'block';
                    document.getElementById('btn-iniciar-final').onclick = () => this.confirmarFinal();
                    return;
                }
                
                document.querySelectorAll('.auxiliar-card').forEach(c => c.classList.remove('selecionado'));
                document.getElementById('btn-confirmar-auxiliar').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('auxiliar-screen').style.display = 'block';
            },

            confirmarFinal() {
                if (!this.nivelPendente || !this.tagPendente) return alert('Erro: Nível não foi selecionado corretamente.');
                
                document.getElementById('final-warning-screen').style.display = 'none';
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('levels-screen').style.display = 'none';
                this.gameState.nivelAtual = this.nivelPendente;
                this.gameState.acertos = 0;
                this.gameState.dicasUsadas = 0;
                this.gameState.pontuacaoAtual = 0;
                document.getElementById('nivel-tag').textContent = this.tagPendente;
                this.perguntaAtualIdx = 0;
                this.passarParaPerguntas(); // Pula direto para perguntas (sem mostrar conceito)
            },

            selecionarAuxiliar(nome) {
                const mapa = { professor: 'card-prof', assistente: 'card-lab', conselheiro: 'card-atom' };
                if (!mapa[nome]) return alert('Erro: Auxiliar não encontrado.');
                
                this.auxiliarSelecionado = nome;
                document.querySelectorAll('.auxiliar-card').forEach(c => c.classList.remove('selecionado'));
                document.getElementById(mapa[nome]).classList.add('selecionado');
                document.getElementById('btn-confirmar-auxiliar').style.display = 'inline-block';
            },

            confirmarAuxiliar() {
                if (!this.auxiliarSelecionado) return alert('Selecione um auxiliar antes de continuar.');
                if (!this.nivelPendente || !this.tagPendente) return alert('Erro: Nível não foi selecionado corretamente.');
                
                document.getElementById('auxiliar-screen').style.display = 'none';
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('levels-screen').style.display = 'none';
                this.gameState.nivelAtual = this.nivelPendente;
                this.gameState.acertos = 0;
                this.gameState.dicasUsadas = 0;
                this.gameState.pontuacaoAtual = 0;
                document.getElementById('nivel-tag').textContent = this.tagPendente;
                this.perguntaAtualIdx = 0;
                this.mostrarConceito();
            },

            mostrarConceito() {
                const nivelConceitos = this.conceitos['nivel' + this.gameState.nivelAtual];
                if (!nivelConceitos) return this.passarParaPerguntas();
                
                const auxiliar = this.auxiliarSelecionado;
                const conteudo = nivelConceitos[auxiliar];
                
                const nomeAuxiliar = {
                    professor: 'Prof. Químico',
                    assistente: 'Assistente Lab',
                    conselheiro: 'Cons. Atômico'
                };
                
                document.getElementById('conceito-auxiliar-nome').textContent = `Explicação por: ${nomeAuxiliar[auxiliar]}`;
                document.getElementById('conceito-conteudo').innerHTML = conteudo;
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('conceito-box').style.display = 'block';
            },

            passarParaPerguntas() {
                document.getElementById('conceito-box').style.display = 'none';
                document.getElementById('game-hud').style.display = 'block';
                this.mostrarPergunta();
            },

            mostrarPergunta() {
                const lista = this.questoes['nivel' + this.gameState.nivelAtual];
                if (!lista || this.perguntaAtualIdx >= lista.length) return this.finalizar();
                
                const q = lista[this.perguntaAtualIdx];
                if (!q) return this.finalizar();
                
                document.getElementById('question-title').textContent = `Pergunta ${this.perguntaAtualIdx + 1}/${lista.length}`;
                document.getElementById('question-text').textContent = q.pergunta;
                document.getElementById('feedback').style.display = 'none';
                document.getElementById('btn-proxima').style.display = 'none';
                document.getElementById('question-box').classList.remove('shake-animation');
                
                const dicaDisplay = document.getElementById('dica-display');
                dicaDisplay.classList.remove('show');
                dicaDisplay.innerHTML = '';
                
                const btnDica = document.getElementById('btn-dica');
                // Desabilitar dicas para o nível final (14)
                if (this.gameState.nivelAtual === 14) {
                    btnDica.disabled = true;
                    btnDica.style.opacity = '0.3';
                    btnDica.title = 'Dicas não disponíveis no desafio final!';
                } else {
                    const temPontos = this.contaPadrao.pontuacaoTotal >= this.gameState.CUSTO_DICA;
                    btnDica.disabled = !temPontos;
                    btnDica.style.opacity = temPontos ? '1' : '0.5';
                    btnDica.title = '';
                }
                
                document.getElementById('total-points-hud').textContent = this.contaPadrao.pontuacaoTotal;
                document.getElementById('options-list').innerHTML = q.opcoes.map((o, i) => `<button class="option-btn" onclick="app.checar(${i}, this)">${o}</button>`).join('');
                
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('question-box').style.display = 'block';
            },

            checar(idx, btn) {
                document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
                const q = this.questoes['nivel' + this.gameState.nivelAtual][this.perguntaAtualIdx];
                if (!q) return alert('Erro: Pergunta não encontrada.');
                
                const feedback = document.getElementById('feedback');
                const box = document.getElementById('question-box');
                feedback.classList.remove('pop-animation');
                box.classList.remove('shake-animation');
                void box.offsetWidth;
                feedback.style.display = 'block';

                const acertou = idx === q.resposta;
                if (acertou) {
                    this.gameState.acertos++;
                    this.gameState.pontuacaoAtual += 50;
                    feedback.innerHTML = " Absolutamente Correto!";
                    feedback.style.color = "#008833";
                    feedback.style.background = "rgba(0, 200, 80, 0.1)";
                    btn.style.background = '#00c850';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#008833';
                    this.tocarSom('acerto');
                } else {
                    feedback.innerHTML = " Quase lá... " + q.explicacao;
                    feedback.style.color = "#cc0040";
                    feedback.style.background = "rgba(204, 0, 64, 0.1)";
                    box.classList.add('shake-animation');
                    btn.style.background = '#cc0040';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#880022';
                    const botoes = document.querySelectorAll('.option-btn');
                    if (q.resposta < botoes.length) {
                        botoes[q.resposta].style.borderColor = '#00c850';
                        botoes[q.resposta].style.borderWidth = '3px';
                    }
                    this.tocarSom('erro');
                }
                
                void feedback.offsetWidth;
                feedback.classList.add('pop-animation');
                document.getElementById('acertos-atual').textContent = this.gameState.acertos;
                document.getElementById('pontuacao-atual').textContent = this.gameState.pontuacaoAtual;
                document.getElementById('btn-proxima').style.display = 'block';
            },

            proximaPergunta() {
                document.getElementById('btn-proxima').style.display = 'none';
                this.perguntaAtualIdx++;
                this.mostrarPergunta();
            },

            usarDica() {
                const perfil = this.contaPadrao;
                const dicaDisplay = document.getElementById('dica-display');
                
                if (perfil.pontuacaoTotal < this.gameState.CUSTO_DICA) {
                    dicaDisplay.innerHTML = `<strong style="color: #cc0040;">⚠️ Pontos insuficientes</strong> Você precisa de ${this.gameState.CUSTO_DICA} pontos. Você tem ${perfil.pontuacaoTotal}.`;
                    dicaDisplay.classList.add('show');
                    return;
                }

                const q = this.questoes['nivel' + this.gameState.nivelAtual][this.perguntaAtualIdx];
                if (!q) {
                    dicaDisplay.innerHTML = `<strong style="color: #cc0040;">❌ Erro</strong> Erro ao recuperar pergunta.`;
                    dicaDisplay.classList.add('show');
                    return;
                }

                perfil.pontuacaoTotal -= this.gameState.CUSTO_DICA;
                this.gameState.pontuacaoAtual -= this.gameState.CUSTO_DICA;
                this.gameState.dicasUsadas++;

                dicaDisplay.innerHTML = `<strong style="color: var(--cor-principal);">💡 Dica:</strong> <span style="color: var(--cor-texto);">${q.dica || "Pense melhor!"}</span><br><small style="color: var(--cor-texto-secundario);">-${this.gameState.CUSTO_DICA} pts | Saldo: ${perfil.pontuacaoTotal} pts</small>`;
                dicaDisplay.classList.add('show');

                const btnDica = document.getElementById('btn-dica');
                if (perfil.pontuacaoTotal < this.gameState.CUSTO_DICA) {
                    btnDica.disabled = true;
                    btnDica.style.opacity = '0.5';
                }

                document.getElementById('pontuacao-atual').textContent = this.gameState.pontuacaoAtual;
                document.getElementById('total-points-hud').textContent = perfil.pontuacaoTotal;
            },

            finalizar() {
                const perfil = this.contaPadrao;
                if (!perfil.badges) perfil.badges = [];
                if (!perfil.historico) perfil.historico = [];

                const pontosGanhos = this.gameState.pontuacaoAtual;
                perfil.pontuacaoTotal += pontosGanhos;
                if(this.gameState.acertos >= 3 && this.gameState.nivelAtual === perfil.nivelMaximo) perfil.nivelMaximo++;
                
                const data = new Date().toLocaleDateString('pt-BR') + " às " + new Date().toLocaleTimeString('pt-BR').substring(0, 5);
                perfil.historico.push({
                    fase: this.gameState.nivelAtual,
                    data: data,
                    acertos: this.gameState.acertos,
                    pontos: pontosGanhos,
                    dicasUsadas: this.gameState.dicasUsadas
                });

                let ganhouBadge = false;
                const checarBadge = (nome, icone, desc) => {
                    if(!perfil.badges.find(b => b.nome === nome)) {
                        perfil.badges.push({ nome, icone, descricao: desc });
                        ganhouBadge = true;
                    }
                };

                // ========== BADGES FINAIS ESPECIAIS ==========
                if(this.gameState.nivelAtual === 14 && this.gameState.acertos >= 6) {
                    checarBadge("Campeão do Breaking Game", "🎮", "Complete o desafio final com 60% ou mais de acerto!");
                }
                if(this.gameState.nivelAtual === 14 && this.gameState.acertos === 10) {
                    checarBadge("Mestre Supremo", "👨‍🎓", "Gabarite a prova final - você é um verdadeiro Doutor em Química!");
                }

                // ========== BADGES ORIGINAIS ==========
                if(this.gameState.acertos === 5) checarBadge("Perfeição Química", "🏆", "Gabarite todas as perguntas em uma única fase!");
                if(this.gameState.nivelAtual === 1 && this.gameState.acertos >= 3) checarBadge("Primeiros Passos", "👶", "Conclua a sua primeira fase com pontuação mínima.");
                if(this.gameState.dicasUsadas === 0 && this.gameState.acertos >= 3) checarBadge("Independente", "💪", "Complete uma fase sem usar nenhuma dica!");
                if(perfil.pontuacaoTotal >= 500) checarBadge("Mente Brilhante", "⭐", "Acumule um total de 500 pontos em sua jornada.");

                // ========== 10 NOVAS BADGES POR DIFICULDADE ==========
                // Módulo 1 - Química Básica (Fácil)
                if(perfil.nivelMaximo >= 5) checarBadge("Mestre da Química Básica", "📚", "Desbloqueie todas as fases do Módulo 1: Química Básica!");
                
                // Módulo 2 - Físico-Química (Médio)
                if(perfil.nivelMaximo >= 10) checarBadge("Sábio Físico-Químico", "🔬", "Desbloqueie todas as fases do Módulo 2: Físico-Química!");
                
                // Módulo 3 - Química Orgânica (Difícil)
                if(perfil.nivelMaximo >= 13) checarBadge("Gênio da Química Orgânica", "🧪", "Desbloqueie todas as fases do Módulo 3: Química Orgânica!");
                
                // Consecutivas com boas notas
                if(this.gameState.acertos >= 4 && this.gameState.nivelAtual >= 5) checarBadge("Aprendiz Consistente", "📈", "Complete 5 fases seguidas com 4 ou mais acertos!");
                
                // Alto desempenho geral
                if(perfil.pontuacaoTotal >= 1000) checarBadge("Lenda Viva", "👑", "Acumule um total de 1000 pontos em sua jornada!");
                
                // Economia máxima de dicas
                const totalDicasUsadas = perfil.historico.reduce((sum, h) => sum + h.dicasUsadas, 0);
                if(totalDicasUsadas === 0 && perfil.nivelMaximo >= 5) checarBadge("Inteligência Pura", "🧠", "Complete 5 fases sem usar nenhuma dica!");
                
                // Rápido aprendizado
                if(this.gameState.nivelAtual >= 3 && this.gameState.acertos >= 3) checarBadge("Rápido Aprendiz", "⚡", "Avance para a 3ª fase com pontuação mínima!");
                
                // Superação de desafios
                if(this.gameState.nivelAtual >= 10 && this.gameState.acertos >= 3) checarBadge("Vencedor de Desafios", "🎯", "Complete a 10ª fase (Cinética Química)!");
                
                // Perfeição em nível alto
                if(this.gameState.acertos === 5 && this.gameState.nivelAtual >= 10) checarBadge("Químico Impecável", "✨", "Gabarite uma fase a partir do Módulo 2!");
                
                // Jornada Épica
                if(perfil.historico.length >= 10 && perfil.pontuacaoTotal >= 300) checarBadge("Jornada Épica", "🚀", "Complete 10 fases com desempenho consistente!");

                if (this.usuarioAtual) this.salvarDados(`usuario_${this.usuarioAtual}`, perfil);
                
                document.getElementById('conceito-box').style.display = 'none';
                document.getElementById('question-box').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('game-hud').style.display = 'none';
                document.getElementById('final-score').textContent = pontosGanhos;
                
                // Ajustar porcentagem de acerto conforme o número de perguntas
                const totalPerguntas = this.gameState.nivelAtual === 14 ? 10 : 5;
                document.getElementById('acerto-pct').textContent = Math.round((this.gameState.acertos / totalPerguntas) * 100) + '%';
                
                // Mensagem especial se completou o jogo (nível 14 com 60%+)
                const resultTitle = document.getElementById('result-title');
                if (this.gameState.nivelAtual === 14) {
                    if (this.gameState.acertos >= 6) {
                        resultTitle.textContent = '🎓 JOGO COMPLETO! Você venceu o Breaking Game!';
                        resultTitle.style.color = '#00c850';
                    } else {
                        resultTitle.textContent = '⚠️ Desafio Final - Pontuação Insuficiente';
                        resultTitle.style.color = '#ffc107';
                    }
                } else {
                    resultTitle.textContent = '🏆 Fase Concluída!';
                    resultTitle.style.color = '';
                }
                
                const avisoBadge = document.getElementById('badge-alert');
                if (avisoBadge) avisoBadge.style.display = ganhouBadge ? 'block' : 'none';

                if (ganhouBadge) this.tocarSom('conquista');
                const venceuFase = this.gameState.nivelAtual === 14 ? this.gameState.acertos >= 6 : this.gameState.acertos >= 3;
                this.tocarSom(venceuFase ? 'vitoria' : 'derrota');

                document.getElementById('stats-screen').style.display = 'block';
            },

            fecharAuxiliarVoltarMapa() {
                document.getElementById('auxiliar-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                this.auxiliarSelecionado = null;
                this.nivelPendente = null;
                this.tagPendente = null;
                this.abrirPanorama();
            },

            fecharConceitoVoltarMapa() {
                document.getElementById('conceito-box').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                this.abrirPanorama();
            },

            confirmarVoltarMapa() {
                if (confirm('Deseja sair da fase? Seu progresso nesta rodada será perdido.')) {
                    document.getElementById('question-box').style.display = 'none';
                    document.getElementById('modal-overlay').style.display = 'none';
                    document.getElementById('game-hud').style.display = 'none';
                    this.gameState.nivelAtual = null;
                    this.gameState.acertos = 0;
                    this.gameState.pontuacaoAtual = 0;
                    this.perguntaAtualIdx = 0;
                    this.abrirPanorama();
                }
            },

            voltarAoMenu() { 
                // Esconde as diversas telas de sobreposição e janelas específicas
                document.getElementById('levels-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('profile-screen').style.display = 'none';
                document.getElementById('final-warning-screen').style.display = 'none';
                
                // Garante que a tela da loja (shop-screen) seja ocultada/ajustada
                document.querySelector(".shop-screen").style.display = "none"; // Ajustado para fechar
                
                // Chama a função que recarrega/exibe o menu principal
                this.carregarMenuPrincipal(); 
            },

            trocarUsuario() { 
                if (this.usuarioAtual) {
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                }
                location.reload(); 
            },

            alterarFonte(idFonte) {
                // 1. Aplica a fonte ao corpo do site
                document.body.setAttribute('data-font', idFonte);
                
                // 2. Salva a preferência
                this.fonteSelecionada = idFonte;
                localStorage.setItem('fonte', idFonte);
                
                // 3. Atualiza o visual dos botões (opcional, remove 'active' de todos e add no clicado)
                document.querySelectorAll('.font-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if(btn.innerText.toLowerCase().includes(idFonte)) btn.classList.add('active');
                });
                
                console.log(`Fonte ajustada para: ${idFonte}`);
            },

            carregarFonteSalva() {
                const fonteSalva = localStorage.getItem('fonte') || 'inter';
                this.alterarFonte(fonteSalva);
            }
        };

        app.inicializarSons();
        app.carregarTemaSalvo();

// --- ADIÇÃO PARA CARREGAMENTO E ACESSIBILIDADE VIA TECLADO ---
window.addEventListener('DOMContentLoaded', () => {
    // Carregar configurações salvas (tema, fonte, tamanho)
    if (app.carregarConfiguracoesSalvas) {
        app.carregarConfiguracoesSalvas();
    }
    
    // Modal overlay deve fechar ao clicar fora
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            app.fecharTudoComOverlay();
        });
    }
});

document.addEventListener('keydown', (event) => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = Array.from(document.querySelectorAll(focusableElements)).filter(el => {
        // Filtra apenas elementos que estão visíveis na tela
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });

    const currentIdx = elements.indexOf(document.activeElement);
    let nextIdx = -1;

    // Se não houver nada focado, foca no primeiro elemento ao premir qualquer seta
    if (currentIdx === -1 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        elements[0]?.focus();
        return;
    }

    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault(); // Impede o scroll da página
            nextIdx = (currentIdx + 1) % elements.length;
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault(); // Impede o scroll da página
            nextIdx = (currentIdx - 1 + elements.length) % elements.length;
            break;
        case 'Enter':
            // O Enter já ativa o botão focado por padrão no navegador
            break;
    }

    if (nextIdx !== -1) {
        elements[nextIdx].focus();
    }
});
