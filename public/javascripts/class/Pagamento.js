class Pagamento {
    constructor(metodo, valor) {
        this.metodo = metodo;
        this.valor = valor;
        this.data = new Date();
    }

    static getMetodosPagamento() {
        return [
            "Dinheiro",
            "Cartão de Crédito",
            "Cartão de Débito",
            "PIX",
            "Boleto"
        ];
    }

    getDetalhes() {
        return {
            metodo: this.metodo,
            valor: this.valor,
            data: this.data
        };
    }
}

export default Pagamento;