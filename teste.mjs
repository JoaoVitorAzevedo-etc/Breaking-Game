/* ============================================================
 * MAIN.MJS
 * Cérebro central da aplicação
 * ============================================================
 */


/* ============================================================
 * COMPONENTS
 * ============================================================
 */

import * as Graficos from "./components/graficos.mjs";
import * as HUD from "./components/hud.mjs";
import * as Modal from "./components/modal.mjs";
import * as Notificacoes from "./components/notificacoes.mjs";


/* ============================================================
 * FIREBASE
 * ============================================================
 */

import {
    app,
    db,
    auth
} from "./firebase/config.mjs";

import * as FirebaseAuth from "./firebase/auth.mjs";

import * as Firestore from "./firebase/firestore.mjs";


/* ============================================================
 * GAME
 * ============================================================
 */

import * as Auxiliares from "./game/auxiliares.mjs";
import * as Conceitos from "./game/conceitos.mjs";
import * as Fases from "./game/fases.mjs";
import * as GameEngine from "./game/gameEngine.mjs";
import * as Historico from "./game/historico.mjs";
import * as Inventario from "./game/inventario.mjs";
import * as Perguntas from "./game/perguntas.mjs";
import * as Pontuacao from "./game/pontuacao.mjs";
import * as Progresso from "./game/progresso.mjs";


/* ============================================================
 * SERVICES
 * ============================================================
 */

import * as BadgeService from "./services/badgeService.mjs";
import * as EstatisticasService from "./services/estatisticasService.mjs";
import * as LojaService from "./services/lojaService.mjs";
import * as RankingService from "./services/rankingService.mjs";
import * as UsuarioService from "./services/usuarioService.mjs";


/* ============================================================
 * UI
 * ============================================================
 */

import * as Dashboard from "./ui/dashboard.mjs";


/* ============================================================
 * UTILS
 * ============================================================
 */

import * as Constants from "./utils/constants.mjs";
import * as Helpers from "./utils/helpers.mjs";
import * as Storage from "./utils/storage.mjs";


/* ============================================================
 * APP
 * ============================================================
 */

import * as App from "./app.mjs";
/* ============================================================
 * ESTADO GLOBAL DA APLICAÇÃO
 * ============================================================
 */

export const AppState = {

    /* ========================================================
     * Aplicação
     * ========================================================
     */

    iniciada: false,
    carregando: false,
    online: navigator.onLine,


    /* ========================================================
     * Firebase
     * ========================================================
     */

    firebase: {
        app,
        auth,
        db
    },


    /* ========================================================
     * Autenticação
     * ========================================================
     */

    auth: {

        usuario: null,

        uid: null,

        autenticado: false,

        perfil: null,

        permissoes: []

    },


    /* ========================================================
     * Configurações
     * ========================================================
     */

    configuracoes: {},


    /* ========================================================
     * Dados carregados
     * ========================================================
     */

    dados: {

        usuario: {},

        estatisticas: {},

        inventario: {},

        progresso: {},

        historico: {},

        ranking: {},

        loja: {},

        perguntas: {},

        fases: {},

        badges: {}

    },


    /* ========================================================
     * Cache
     * ========================================================
     */

    cache: new Map(),


    /* ========================================================
     * Firestore Listeners
     * ========================================================
     */

    listeners: {


        usuario: null,

        progresso: null,

        inventario: null,

        historico: null,

        ranking: null,

        estatisticas: null,

        loja: null,

        perguntas: null,

        fases: null

    },


    /* ========================================================
     * Interface
     * ========================================================
     */

    ui: {

        dashboardCarregado: false,

        modalAberto: false,

        notificacoesAtivas: 0

    }

};
/* ============================================================
 * CONSTANTES DO MAIN
 * ============================================================
 */

const APP = {

    nome: "TCC",

    versao: "1.0.0",

    ambiente: "production"

};


const FIRESTORE = {

    colecoes: {

        usuarios: "usuarios",

        progresso: "progresso",

        perguntas: "perguntas",

        fases: "fases",

        historico: "historico",

        inventario: "inventario",

        ranking: "ranking",

        estatisticas: "estatisticas",

        badges: "badges",

        loja: "loja",

        configuracoes: "configuracoes"

    }

};


