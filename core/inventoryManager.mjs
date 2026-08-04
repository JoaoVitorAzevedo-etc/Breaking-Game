export class InventoryManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  adicionarItem(item) {
    const itens = this.appContext.state.inventario.itens || [];
    if (!itens.includes(item)) itens.push(item);
    this.appContext.state.inventario.itens = itens;
    return itens;
  }

  adicionarTema(tema) {
    const temas = this.appContext.state.inventario.temas || [];
    if (!temas.includes(tema)) temas.push(tema);
    this.appContext.state.inventario.temas = temas;
    return temas;
  }

  adicionarFonte(fonte) {
    const fontes = this.appContext.state.inventario.fontes || [];
    if (!fontes.includes(fonte)) fontes.push(fonte);
    this.appContext.state.inventario.fontes = fontes;
    return fontes;
  }

  adicionarEquipamento(equipamento) {
    const equipamentos = this.appContext.state.inventario.equipamentos || [];
    if (!equipamentos.includes(equipamento)) equipamentos.push(equipamento);
    this.appContext.state.inventario.equipamentos = equipamentos;
    return equipamentos;
  }

  ativarItem(item) {
    this.appContext.state.inventario.itemAtivo = item;
    return item;
  }

  comprar(item) {
    this.appContext.state.inventario.itensComprados = this.appContext.state.inventario.itensComprados || [];
    if (!this.appContext.state.inventario.itensComprados.includes(item)) {
      this.appContext.state.inventario.itensComprados.push(item);
    }
    return this.appContext.state.inventario.itensComprados;
  }

  desbloquear(item) {
    this.appContext.state.inventario.itensDesbloqueados = this.appContext.state.inventario.itensDesbloqueados || [];
    if (!this.appContext.state.inventario.itensDesbloqueados.includes(item)) {
      this.appContext.state.inventario.itensDesbloqueados.push(item);
    }
    return this.appContext.state.inventario.itensDesbloqueados;
  }
}
