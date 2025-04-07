import { db, collection, addDoc, getDocs, query, where, limit } from "../firebase_config_test.js";
import Pagamento from "./Pagamento.js";

class Pedido {
    
    /**
     * Busca a lista de funcionários disponíveis
     * @returns {Promise<Array>} 
     */
    async buscarFuncionarios() {
        try {
            const querySnapshot = await getDocs(collection(db, "funcionarios"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            return [];
        }
    }
    
    /**
     * Busca um funcionário pelo ID
     * @param {string} id 
     * @returns {Promise<Object|null>}
     */
    async getFuncionario(id) {
        if (!id) return null;
        
        try {
            const funcionarios = await this.buscarFuncionarios();
            return funcionarios.find(f => f.id === id) || null;
        } catch (error) {
            console.error("Erro ao buscar funcionário:", error);
            return null;
        }
    }
    
    /**
     * Finaliza um pedido
     * @param {string} funcionarioId 
     * @param {string} clienteId 
     * @param {Array} itens 
     * @param {string} metodoPagamento 
     * @returns {Promise<Object>}
     */
    async finalizarPedido(funcionarioId, clienteId, itens, metodoPagamento) {
        // Validação dos campos
        if (!funcionarioId) {
            return {
                sucesso: false,
                erro: "Por favor, selecione um funcionário."
            };
        }
        
        if (!clienteId) {
            return {
                sucesso: false,
                erro: "Por favor, busque ou cadastre um cliente."
            };
        }
        
        if (!metodoPagamento) {
            return {
                sucesso: false,
                erro: "Por favor, selecione uma forma de pagamento."
            };
        }
        
        if (!itens || itens.length === 0) {
            return {
                sucesso: false,
                erro: "Seu carrinho está vazio. Adicione itens antes de finalizar o pedido."
            };
        }
        
        // Calcular total do pedido
        const totalPedido = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        
        // Criar objeto de pagamento
        const pagamento = new Pagamento(metodoPagamento, totalPedido);
        
        // Criar objeto de pedido
        const pedido = {
            funcionarioId: funcionarioId,
            clienteId: clienteId,
            itens: itens.map(item => {
                return {
                    imageUrl: item.imagem,
                    nome: item.nome,
                    quantidade: item.quantidade,
                    preco: item.preco * item.quantidade
                };
            }),
            total: totalPedido,
            pagamento: pagamento.getDetalhes(),
            dataCriacao: new Date()
        };
        
        try {
            const docRef = await addDoc(collection(db, "pedidos"), pedido);
            
            return {
                sucesso: true,
                pedidoId: docRef.id,
                total: totalPedido
            };
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            return {
                sucesso: false,
                erro: "Erro ao finalizar pedido. Tente novamente."
            };
        }
    }
    
    /**
     * Busca pedidos por cliente
     * @param {string} clienteId 
     * @returns {Promise<Array>}
     */
    async getPedidosByCliente(clienteId) {
        if (!clienteId) return [];
        
        try {
            const q = query(
                collection(db, "pedidos"),
                where("clienteId", "==", clienteId)
            );
            
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Erro ao buscar pedidos do cliente:", error);
            return [];
        }
    }
    
    /**
     * Busca um pedido específico pelo ID
     * @param {string} id 
     * @returns {Promise<Object|null>}
     */
    async getPedido(id) {
        if (!id) return null;
        
        try {
            const docRef = doc(db, "pedidos", id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            return null;
        }
    }
    
    /**
     * Busca todos os pedidos
     * @returns {Promise<Array>} 
     */
    static async getPedidos() {
        try {
            const querySnapshot = await getDocs(collection(db, "pedidos"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            return [];
        }
    }
}

export default Pedido;