const EVENTOS = {

    LOGIN: "login",

    LOGOUT: "logout",

    AUTH_READY: "auth-ready",

    DADOS_CARREGADOS: "dados-carregados",

    DADOS_ATUALIZADOS: "dados-atualizados",

    FIRESTORE_SYNC: "firestore-sync",

    FIREBASE_ERRO: "firebase-erro",

    CONEXAO_ONLINE: "online",

    CONEXAO_OFFLINE: "offline",

    APP_READY: "app-ready"

};


const ROTAS = {

    dashboard: "dashboard",

    jogo: "jogo",

    historico: "historico",

    ranking: "ranking",

    inventario: "inventario",

    loja: "loja"

};


const TEMPO = {

    splash: 1500,

    notificacao: 3000,

    debouncePesquisa: 300,

    sincronizacao: 10000

};
/* ============================================================
 * BOOTSTRAP DA APLICAÇÃO
 * ============================================================
 */

async function bootstrap() {

    try {

        console.group("🚀 Inicializando aplicação");

        Loading.show("Inicializando aplicação...");

        AppState.carregando = true;

        /* ==========================================
         * Eventos globais
         * ==========================================
         */

        registrarEventosGlobais();

        /* ==========================================
         * Verifica conexão
         * ==========================================
         */

        verificarConexao();

        /* ==========================================
         * Inicia Firebase
         * ==========================================
         */

        await inicializarFirebase();

        /* ==========================================
         * Inicializa interface
         * ==========================================
         */

        await inicializarInterface();

        /* ==========================================
         * Finalização
         * ==========================================
         */

        AppState.iniciada = true;
        AppState.carregando = false;

        Loading.hide();

        console.log("✅ Aplicação iniciada.");

        window.dispatchEvent(
            new CustomEvent(EVENTOS.APP_READY)
        );

        console.groupEnd();

    }

    catch (erro) {

        console.error("Erro ao iniciar aplicação:", erro);

        Loading.hide();

        Toast.error(
            "Não foi possível iniciar a aplicação."
        );

    }

}
/* ============================================================
 * EVENTOS GLOBAIS
 * ============================================================
 */

function registrarEventosGlobais() {

    console.log("Registrando eventos globais...");


    /* ========================================================
     * CONEXÃO
     * ========================================================
     */

    window.addEventListener("online", () => {

        AppState.online = true;

        console.log("🌐 Conexão restaurada.");

        Notificacoes.sucesso("Conexão restabelecida.");

        window.dispatchEvent(
            new CustomEvent(EVENTOS.CONEXAO_ONLINE)
        );

    });


    window.addEventListener("offline", () => {

        AppState.online = false;

        console.warn("📡 Aplicação offline.");

        Notificacoes.aviso("Você está sem conexão.");

        window.dispatchEvent(
            new CustomEvent(EVENTOS.CONEXAO_OFFLINE)
        );

    });


    /* ========================================================
     * VISIBILIDADE DA ABA
     * ========================================================
     */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            console.log("Aplicação em segundo plano.");

            return;

        }

        console.log("Aplicação voltou ao primeiro plano.");

    });


    /* ========================================================
     * REDIMENSIONAMENTO
     * ========================================================
     */

    window.addEventListener("resize", () => {

        HUD.atualizarLayout?.();

        Dashboard.redimensionar?.();

    });


    /* ========================================================
     * FECHAMENTO DA PÁGINA
     * ========================================================
     */

    window.addEventListener("beforeunload", () => {

        finalizarListenersFirestore();

    });


    /* ========================================================
     * EVENTOS INTERNOS DA APLICAÇÃO
     * ========================================================
     */

    window.addEventListener(EVENTOS.LOGIN, () => {

        console.log("Evento LOGIN recebido.");

    });


    window.addEventListener(EVENTOS.LOGOUT, () => {

        console.log("Evento LOGOUT recebido.");

    });


    window.addEventListener(EVENTOS.DADOS_CARREGADOS, () => {

        console.log("Dados carregados.");

    });


    window.addEventListener(EVENTOS.DADOS_ATUALIZADOS, () => {

        console.log("Dados sincronizados.");

    });


    window.addEventListener(EVENTOS.FIRESTORE_SYNC, () => {

        console.log("Firestore sincronizado.");

    });

}
/* ============================================================
 * FIREBASE
 * Inicialização do Firebase e autenticação
 * ============================================================
 */

