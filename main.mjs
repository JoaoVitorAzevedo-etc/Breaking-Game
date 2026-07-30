import { loadProfile, saveProfile } from './services/usuarioService.mjs';
import { completePhase } from './game/progresso.mjs';
import { updateRanking } from './services/rankingService.mjs';
import { loadDashboard } from './ui/dashboard.mjs';
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
            desempenhoChart: null,
            
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
           async sincronizarFirebase() {

    if (!this.usuarioAtual) return;

    try {

        const perfil =
            await loadProfile(
                this.usuarioAtual
            );

        if (perfil) {

            this.contaPadrao = {

                ...this.obterPerfilPadrao(),

                ...perfil
            };

            this.atualizarInfosMenu();

        }

    } catch (erro) {

        console.error(
            'Erro Firebase:',
            erro
        );

    }
},

           
            obterBadgeMeta(nome) {
                return this.obterCatalogoBadges().find(b => b.nome === nome) || { pontos: 0 };
            },

            obterPerfilPadrao() {
                return {
                    nome: "user",
                    pontuacaoTotal: 0,
                    nivelMaximo: 1,
                    badges: [],
                    historico: [],
                    temaCurrent: "light-1",
                    tamanhoFonte: "medio",
                    itensComprados: ["light-1", "inter", "daltonismo", "deuteranomalia", "protanomalia", "protanopia", "deuteranopia", "tritanomalia", "tritanopia"]
                };
            },

            obterPerfilUser0() {
                return {
                    nome: "user0",
                    pontuacaoTotal: 9999,
                    nivelMaximo: 14,
                    badges: this.obterCatalogoBadges(),
                    historico: [
                        { fase: 1, data: "01/01/2026 às 10:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 2, data: "01/01/2026 às 10:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 3, data: "01/01/2026 às 11:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 4, data: "01/01/2026 às 11:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 5, data: "01/01/2026 às 12:00", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 10, data: "01/01/2026 às 12:30", acertos: 5, pontos: 250, dicasUsadas: 0 },
                        { fase: 14, data: "01/01/2026 às 13:00", acertos: 10, pontos: 500, dicasUsadas: 0 }
                    ],
                    temaCurrent: "light-1",
                    tamanhoFonte: "medio",
                    itensComprados: ['light-1','light-2','light-3','light-4','light-5','light-6','light-7','dark-1','dark-2','dark-3','dark-4','dark-5','dark-6','dark-7','daltonismo','deuteranomalia','protanomalia','protanopia','deuteranopia','tritanomalia','tritanopia']
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

            
            
            entrarComUsuario() {
                const name = document.getElementById('username-input').value.trim();
                if (!name) return console.warn("Digite um nome!");
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
                    if (!this.contaPadrao.itensComprados) this.contaPadrao.itensComprados = [];
                    this.contaPadrao.itensComprados = Array.from(new Set([...this.contaPadrao.itensComprados, 'light-1', 'inter', 'special', 'lobster', 'times', 'double', 'serif-bold']));
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
                document.getElementById('tutorial-intro-screen').style.display = 'block';
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

            fecharOverlay() {
                const overlay = document.getElementById('modal-overlay');
                if (overlay) overlay.style.display = 'none';
                const elementos = [
                    'config-screen',
                    'final-warning-screen',
                    'auxiliar-screen',
                    'profile-screen',
                    'periodic-table-screen',
                    'seletor-conceitos-screen',
                    'conceito-box',
                    'conceito-livre-box',
                    'shop-screen',
                    'stats-screen',
                    'inventory-screen',
                    'tutorial-intro-screen'
                ];
                elementos.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = 'none';
                });
                const mainMenu = document.getElementById('main-menu');
                if (mainMenu) mainMenu.style.display = 'block';
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
                return fases;
            },

            // Configuração estruturada dos temas com ID e preço respetivo
            temasDisponiveis: [
                { id: 'light-1', preco: 0, tipo: 'tema' },
                { id: 'light-2', preco: 100, tipo: 'tema' },
                { id: 'light-3', preco: 150, tipo: 'tema' },
                { id: 'light-4', preco: 200, tipo: 'tema' },
                { id: 'light-5', preco: 250, tipo: 'tema' },
                { id: 'light-6', preco: 300, tipo: 'tema' },
                { id: 'light-7', preco: 350, tipo: 'tema' },
                { id: 'dark-1', preco: 100, tipo: 'tema' },
                { id: 'dark-2', preco: 150, tipo: 'tema' },
                { id: 'dark-3', preco: 200, tipo: 'tema' },
                { id: 'dark-4', preco: 250, tipo: 'tema' },
                { id: 'dark-5', preco: 300, tipo: 'tema' },
                { id: 'dark-6', preco: 350, tipo: 'tema' },
                { id: 'dark-7', preco: 400, tipo: 'tema' },
                { id: 'inter', preco: 0, tipo: 'fonte' },
                { id: 'special', preco: 120, tipo: 'fonte' },
                { id: 'lobster', preco: 130, tipo: 'fonte' },
                { id: 'times', preco: 140, tipo: 'fonte' },
                { id: 'double', preco: 150, tipo: 'fonte' },
                { id: 'serif-bold', preco: 160, tipo: 'fonte' }
            ],

            // Altera apenas entre os temas que o utilizador já comprou no seu perfil
            toggleTema() {
                const body = document.body;
                const atual = body.getAttribute('data-theme') || 'light-1';
                
                const comprados = (this.contaPadrao && this.contaPadrao.itensComprados)
                    ? this.contaPadrao.itensComprados.filter(id => this.obterItemPorId(id)?.tipo === 'tema')
                    : ['light-1'];
                
                if (!comprados.length) comprados.push('light-1');

                let idx = comprados.indexOf(atual);
                if (idx === -1) idx = 0;
                
                const novo = comprados[(idx + 1) % comprados.length];
                this.setTema(novo);
            },

            setTema(tema) {
                const item = this.obterItemPorId(tema);
                if (item && item.tipo === 'fonte') {
                    console.warn('Use alterarFonte para itens de fonte.');
                    return;
                }
                if (item && !this.itemEstaComprado(tema)) {
                    console.warn('Você precisa comprar esse tema na loja antes de usar.');
                    return;
                }
                const body = document.body;
                body.setAttribute('data-theme', tema);
                document.querySelectorAll('.theme-swatch').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-theme-value') === tema);
                });
                if (this.usuarioAtual && this.contaPadrao) {
                    this.contaPadrao.temaCurrent = tema;
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                }
                this.temaSelecionado = tema;
                localStorage.setItem('tema', tema);
            },

            // Lógica de validação e compra na Loja de Temas
            comprarTemaNaLoja(temaId) {
                if (!this.contaPadrao) {
                    console.warn("Você precisa estar logado para efetuar compras.");
                    return;
                }

                if (!this.contaPadrao.itensComprados) {
                    this.contaPadrao.itensComprados = ["light-1", "inter"];
                }

                const infoTema = this.obterItemPorId(temaId);
                if (!infoTema) return;

                // Se o utilizador já comprou o item, apenas aplica-o
                if (this.contaPadrao.itensComprados.includes(temaId)) {
                    if (infoTema.tipo === 'tema') {
                        this.setTema(temaId);
                    } else if (infoTema.tipo === 'fonte') {
                        this.alterarFonte(temaId);
                    }
                    this.atualizarInfosMenu();
                    this.renderizarLoja();
                    this.renderInventario();
                    return;
                }

                // Verifica se possui saldo suficiente
                if (this.contaPadrao.pontuacaoTotal >= infoTema.preco) {
                    this.contaPadrao.pontuacaoTotal -= infoTema.preco;
                    this.contaPadrao.itensComprados.push(temaId);
                    if (infoTema.tipo === 'tema') {
                        this.setTema(temaId);
                    } else if (infoTema.tipo === 'fonte') {
                        this.alterarFonte(temaId);
                    }
                    this.atualizarInfosMenu();
                    this.renderizarLoja();
                    this.renderInventario();
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                    console.warn(`Sucesso! Você comprou ${this.obterNomeTema(temaId)} por ${infoTema.preco} pontos.`);
                } else {
                    console.warn("Você não possui saldo o suficiente para comprar este item.");
                }
            },

            renderizarLoja() {
                const perfil = this.contaPadrao || this.obterPerfilPadrao();
                const pontos = perfil.pontuacaoTotal || 0;
                const ownedContainer = document.getElementById('shop-owned-items');
                const shopContainer = document.getElementById('shop-items-container');

                if (document.getElementById('shop-user-points')) {
                    document.getElementById('shop-user-points').textContent = pontos;
                }

                const itensComprados = perfil.itensComprados || ["light-1"];

                if (ownedContainer) {
                    if (itensComprados.length === 0) {
                        ownedContainer.innerHTML = '<span class="shop-owned-item">Nenhum item adquirido</span>';
                    } else {
                        ownedContainer.innerHTML = itensComprados.map(item => `<span class="shop-owned-item">${this.obterNomeTema(item)}</span>`).join('');
                    }
                }

                if (shopContainer) {
                    shopContainer.innerHTML = this.temasDisponiveis.map(t => {
                        const comprou = itensComprados.includes(t.id);
                        const label = comprou ? (t.tipo === 'tema' ? 'Aplicar tema' : 'Aplicar fonte') : (t.preco === 0 ? 'Grátis' : `Comprar por ${t.preco} pts`);
                        const status = comprou ? '<div class="shop-item-status">Já adquirido</div>' : `<div class="shop-item-status">${t.preco} pts</div>`;
                        return `
                            <div class="shop-item-card">
                                <div>
                                    <h3>${this.obterNomeTema(t.id)}</h3>
                                    <p>ID: ${t.id}</p>
                                </div>
                                ${status}
                                <button class="shop-item-button" onclick="app.comprarTemaNaLoja('${t.id}')">${label}</button>
                            </div>
                        `;
                    }).join('');
                }
            },

            obterNomeTema(temaId) {
                const mapa = {
                    'light-1': 'Tema Claro 1',
                    'light-2': 'Tema Claro 2',
                    'light-3': 'Tema Claro 3',
                    'light-4': 'Tema Claro 4',
                    'light-5': 'Tema Claro 5',
                    'light-6': 'Tema Claro 6',
                    'light-7': 'Tema Claro 7',
                    'dark-1': 'Tema Escuro 1',
                    'dark-2': 'Tema Escuro 2',
                    'dark-3': 'Tema Escuro 3',
                    'dark-4': 'Tema Escuro 4',
                    'dark-5': 'Tema Escuro 5',
                    'dark-6': 'Tema Escuro 6',
                    'dark-7': 'Tema Escuro 7',
                    'inter': 'Fonte Inter',
                    'special': 'Fonte Special Elite',
                    'lobster': 'Fonte Lobster',
                    'times': 'Fonte Times New Roman',
                    'double': 'Fonte Mono Spaced',
                    'serif-bold': 'Fonte Serif Bold'
                };
                return mapa[temaId] || temaId;
            },

            obterPreviewTema(temaId) {
                const estilos = {
                    'light-1': 'background: linear-gradient(135deg,#FAF3DD,#C8D5B9);',
                    'light-2': 'background: linear-gradient(135deg,#DEE5E5,#9DC5BB);',
                    'light-3': 'background: linear-gradient(135deg,#C5EFCB,#AC8887);',
                    'light-4': 'background: linear-gradient(135deg,#D6F599,#436436);',
                    'light-5': 'background: linear-gradient(135deg,#FAF3DD,#60435F);',
                    'light-6': 'background: linear-gradient(135deg,#F19953,#2660A4);',
                    'light-7': 'background: linear-gradient(135deg,#EDF7B5,#22031F);',
                    'dark-1': 'background: linear-gradient(135deg,#222,#ffff2c);',
                    'dark-2': 'background: linear-gradient(135deg,#37392E,#F15152);',
                    'dark-3': 'background: linear-gradient(135deg,#6A041D,#B2FFA9);',
                    'dark-4': 'background: linear-gradient(135deg,#462255,#62A87C);',
                    'dark-5': 'background: linear-gradient(135deg,#011627,#EF2D56);',
                    'dark-6': 'background: linear-gradient(135deg,#183A37,#F7F0F0);',
                    'dark-7': 'background: linear-gradient(135deg,#334139,#C52184);'
                };
                return estilos[temaId] || 'background: var(--cor-principal);';
            },

            obterItemPorId(itemId) {
                return this.temasDisponiveis.find(item => item.id === itemId) || null;
            },

            itemEstaComprado(itemId) {
                if (!this.contaPadrao || !Array.isArray(this.contaPadrao.itensComprados)) return false;
                return this.contaPadrao.itensComprados.includes(itemId);
            },

            abrirConfig() {
                document.getElementById('config-screen').style.display = 'block';
                this.carregarDashboardFirebase();
                document.getElementById('modal-overlay').style.display = 'block';
                const atual = document.body.getAttribute('data-theme') || 'light-1';
                document.querySelectorAll('.theme-swatch').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-theme-value') === atual);
                });
                const modal = document.getElementById('config-modal');
                if (modal) modal.style.display = 'block';
                
            },
            async carregarDashboardFirebase() {

    if (!this.usuarioAtual) return;

    try {

        const dashboard =
            await loadDashboard(
                this.usuarioAtual
            );

        const setText = (id, valor) => {
            const el =
                document.getElementById(id);

            if (el) {
                el.textContent = valor;
            }
        };

        setText(
            'dash-total-points',
            dashboard.usuario.pontuacaoTotal
        );

        setText(
            'dash-user-level',
            dashboard.usuario.nivel
        );

        setText(
            'dash-badges',
            dashboard.badges.length
        );

        setText(
            'dash-items',
            dashboard.inventario.length
        );

    } catch (erro) {

        console.error(
            erro
        );

    }
},

            fecharConfig() {
                const configScreen = document.getElementById('config-screen');
                if (configScreen) configScreen.style.display = 'none';
                const overlay = document.getElementById('modal-overlay');
                if (overlay) overlay.style.display = 'none';
                const mainMenu = document.getElementById('main-menu');
                if (mainMenu) mainMenu.style.display = 'block';
            },

            abrirInventario() {
                const inventoryScreen = document.getElementById('inventory-screen');
                if (!inventoryScreen) return;
                inventoryScreen.style.display = 'block';
                document.getElementById('modal-overlay').style.display = 'block';
                this.renderInventario();
            },

            fecharInventario() {
                const inv = document.getElementById('inventory-screen');
                if (inv) inv.style.display = 'none';
                const overlay = document.getElementById('modal-overlay');
                if (overlay) overlay.style.display = 'none';
                const mainMenu = document.getElementById('main-menu');
                if (mainMenu) mainMenu.style.display = 'block';
            },

            renderInventario() {
                const perfil = this.contaPadrao || this.obterPerfilPadrao();
                const themeContainer = document.getElementById('inventory-theme-list');
                const fontContainer = document.getElementById('inventory-font-list');
                const temas = (perfil.itensComprados || []).filter(item => this.obterItemPorId(item)?.tipo === 'tema');
                const temaAtual = document.body.getAttribute('data-theme') || perfil.temaCurrent || 'light-1';
                const fonteAtual = this.fonteSelecionada || localStorage.getItem('fonte') || 'inter';
                const fontes = this.temasDisponiveis.filter(item => item.tipo === 'fonte');

                if (themeContainer) {
                    if (!temas.length) {
                        themeContainer.innerHTML = '<div style="color: var(--cor-texto-secundario); padding: 18px; border-radius: 14px; background: var(--bg-card);">Nenhum tema adquirido ainda.</div>';
                    } else {
                        themeContainer.innerHTML = temas.map(item => {
                            const ativo = item === temaAtual;
                            const label = ativo ? 'Ativo' : 'Aplicar';
                            return `
                                <div class="inventory-item-card ${ativo ? 'active' : ''}">
                                    <div class="inventory-item-meta">
                                        <div class="inventory-theme-preview" style="${this.obterPreviewTema(item)}"></div>
                                        <div>
                                            <div class="inventory-item-title">${this.obterNomeTema(item)}</div>
                                            <div class="inventory-item-subtitle">ID: ${item}</div>
                                        </div>
                                    </div>
                                    <button class="inventory-item-button" onclick="app.usarItemInventario('${item}')">${label}</button>
                                </div>
                            `;
                        }).join('');
                    }
                }

                if (fontContainer) {
                    fontContainer.innerHTML = fontes.map(item => {
                        const owned = perfil.itensComprados.includes(item.id);
                        const ativo = item.id === fonteAtual;
                        const label = owned ? (ativo ? 'Ativa' : 'Aplicar') : (item.preco === 0 ? 'Grátis' : `Comprar ${item.preco} pts`);
                        const action = owned ? `app.usarItemInventario('${item.id}')` : `app.comprarTemaNaLoja('${item.id}')`;
                        return `
                            <div class="inventory-item-card ${ativo ? 'active' : ''}">
                                <div>
                                    <div class="inventory-item-title">${this.obterNomeTema(item.id)}</div>
                                    <div class="inventory-item-subtitle">${owned ? 'Adquirida' : 'Bloqueada'}</div>
                                </div>
                                <button class="inventory-item-button" onclick="${action}">${label}</button>
                            </div>
                        `;
                    }).join('');
                }
            },

            usarItemInventario(itemId) {
                const item = this.obterItemPorId(itemId);
                if (item?.tipo === 'fonte') {
                    this.alterarFonte(itemId);
                } else {
                    this.setTema(itemId);
                }
                this.atualizarInfosMenu();
                this.renderInventario();
            },

            abrirEstatisticas() {
                const statsPanel = document.getElementById('stats-panel');
                if (!statsPanel) return;
                
                statsPanel.style.display = 'block';
                document.getElementById('modal-overlay').style.display = 'block';
                
                // Atualizar informações do usuário
                const nomeUsuario = this.usuarioAtual || localStorage.getItem('nomeUsuario') || 'Usuário';
                const avatar = nomeUsuario.charAt(0).toUpperCase();
                const pontos = this.gameState.pontuacao || 0;
                const nivel = this.gameState.nivelAtual || 1;
                
                document.getElementById('stats-avatar').textContent = avatar;
                document.getElementById('stats-username').textContent = nomeUsuario;
                document.getElementById('stats-points').textContent = pontos;
                document.getElementById('stats-level').textContent = nivel;
                
                // Atualizar estatísticas
                const historico = this.carregarDados('historico_' + this.usuarioAtual, []);
                const totalFases = historico.length;
                const fasesCompletas = historico.filter(h => h.acertos >= 3).length;
                const mediaAcertos = totalFases > 0 
                    ? Math.round((historico.reduce((sum, h) => sum + h.acertos, 0) / (totalFases * 5)) * 100)
                    : 0;
                
                document.getElementById('stats-media-acertos').textContent = mediaAcertos + '%';
                document.getElementById('stats-fases-completas').textContent = fasesCompletas;
                document.getElementById('stats-tempo-total').textContent = '0h 0m'; // Placeholder
                document.getElementById('stats-dicas-usadas').textContent = this.gameState.dicasUsadas || 0;
                document.getElementById('stats-auxiliares-usados').textContent = '0'; // Placeholder
                
                // Contar badges
                const perfil = this.carregarDados('usuario_' + this.usuarioAtual, this.obterPerfilPadrao());
                document.getElementById('stats-badges').textContent = (perfil.badges || []).length;
                
                // Últimas 5 fases
                const ultimasFases = historico.slice(-5).reverse();
                const containerUltimas = document.getElementById('stats-ultimas-fases');
                containerUltimas.innerHTML = '';
                
                if (ultimasFases.length === 0) {
                    containerUltimas.innerHTML = '<div style="text-align: center; color: var(--cor-texto-secundario); padding: 20px;">Nenhuma fase completada ainda</div>';
                } else {
                    ultimasFases.forEach(h => {
                        const taxaAcerto = Math.round((h.acertos / 5) * 100);
                        const statusEmoji = taxaAcerto >= 60 ? '✅' : taxaAcerto >= 40 ? '⚠️' : '❌';
                        const div = document.createElement('div');
                        div.style.cssText = 'background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;';
                        div.innerHTML = `
                            <span style="color: var(--cor-texto-secundario);">Fase ${h.fase} ${statusEmoji}</span>
                            <span style="font-weight: 600; color: var(--cor-principal);">${taxaAcerto}% (${h.acertos}/5)</span>
                        `;
                        containerUltimas.appendChild(div);
                    });
                }
            },

            fecharEstatisticas() {
                const statsPanel = document.getElementById('stats-panel');
                if (statsPanel) statsPanel.style.display = 'none';
                const overlay = document.getElementById('modal-overlay');
                if (overlay) overlay.style.display = 'none';
            },

            playlistSelecionada: null,

            selecionarPlaylist(playlist, element) {
                // Remover seleção anterior
                document.querySelectorAll('.playlist-card').forEach(card => {
                    card.classList.remove('selecionado');
                });
                
                // Adicionar seleção ao card clicado
                element.classList.add('selecionado');
                this.playlistSelecionada = playlist;
                
                // Ativar botão de confirmar
                const btnConfirmar = document.getElementById('btn-confirmar-playlist');
                if (btnConfirmar) {
                    btnConfirmar.style.opacity = '1';
                    btnConfirmar.style.pointerEvents = 'auto';
                }
            },

            confirmarPlaylist() {
                if (!this.playlistSelecionada) return;
                
                // Salvar playlist selecionada
                localStorage.setItem('playlistSelecionada', this.playlistSelecionada);
                
                // Fechar modal
                this.fecharEstatisticas();
                
                // Opcional: Mostrar confirmação
                console.log('Playlist selecionada:', this.playlistSelecionada);
            },

            alterarTamanhoFonte(tamanho) {
                if (this.usuarioAtual && this.contaPadrao) {
                    this.contaPadrao.tamanhoFonte = tamanho;
                    this.salvarDados(`usuario_${this.usuarioAtual}`, this.contaPadrao);
                }
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

            eletronegatividades: {
                1: 2.20, 2: null, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 10: null,
                11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16, 18: null,
                19: 0.82, 20: 1.00, 21: 1.36, 22: 1.54, 23: 1.63, 24: 1.66, 25: 1.55, 26: 1.83, 27: 1.88, 28: 1.91, 29: 1.90, 30: 1.65, 31: 1.81, 32: 2.01, 33: 2.18, 34: 2.55, 35: 2.96, 36: null,
                37: 0.82, 38: 0.95, 39: 1.22, 40: 1.33, 41: 1.60, 42: 2.16, 43: 1.90, 44: 2.20, 45: 2.28, 46: 2.20, 47: 1.93, 48: 1.69, 49: 1.78, 50: 1.96, 51: 2.05, 52: 2.10, 53: 2.66, 54: null,
                55: 0.79, 56: 0.89, 57: 1.10, 58: 1.12, 59: 1.13, 60: 1.14, 61: 1.13, 62: 1.17, 63: 1.20, 64: 1.20, 65: 1.10, 66: 1.22, 67: 1.23, 68: 1.24, 69: 1.25, 70: 1.10, 71: 1.27,
                72: 1.30, 73: 1.50, 74: 2.36, 75: 1.90, 76: 2.20, 77: 2.20, 78: 2.28, 79: 2.54, 80: 2.00, 81: 1.62, 82: 2.33, 83: 2.02, 84: 2.00, 85: 2.20, 86: null,
                87: 0.70, 88: 0.90, 89: 1.10, 104: 1.30, 105: 1.30, 106: 1.30, 107: 1.30, 108: 1.30, 109: 1.30, 110: 1.30, 111: 1.30, 112: 1.30, 113: 1.30, 114: 1.30, 115: 1.30, 116: 1.30, 117: 1.30, 118: 1.30,
                90: 1.30, 91: 1.20, 92: 1.38, 93: 1.36, 94: 1.28, 95: 1.30, 96: 1.30, 97: 1.30, 98: 1.30, 99: 1.30, 100: 1.30, 101: 1.30, 102: 1.30, 103: 1.30
            },

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
                this.renderizarLoja();
            },

            fecharLoja() {
                document.getElementById('shop-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
            },

            atualizarPerfil() {
                const perfil = this.contaPadrao || this.obterPerfilPadrao();
                const badgesListEl = document.getElementById('badges-list');
                const historyListEl = document.getElementById('history-list');
                const chartCanvas = document.getElementById('desempenho-chart');
                if (!badgesListEl || !historyListEl || !chartCanvas) return;

                const badges = Array.isArray(perfil.badges) ? perfil.badges : [];
                const ordemBadges = this.obterCatalogoBadges().map(b => b.nome);
                const orderedBadges = badges.slice().sort((a, b) => {
                    const idxA = ordemBadges.indexOf(a.nome);
                    const idxB = ordemBadges.indexOf(b.nome);
                    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
                });
                badgesListEl.innerHTML = '';
                if (orderedBadges.length === 0) {
                    badgesListEl.innerHTML = `<div style="color: var(--cor-texto-secundario); width:100%; text-align:center; padding:18px; background: var(--bg-card); border:1px solid var(--borda-card); border-radius: 16px;">Nenhuma conquista desbloqueada ainda. Complete fases para ganhar badges.</div>`;
                } else {
                    orderedBadges.forEach(badge => {
                        const badgeMeta = this.obterBadgeMeta(badge.nome);
                        const badgeEl = document.createElement('div');
                        badgeEl.className = 'badge-item';
                        badgeEl.dataset.tooltip = `${badge.descricao || badgeMeta.descricao || ''}${badgeMeta.pontos ? ` — +${badgeMeta.pontos} pts` : ''}`;
                        badgeEl.innerHTML = `<span>${badge.icone || badgeMeta.icone || '🏅'}</span><span>${badge.nome}</span>`;
                        badgesListEl.appendChild(badgeEl);
                    });
                }

                historyListEl.innerHTML = '';
                const historico = Array.isArray(perfil.historico) ? perfil.historico : [];
                if (historico.length === 0) {
                    historyListEl.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--cor-texto-secundario); padding: 18px;">Nenhum histórico de desempenho encontrado.</td></tr>`;
                } else {
                    historico.slice().reverse().forEach(reg => {
                        const totalPerguntas = this.questoes['nivel' + reg.fase]?.length || (reg.fase === 14 ? 10 : 5);
                        const percentual = totalPerguntas ? Math.round((reg.acertos / totalPerguntas) * 100) : 0;
                        const linha = document.createElement('tr');
                        linha.innerHTML = `
                            <td>${reg.data || '-'}</td>
                            <td>Fase ${reg.fase}</td>
                            <td>${reg.acertos}/${totalPerguntas} (${percentual}%)</td>
                            <td>${reg.pontos || 0}</td>
                        `;
                        historyListEl.appendChild(linha);
                    });
                }

                const performanceLabels = this.curriculo.flatMap(modulo => modulo.fases.map(fase => fase.tag));
                const performanceData = this.curriculo.flatMap(modulo =>
                    modulo.fases.map(fase => {
                        const registros = historico.filter(item => item.fase === fase.id);
                        if (!registros.length) return 0;
                        const totalAcertos = registros.reduce((sum, item) => sum + item.acertos, 0);
                        const totalPerguntas = registros.reduce((sum, item) => sum + (this.questoes['nivel' + fase.id]?.length || (fase.id === 14 ? 10 : 5)), 0);
                        return totalPerguntas ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;
                    })
                );

                if (this.desempenhoChart) {
                    this.desempenhoChart.destroy();
                }
                this.desempenhoChart = new Chart(chartCanvas.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: performanceLabels,
                        datasets: [{
                            label: 'Taxa de acerto (%)',
                            data: performanceData,
                            backgroundColor: performanceData.map(value => value >= 60 ? 'rgba(79, 70, 229, 0.8)' : 'rgba(249, 115, 22, 0.85)'),
                            borderColor: 'rgba(79, 70, 229, 1)',
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: { color: 'var(--cor-texto)' },
                                grid: { color: 'rgba(148, 163, 184, 0.25)' }
                            },
                            x: {
                                ticks: { color: 'var(--cor-texto)' },
                                grid: { display: false }
                            }
                        },
                        plugins: {
                            legend: { labels: { color: 'var(--cor-texto)' } },
                            tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', titleColor: '#fff', bodyColor: '#fff' }
                        }
                    }
                });
            },

            abrirPerfil() {
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'block';
                document.getElementById('profile-screen').style.display = 'block';
                this.atualizarPerfil();
            },

            fecharPerfil() {
                document.getElementById('profile-screen').style.display = 'none';
                document.getElementById('modal-overlay').style.display = 'none';
                this.carregarMenuPrincipal();
            },

            mostrarTabelaPeriodicaView(view, botao) {
                // Atualizar botões de menu
                document.querySelectorAll('.periodic-menu-btn').forEach(btn => btn.classList.remove('active'));
                if (botao) botao.classList.add('active');

                // Esconder todas as views
                document.getElementById('tabela-view').style.display = 'none';
                document.getElementById('organica-view').style.display = 'none';
                document.getElementById('misturas-view').style.display = 'none';
                document.getElementById('eletronegatividade-view').style.display = 'none';
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
                } else if (view === 'eletronegatividade') {
                    document.getElementById('eletronegatividade-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '⚡ Eletronegatividade';
                    this.renderizarEletronegatividade();
                } else if (view === 'gabaritos') {
                    document.getElementById('gabaritos-view').style.display = 'block';
                    document.getElementById('periodic-content-header').textContent = '📝 Gabaritos e Explicações';
                    this.renderizarGabaritos();
                }
            },

            faseComGabaritoLiberado(faseId) {
                const perfil = this.contaPadrao;
                if (!perfil || !Array.isArray(perfil.historico)) return false;

                const registros = perfil.historico.filter(reg => reg.fase === faseId);
                if (!registros.length) return false;

                const totalPerguntas = this.questoes['nivel' + faseId]?.length || (faseId === 14 ? 10 : 5);
                return registros.some(reg => (reg.acertos / totalPerguntas) >= 0.6);
            },

            renderizarGabaritos() {
                const container = document.getElementById('lista-gabaritos-container');
                container.innerHTML = '';

                let html = `<p style="color: var(--cor-texto-secundario); margin-bottom: 18px; font-size: 0.95rem;">Os gabaritos são liberados conforme você conclui cada fase com pelo menos 60% de acerto.</p>`;
                this.curriculo.forEach(modulo => {
                    html += `<h4 style="color: var(--cor-principal); margin-top: 25px; border-bottom: 2px solid var(--borda-card); padding-bottom: 5px;">${modulo.titulo}</h4>`;
                    
                    modulo.fases.forEach(fase => {
                        const perguntas = this.questoes['nivel' + fase.id];
                        const liberado = this.faseComGabaritoLiberado(fase.id);
                        const totalPerguntas = perguntas?.length || (fase.id === 14 ? 10 : 5);

                        if (perguntas && perguntas.length > 0) {
                            if (liberado) {
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
                            } else {
                                html += `<div style="margin: 12px 0; background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px dashed var(--borda-card); color: var(--cor-texto);">
                                    <div style="font-weight: bold; font-size: 1.05rem; margin-bottom: 8px;">Fase ${fase.tag} - ${fase.nome} <span style="color: #cc0040;">🔒</span></div>
                                    <p style="margin: 0; color: var(--cor-texto-secundario);">Gabarito disponível após completar a fase com pelo menos 60% de acerto (${totalPerguntas} perguntas).</p>
                                </div>`;
                            }
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
            renderizarEletronegatividade() {
                const grid = document.getElementById('electro-grid');
                if (grid.children.length > 0) return;

                const obterCor = valor => {
                    if (valor === null || valor === undefined) return '';
                    if (valor >= 3.8) return 'linear-gradient(135deg, #0ea5e9 0%, #0f766e 100%)';
                    if (valor >= 3.2) return 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)';
                    if (valor >= 2.6) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
                    if (valor >= 2.0) return 'linear-gradient(135deg, #fb7185 0%, #be123c 100%)';
                    return 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)';
                };

                const obterTexto = valor => valor === null || valor === undefined ? '—' : valor.toFixed(2);

                this.elementosQuimicos.filter(e => !e.serieEspecial).forEach(elem => {
                    const btn = document.createElement('button');
                    btn.className = `element-btn ${elem.tipo}`;
                    btn.dataset.numero = elem.numero;
                    const valor = this.eletronegatividades[elem.numero];
                    const cor = obterCor(valor);
                    if (cor) {
                        btn.style.background = cor;
                        btn.style.color = '#fff';
                        btn.style.borderColor = 'transparent';
                    }
                    btn.style.gridColumn = elem.coluna;
                    btn.style.gridRow = elem.linha;
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${obterTexto(valor)}</span>
                    `;
                    btn.onclick = () => this.mostrarInfoElemento(elem);
                    grid.appendChild(btn);
                });

                const lantSerieDiv = document.createElement('div');
                lantSerieDiv.className = 'lantanideos-actinideos';

                const lantLabel = document.createElement('div');
                lantLabel.style.cssText = 'grid-column: 1 / 3; font-weight: bold; font-size: 0.8rem; color: var(--cor-principal); margin-bottom: 5px;';
                lantLabel.textContent = 'LANTANÍDEOS (série 6)';
                lantSerieDiv.appendChild(lantLabel);

                this.elementosQuimicos.filter(e => e.serieEspecial && e.tipo === 'lantanideos').forEach(elem => {
                    const btn = document.createElement('button');
                    btn.className = `element-btn ${elem.tipo}`;
                    btn.dataset.numero = elem.numero;
                    const valor = this.eletronegatividades[elem.numero];
                    const cor = obterCor(valor);
                    if (cor) {
                        btn.style.background = cor;
                        btn.style.color = '#fff';
                        btn.style.borderColor = 'transparent';
                    }
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${obterTexto(valor)}</span>
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
                    btn.dataset.numero = elem.numero;
                    const valor = this.eletronegatividades[elem.numero];
                    const cor = obterCor(valor);
                    if (cor) {
                        btn.style.background = cor;
                        btn.style.color = '#fff';
                        btn.style.borderColor = 'transparent';
                    }
                    btn.innerHTML = `
                        <span class="element-num">${elem.numero}</span>
                        <span class="element-symbol">${elem.simbolo}</span>
                        <span class="element-mass">${obterTexto(valor)}</span>
                    `;
                    btn.onclick = () => this.mostrarInfoElemento(elem);
                    lantSerieDiv.appendChild(btn);
                });

                grid.parentElement.appendChild(lantSerieDiv);
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
                
                const eletroneg = this.eletronegatividades[elem.numero];
                document.getElementById('element-details').innerHTML = `
                    <div class="element-detail-item"><span class="element-detail-label">Número Atômico:</span> ${elem.numero}</div>
                    <div class="element-detail-item"><span class="element-detail-label">Massa Atômica:</span> ${elem.massaAtomica.toFixed(3)}</div>
                    <div class="element-detail-item"><span class="element-detail-label">Tipo:</span> ${tipoMap[elem.tipo] || elem.tipo}</div>
                    <div class="element-detail-item"><span class="element-detail-label">Eletronegatividade:</span> ${eletroneg === null || eletroneg === undefined ? 'N/A' : eletroneg.toFixed(2)}</div>
                    <div class="element-detail-item" style="margin-top: 15px; border-top: 1px solid var(--borda-card); padding-top: 10px;"><span class="element-detail-label">Descrição:</span><br><span style="margin-top: 8px; display: block;">${descricoes[elem.numero] || 'Elemento sintético radioativo.'}</span></div>
                `;
                
                infoDiv.classList.add('show');
            },

            filtrarPorClasse(classe, elemento) {
                const todosLegendItems = document.querySelectorAll('#periodic-table-screen .legend-item');
                const todosElementos = document.querySelectorAll('#periodic-table-screen .element-btn');
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
                    document.querySelectorAll('#periodic-table-screen .element-btn.' + classe).forEach(el => {
                        el.classList.remove('desabilitado');
                        el.classList.add('destacado');
                    });
                }
            },

            filtrarPorEletronegatividade(faixa, elemento) {
                const todosLegendItems = document.querySelectorAll('#eletronegatividade-view .legend-item');
                const todosElementos = document.querySelectorAll('#eletronegatividade-view .element-btn');
                const filtroAtivo = elemento.classList.contains('active');

                const pertenceFaixa = valor => {
                    if (valor === null || valor === undefined) return false;
                    if (faixa === 'mais') return valor >= 3.8;
                    if (faixa === 'alto') return valor >= 3.2 && valor < 3.8;
                    if (faixa === 'medio') return valor >= 2.6 && valor < 3.2;
                    if (faixa === 'baixo') return valor >= 2.0 && valor < 2.6;
                    if (faixa === 'menor') return valor < 2.0;
                    return false;
                };

                if (filtroAtivo) {
                    elemento.classList.remove('active');
                    todosElementos.forEach(el => {
                        el.classList.remove('desabilitado', 'destacado');
                    });
                    todosLegendItems.forEach(item => item.classList.remove('active'));
                } else {
                    todosLegendItems.forEach(item => item.classList.remove('active'));
                    elemento.classList.add('active');

                    todosElementos.forEach(el => {
                        el.classList.add('desabilitado');
                        el.classList.remove('destacado');
                    });

                    todosElementos.forEach(el => {
                        const numero = Number(el.dataset.numero);
                        const valor = this.eletronegatividades[numero];
                        if (pertenceFaixa(valor)) {
                            el.classList.remove('desabilitado');
                            el.classList.add('destacado');
                        }
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
                if (!this.nivelPendente || !this.tagPendente) return console.warn('Erro: Nível não foi selecionado corretamente.');
                
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
                if (!mapa[nome]) return console.warn('Erro: Auxiliar não encontrado.');
                
                this.auxiliarSelecionado = nome;
                document.querySelectorAll('.auxiliar-card').forEach(c => c.classList.remove('selecionado'));
                document.getElementById(mapa[nome]).classList.add('selecionado');
                document.getElementById('btn-confirmar-auxiliar').style.display = 'inline-block';
            },

            confirmarAuxiliar() {
                if (!this.auxiliarSelecionado) return console.warn('Selecione um auxiliar antes de continuar.');
                if (!this.nivelPendente || !this.tagPendente) return console.warn('Erro: Nível não foi selecionado corretamente.');
                
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
                if (!q) return console.warn('Erro: Pergunta não encontrada.');
                
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
                let pontosBadgeConquista = 0;
                const checarBadge = (nome, icone, desc) => {
                    if(!perfil.badges.find(b => b.nome === nome)) {
                        const meta = this.obterBadgeMeta(nome);
                        const pontosExtras = meta.pontos || 0;
                        perfil.badges.push({ nome, icone, descricao: desc, pontos: pontosExtras });
                        if (pontosExtras) {
                            perfil.pontuacaoTotal += pontosExtras;
                            pontosBadgeConquista += pontosExtras;
                        }
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
                if (avisoBadge) {
                    if (ganhouBadge) {
                        avisoBadge.textContent = pontosBadgeConquista > 0 ? `🎉 Nova badge desbloqueada! +${pontosBadgeConquista} pts` : '🎉 Nova badge desbloqueada! Verifique seu perfil.';
                        avisoBadge.style.display = 'block';
                    } else {
                        avisoBadge.style.display = 'none';
                    }
                }

                if (ganhouBadge) this.tocarSom('conquista');
                const venceuFase = this.gameState.nivelAtual === 14 ? this.gameState.acertos >= 6 : this.gameState.acertos >= 3;
                this.tocarSom(venceuFase ? 'vitoria' : 'derrota');
                document.getElementById('total-points-hud').textContent = perfil.pontuacaoTotal;

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
                const shopScreen = document.getElementById('shop-screen');
                if (shopScreen) shopScreen.style.display = 'none';
                
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
                const item = this.obterItemPorId(idFonte);
                if (item && item.tipo === 'tema') {
                    console.warn('Use setTema para itens de tema.');
                    return;
                }
                if (item && !this.itemEstaComprado(idFonte)) {
                    console.warn('Você precisa comprar essa fonte na loja antes de usar.');
                    return;
                }
                document.body.setAttribute('data-font', idFonte);
                this.fonteSelecionada = idFonte;
                localStorage.setItem('fonte', idFonte);
                document.querySelectorAll('.font-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('#inventory-screen .inventory-item-card').forEach(card => {
                    card.classList.toggle('active', card.querySelector('.inventory-item-title')?.textContent === this.obterNomeTema(idFonte));
                });
                if (typeof this.renderInventario === 'function') {
                    this.renderInventario();
                }
            },

            carregarFonteSalva() {
                const fonteSalva = localStorage.getItem('fonte') || 'inter';
                this.alterarFonte(fonteSalva);
            }
        };

        app.inicializarSons();
        app.carregarConfiguracoesSalvas();

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

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            app.fecharTudoComOverlay();
        });
    }
});

document.addEventListener('keydown', (event) => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])';
    const elements = Array.from(document.querySelectorAll(focusableElements)).filter(el => {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });

    const currentIdx = elements.indexOf(document.activeElement);
    let nextIdx = -1;

    if (currentIdx === -1 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        elements[0]?.focus();
        return;
    }

    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault();
            nextIdx = (currentIdx + 1) % elements.length;
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault();
            nextIdx = (currentIdx - 1 + elements.length) % elements.length;
            break;
    }

    if (nextIdx !== -1) {
        elements[nextIdx]?.focus();
    }
});