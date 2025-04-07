import { db, collection, getDocs, query, where } from "../firebase_config_test.js";
//import { db, collection, getDocs, query, where } from "../firebase_config.js";

//const { db, collection, getDocs, query, where } = require("../firebase_config.js");

//import { db, getDocs, collection, query, where } from "../firebase_config.js";

class Dashboard {
    constructor() {
        
        this.entrada = 0;
        this.saida = 0;
        this.produtos = 0;
        this.clientes = 0;
        this.funcionarios = 0;
    }

    async carregarDados() {
        try {
            
            const movimentacoesRef = collection(db, "movimentacoes");
            this.entrada = (await getDocs(query(movimentacoesRef, where("tipo", "==", "entrada")))).size;
            this.saida = (await getDocs(query(movimentacoesRef, where("tipo", "==", "saida")))).size;
            
            this.produtos = (await getDocs(collection(db, "cardapio"))).size;
            this.clientes = (await getDocs(collection(db, "cliente"))).size;
            this.funcionarios = (await getDocs(collection(db, "funcionarios"))).size;
            
            return {
                vendas: this.vendas,
                entrada: this.entrada,
                saida: this.saida,
                produtos: this.produtos,
                clientes: this.clientes,
                funcionarios: this.funcionarios,
            };
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard: ", error);
            return null;
        }
    }
}

export default Dashboard;
