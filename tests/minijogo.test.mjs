import test from 'node:test';
import assert from 'node:assert/strict';
import { pontuarEntrega, receitas, validarMistura } from '../game/minijogo-misturas.mjs';

test('valida a receita sem depender da ordem dos componentes', () => {
    const bancada = new Map([['nacl', 1], ['agua', 99]]);
    const resultado = validarMistura(bancada, receitas.find(receita => receita.id === 'soro-fisiologico'));

    assert.equal(resultado.ok, true);
    assert.deepEqual(resultado.erros, []);
});

test('aceita as proporções de todas as receitas iniciais', () => {
    const preparos = [
        { id: 'areia-sal', bancada: { areia: 1, nacl: 1 } },
        { id: 'soro-fisiologico', bancada: { agua: 99, nacl: 1 } },
        { id: 'alcool-70', bancada: { alcool: 73, agua: 27 } },
        { id: 'solucao-01m', bancada: { 'solucao-estoque-nacl': 10, agua: 90 } },
        { id: 'agua-sanitaria', bancada: { agua: 3, hipoclorito: 1 } }
    ];

    preparos.forEach(preparo => {
        const receita = receitas.find(item => item.id === preparo.id);
        assert.equal(validarMistura(preparo.bancada, receita).ok, true, preparo.id);
    });
});

test('informa ingredientes ausentes e componentes excedentes', () => {
    const resultado = validarMistura(
        { agua: 90, nacl: 10, areia: 20 },
        receitas.find(receita => receita.id === 'soro-fisiologico')
    );

    assert.equal(resultado.ok, false);
    assert.ok(resultado.erros.some(erro => erro.id === 'areia' && erro.alvo === 0));
    assert.ok(resultado.erros.some(erro => erro.id === 'nacl'));
});

test('retorna erro explícito para uma bancada vazia', () => {
    assert.deepEqual(
        validarMistura({}, receitas[0]),
        { ok: false, erros: [], mensagem: 'Bancada vazia' }
    );
});

test('pontua uma entrega correta com 100 pontos', () => {
    assert.equal(pontuarEntrega({ ok: true, erros: [] }), 100);
});

test('desconta 25 pontos por ingrediente fora da proporção', () => {
    assert.equal(pontuarEntrega({ ok: false, erros: [{ id: 'agua' }, { id: 'nacl' }] }), 50);
    assert.equal(pontuarEntrega({ ok: false, erros: [{ id: 'agua' }, { id: 'nacl' }, { id: 'areia' }, { id: 'oleo' }] }), 0);
});
