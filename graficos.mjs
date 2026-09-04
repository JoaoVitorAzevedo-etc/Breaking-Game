export function registrarDesempenhoGrafico(perfil, resultado) {
    if (!perfil.graficos) perfil.graficos = [];
    perfil.graficos.push({
        data: resultado.data || new Date().toISOString(),
        propriedade: resultado.propriedade,
        dificuldade: resultado.dificuldade,
        precisao: Number(resultado.precisao) || 0,
        pontos: Number(resultado.pontos) || 0
    });
    perfil.graficos = perfil.graficos.slice(-12);
}

export function resumirDesempenhoGrafico(perfil) {
    const registros = Array.isArray(perfil?.graficos) ? perfil.graficos : [];
    return {
        labels: registros.map((registro, index) => `${registro.propriedade || 'Rodada'} ${index + 1}`),
        precisao: registros.map(registro => registro.precisao),
        pontos: registros.map(registro => registro.pontos)
    };
}
