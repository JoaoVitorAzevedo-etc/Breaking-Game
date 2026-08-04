export class ShopManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  comprar(item, custo = 0) {
    const saldo = this.appContext.state.game.moedas || 0;
    if (saldo < custo) return false;
    this.appContext.state.game.moedas = saldo - custo;
    this.appContext.state.inventario.itensComprados = this.appContext.state.inventario.itensComprados || [];
    if (!this.appContext.state.inventario.itensComprados.includes(item)) {
      this.appContext.state.inventario.itensComprados.push(item);
    }
    return true;
  }

  vender(item) {
    this.appContext.state.inventario.itensComprados = this.appContext.state.inventario.itensComprados || [];
    this.appContext.state.inventario.itensComprados = this.appContext.state.inventario.itensComprados.filter((entry) => entry !== item);
    return this.appContext.state.inventario.itensComprados;
  }

  saldo() {
    return this.appContext.state.game.moedas || 0;
  }

  validarCompra(item, custo = 0) {
    return this.comprar(item, custo);
  }

  equiparItem(item) {
    this.appContext.state.inventario.itemAtivo = item;
    return item;
  }

  atualizarInventario() {
    return this.appContext.state.inventario;
  }
}