async function inicializarFirebase() {

    console.group("🔥 Firebase");

    try {

        if (!app) {
            throw new Error("Firebase App não inicializado.");
        }

        if (!auth) {
            throw new Error("Firebase Auth não encontrado.");
        }

        if (!db) {
            throw new Error("Firestore não encontrado.");
        }

        console.log("Firebase conectado.");

        /* ==========================================
         * Aguarda autenticação
         * ==========================================
         */

        await aguardarAutenticacao();

        console.groupEnd();

    }

    catch (erro) {

        console.error("Erro ao inicializar Firebase:", erro);

        Toast.erro(
            "Erro ao conectar com o Firebase."
        );

        throw erro;

    }

}
/* ============================================================
 * AGUARDA AUTENTICAÇÃO
 * ============================================================
 */

function aguardarAutenticacao() {

    return new Promise((resolve, reject) => {

        try {

            onAuthStateChanged(auth, async (usuario) => {

                try {

                    /* ======================================
                     * Usuário autenticado
                     * ======================================
                     */

                    if (usuario) {

                        console.log(
                            "Usuário autenticado:",
                            usuario.uid
                        );

                        AppState.auth.usuario = usuario;

                        AppState.auth.uid = usuario.uid;

                        AppState.auth.autenticado = true;

                        await carregarUsuario();

                        await carregarConfiguracoes();

                        iniciarListenersFirestore();

                        inicializarModulos();

                        window.dispatchEvent(
                            new CustomEvent(EVENTOS.LOGIN)
                        );

                    }

                    /* ======================================
                     * Usuário não autenticado
                     * ======================================
                     */

                    else {

                        console.log("Nenhum usuário autenticado.");

                        AppState.auth.usuario = null;

                        AppState.auth.uid = null;

                        AppState.auth.autenticado = false;

                        finalizarListenersFirestore();

                        Router.irParaLogin?.();

                        window.dispatchEvent(
                            new CustomEvent(EVENTOS.LOGOUT)
                        );

                    }

                    resolve();

                }

                catch (erroInterno) {

                    reject(erroInterno);

                }

            });

        }

        catch (erro) {

            reject(erro);

        }

    });

}
/* ============================================================
 * CARREGAMENTO DO USUÁRIO
 * ============================================================
 */

async function carregarUsuario() {

    console.group("👤 Carregando usuário");

    try {

        const uid = AppState.auth.uid;

        if (!uid) {
            throw new Error("UID do usuário não encontrado.");
        }

        const usuario = await Firestore.getUsuario(uid);

        if (!usuario) {
            throw new Error("Documento do usuário não encontrado.");
        }

        /* ==========================================
         * Salva no AppState
         * ==========================================
         */

        AppState.dados.usuario = usuario;

        AppState.auth.perfil = usuario.perfil ?? null;

        AppState.auth.permissoes = usuario.permissoes ?? [];

        console.log("Usuário carregado.");

        window.dispatchEvent(
            new CustomEvent(EVENTOS.DADOS_CARREGADOS, {
                detail: {
                    modulo: "usuario"
                }
            })
        );

        console.groupEnd();

    }

    catch (erro) {

        console.error("Erro ao carregar usuário:", erro);

        Toast.erro(
            "Não foi possível carregar os dados do usuário."
        );

        throw erro;

    }

}
/* ============================================================
 * CONFIGURAÇÕES
 * ============================================================
 */

async function carregarConfiguracoes() {

    console.group("⚙️ Carregando configurações");

    try {

        const configuracoes =
            await Firestore.getConfiguracoes();

        AppState.configuracoes =
            configuracoes ?? {};

        console.log("Configurações carregadas.");

        console.groupEnd();

    }

    catch (erro) {

        console.error(erro);

        AppState.configuracoes = {};

    }

}
/* ============================================================
 * INICIALIZAÇÃO DOS MÓDULOS
 * ============================================================
 */

function inicializarModulos() {

    console.group("📦 Inicializando módulos");

    try {

        Dashboard.init?.(AppState);

        GameEngine.init?.(AppState);

        Inventario.init?.(AppState);

        Historico.init?.(AppState);

        Pontuacao.init?.(AppState);

        Progresso.init?.(AppState);

        Perguntas.init?.(AppState);

        Conceitos.init?.(AppState);

        Fases.init?.(AppState);

        BadgeService.init?.(AppState);

        RankingService.init?.(AppState);

        LojaService.init?.(AppState);

        EstatisticasService.init?.(AppState);

        UsuarioService.init?.(AppState);

        console.log("Todos os módulos inicializados.");

        console.groupEnd();

    }

    catch (erro) {

        console.error(erro);

        Toast.erro(
            "Erro ao iniciar os módulos."
        );

    }

}
