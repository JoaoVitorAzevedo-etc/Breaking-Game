const dificuldades = new Map([
    ['facil', 'facil'],
    ['medio', 'medio'],
    ['dificil', 'dificil'],
    ['vestibular', 'vestibular']
]);

const normalizarTexto = texto => texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

function extrairOpcoes(texto, resposta) {
    const marcadores = [...texto.matchAll(/(?:^|\s)([a-d])\)\s+/g)].map(match => ({
        letra: match[1],
        inicio: match.index + match[0].length
    }));
    const candidatos = [];

    marcadores.forEach((marcador, indice) => {
        if (marcador.letra !== 'a') return;

        let quantidade = 1;
        while (
            indice + quantidade < marcadores.length
            && marcadores[indice + quantidade].letra === String.fromCharCode(97 + quantidade)
        ) {
            quantidade++;
        }

        if (quantidade >= 2 && [...marcadores.slice(indice, indice + quantidade)].some(opcao => opcao.letra === resposta)) {
            candidatos.push({ indice, quantidade });
        }
    });

    const candidato = candidatos.sort((a, b) => b.quantidade - a.quantidade || a.indice - b.indice)[0];
    if (!candidato) throw new Error(`Não foi possível identificar as alternativas: ${texto}`);

    const opcoes = marcadores.slice(candidato.indice, candidato.indice + candidato.quantidade).map((marcador, indice) => {
        const proximo = marcadores[candidato.indice + indice + 1];
        const fim = proximo ? proximo.inicio - (marcadores[candidato.indice + indice + 1].letra.length + 2) : texto.length;
        return texto.slice(marcador.inicio, fim).trim().replace(/\.$/, '');
    });
    const inicioEnunciado = marcadores[candidato.indice].inicio - 3;

    return {
        pergunta: texto.slice(0, inicioEnunciado).trim().replace(/[:.]\s*$/, ''),
        opcoes,
        resposta: 'abcd'.indexOf(resposta)
    };
}

export function parseBancoPerguntas(markdown) {
    const fases = {};
    const resumosDificuldade = {};
    let faseAtual = null;
    let dificuldadeAtual = null;
    let lendoResumos = false;

    for (const linha of markdown.split(/\r?\n/)) {
        const cabecalhoFase = linha.match(/^## FASE (\d+):/i);
        if (cabecalhoFase) {
            faseAtual = Number(cabecalhoFase[1]);
            fases[faseAtual] = {};
            dificuldadeAtual = null;
            lendoResumos = false;
            continue;
        }

        if (/^#+ RESUMOS DE CONCEITO/i.test(linha)) {
            faseAtual = null;
            dificuldadeAtual = null;
            lendoResumos = true;
            continue;
        }

        const cabecalhoDificuldade = linha.match(/^### (.+)$/);
        if (cabecalhoDificuldade && faseAtual !== null) {
            const dificuldade = dificuldades.get(normalizarTexto(cabecalhoDificuldade[1].trim()));
            if (!dificuldade) throw new Error(`Dificuldade desconhecida no banco: ${cabecalhoDificuldade[1]}`);
            dificuldadeAtual = dificuldade;
            fases[faseAtual][dificuldade] = [];
            continue;
        }

        if (lendoResumos) {
            const resumo = linha.match(/^\*\*(.+?):\*\*\s*(.+)$/);
            if (resumo) {
                const dificuldade = dificuldades.get(normalizarTexto(resumo[1].trim()));
                if (dificuldade) resumosDificuldade[dificuldade] = resumo[2].trim();
            }
            continue;
        }

        if (faseAtual === null || dificuldadeAtual === null || !/^\d+\.\s/.test(linha)) continue;

        const textoPergunta = linha.replace(/^\d+\.\s*/, '');
        const respostaMatch = textoPergunta.match(/\*\*Resposta:\s*([a-d])\*\*\s*$/i);
        if (!respostaMatch) throw new Error(`Resposta não encontrada na fase ${faseAtual}: ${linha}`);

        const texto = textoPergunta.slice(0, respostaMatch.index).trim();
        const pergunta = extrairOpcoes(texto, respostaMatch[1].toLowerCase());
        const explicacao = pergunta.opcoes[pergunta.resposta].match(/\(([^()]*)\)/)?.[1]
            || `A alternativa correta é ${pergunta.opcoes[pergunta.resposta]}.`;

        fases[faseAtual][dificuldadeAtual].push({
            pergunta: pergunta.pergunta,
            opcoes: pergunta.opcoes,
            resposta: pergunta.resposta,
            explicacao,
            dica: 'Releia o conceito e compare as alternativas antes de responder.'
        });
    }

    const dificuldadesEsperadas = [...dificuldades.values()];
    const fasesEsperadas = Array.from({ length: 13 }, (_, indice) => indice + 1);
    if (JSON.stringify(Object.keys(fases).map(Number)) !== JSON.stringify(fasesEsperadas)) {
        throw new Error('O banco deve conter as 13 fases em ordem.');
    }

    for (const numeroFase of fasesEsperadas) {
        for (const dificuldade of dificuldadesEsperadas) {
            if (fases[numeroFase][dificuldade]?.length !== 5) {
                throw new Error(`A fase ${numeroFase} deve conter 5 perguntas de nível ${dificuldade}.`);
            }
        }
    }

    for (const dificuldade of dificuldadesEsperadas) {
        if (!resumosDificuldade[dificuldade]) {
            throw new Error(`Resumo de conceito ausente para o nível ${dificuldade}.`);
        }
    }

    return { fases, resumosDificuldade };
}
