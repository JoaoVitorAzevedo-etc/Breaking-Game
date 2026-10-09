export const componentes = [
    { id: 'agua', nome: 'Água', tipo: 'líquido', estoqueInicial: 500 },
    { id: 'nacl', nome: 'Cloreto de sódio (NaCl)', tipo: 'sólido', estoqueInicial: 100 },
    { id: 'areia', nome: 'Areia', tipo: 'sólido', estoqueInicial: 100 },
    { id: 'alcool', nome: 'Álcool 96% (estoque)', tipo: 'líquido', estoqueInicial: 200 },
    { id: 'hipoclorito', nome: 'Solução estoque de hipoclorito 10% (m/v)', tipo: 'líquido', estoqueInicial: 100 },
    { id: 'solucao-estoque-nacl', nome: 'Solução estoque de NaCl 1 mol/L', tipo: 'líquido', estoqueInicial: 100 }
];

// DECISÃO: cada clique representa 1 g para sólidos ou 1 mL para líquidos, para permitir proporções precisas.
export const receitas = [
    {
        id: 'areia-sal',
        nome: 'Mistura de areia e sal',
        fase: 1,
        ingredientes: { areia: 50, nacl: 50 },
        tolerancia: 3,
        explicacao: 'A areia e o sal formam uma mistura heterogênea. É possível dissolver o sal em água, filtrar a areia e recuperar o sal por evaporação.'
    },
    {
        id: 'soro-fisiologico',
        nome: 'Soro fisiológico 0,9%',
        fase: 7,
        ingredientes: { agua: 99.1, nacl: 0.9 },
        tolerancia: 0.2,
        explicacao: 'A concentração de 0,9% do soro é expressa como massa por volume: 0,9 g de NaCl para cada 100 mL de solução. A bancada usa porções numéricas como aproximação didática; uma preparação real exige medida de massa e volume final.'
    },
    {
        id: 'alcool-70',
        nome: 'Álcool 70%',
        fase: 7,
        ingredientes: { alcool: 72.9, agua: 27.1 },
        tolerancia: 1,
        explicacao: 'Para obter 100 mL a 70% (v/v), usam-se aproximadamente 72,9 mL de álcool 96% e completa-se o volume com água. A bancada aproxima o volume final pela soma das porções; na prática, a contração de volume exige completar até a marca de 100 mL.'
    },
    {
        id: 'solucao-01m',
        nome: 'Solução de NaCl 0,1 mol/L',
        fase: 7,
        ingredientes: { 'solucao-estoque-nacl': 10, agua: 90 },
        tolerancia: 1,
        explicacao: 'A diluição de 10 mL de uma solução estoque 1 mol/L até 100 mL resulta em 0,1 mol/L. A relação usada é C₁V₁ = C₂V₂; a água completa o volume final.'
    },
    {
        id: 'agua-sanitaria',
        nome: 'Água sanitária (simulação 2,5%)',
        fase: 8,
        ingredientes: { agua: 75, hipoclorito: 25 },
        tolerancia: 1,
        explicacao: 'Nesta simulação, 25 mL de uma solução estoque a 10% (m/v), completados até 100 mL, resultam em uma solução a 2,5% (m/v). A água sanitária real varia conforme o rótulo; nunca a misture com ácidos ou outros produtos de limpeza.'
    }
];

function obterQuantidade(bancada, id) {
    const quantidade = bancada instanceof Map ? bancada.get(id) : bancada?.[id];
    return Number.isFinite(quantidade) && quantidade > 0 ? quantidade : 0;
}

export function validarMistura(bancada, receita) {
    const idsBancada = bancada instanceof Map ? [...bancada.keys()] : Object.keys(bancada || {});
    const idsConhecidos = new Set([...idsBancada, ...componentes.map(componente => componente.id)]);
    const total = [...idsConhecidos].reduce((soma, id) => soma + obterQuantidade(bancada, id), 0);

    if (total === 0) return { ok: false, erros: [], mensagem: 'Bancada vazia' };

    const ingredientes = receita.ingredientes;
    const idsIngredientes = new Set([...Object.keys(ingredientes), ...idsConhecidos]);
    const erros = [];

    idsIngredientes.forEach(id => {
        const quantidade = obterQuantidade(bancada, id);
        const real = quantidade / total * 100;
        const alvo = ingredientes[id] || 0;
        if (Math.abs(real - alvo) > receita.tolerancia) erros.push({ id, real, alvo });
    });

    return { ok: erros.length === 0, erros, total };
}

export function pontuarEntrega(resultado) {
    if (!resultado || resultado.mensagem === 'Bancada vazia') return 0;
    return Math.max(0, 100 - 25 * resultado.erros.length);
}
