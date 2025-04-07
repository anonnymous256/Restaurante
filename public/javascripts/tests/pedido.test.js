import Pedido from '../class/pedido.js';
import Cliente from '../class/Cliente.js';
import Pagamento from '../class/Pagamento.js';

class PedidoTest {
    constructor() {
        this.pedido = new Pedido();
        this.cliente = new Cliente();
        this.testId = null; // Armazenará o ID do pedido de teste
    }

    async testBuscarFuncionarios() {
        const funcionarios = await this.pedido.buscarFuncionarios();
        
        // Verificações
        expect(Array.isArray(funcionarios)).toBe(true);
        expect(funcionarios.length).toBeGreaterThan(0);
        
        // Armazena o ID do primeiro funcionário para usar nos testes
        if (funcionarios.length > 0) {
            this.funcionarioId = funcionarios[0].id;
        }
        
        return funcionarios;
    }

    async testBuscarCliente() {
        const cpf = '12345678901';
        const cliente = await this.cliente.getClienteByCpf(cpf);
        
        // Verificações
        expect(cliente).toBeDefined();
        expect(cliente.cpf).toBe(cpf);
        
        // Armazena o ID do cliente para usar nos testes
        this.clienteId = cliente.id;
        
        return cliente;
    }

    async testFinalizarPedido() {
        // Criar itens do carrinho
        const itens = [
            {
                nome: "Livro História do Brasil",
                quantidade: 2,
                preco: 49.90,
                imagem: "https://example.com/historia-brasil.jpg"
            },
            {
                nome: "Livro Revolução Francesa",
                quantidade: 1,
                preco: 59.90,
                imagem: "https://example.com/revolucao-francesa.jpg"
            }
        ];
        
        // Buscar funcionário e cliente se necessário
        if (!this.funcionarioId) {
            await this.testBuscarFuncionarios();
        }
        
        if (!this.clienteId) {
            await this.testBuscarCliente();
        }
        
        // Criar pedido
        const metodoPagamento = "Cartão de Crédito";
        const result = await this.pedido.finalizarPedido(
            this.funcionarioId,
            this.clienteId,
            itens,
            metodoPagamento
        );
        
        // Verificações
        expect(result.sucesso).toBe(true);
        expect(result.pedidoId).toBeDefined();
        
        // Armazenar o ID do pedido para testes futuros
        this.testId = result.pedidoId;
        
        return result;
    }

    async testValidacaoCamposPedido() {
        // Teste sem funcionário (campo obrigatório)
        const itens = [
            {
                nome: "Livro História do Brasil",
                quantidade: 2,
                preco: 49.90,
                imagem: "https://example.com/historia-brasil.jpg"
            }
        ];
        
        if (!this.clienteId) {
            await this.testBuscarCliente();
        }
        
        const metodoPagamento = "Cartão de Crédito";
        
        // Tentar finalizar sem funcionário
        const result = await this.pedido.finalizarPedido(
            "", // Funcionário vazio
            this.clienteId,
            itens,
            metodoPagamento
        );
        
        // Verificações
        expect(result.sucesso).toBe(false);
        expect(result.erro).toBe("Por favor, selecione um funcionário.");
        
        return result;
    }
}

describe('Pedido', () => {
    let pedidoTest;

    beforeEach(() => {
        pedidoTest = new PedidoTest();
        jest.clearAllMocks();
    });

    test('Deve buscar funcionários corretamente', async () => {
        await pedidoTest.testBuscarFuncionarios();
    });

    test('Deve buscar cliente por CPF corretamente', async () => {
        await pedidoTest.testBuscarCliente();
    });

    test('Deve finalizar um pedido corretamente', async () => {
        await pedidoTest.testFinalizarPedido();
    });

    test('Deve validar campos obrigatórios do pedido', async () => {
        await pedidoTest.testValidacaoCamposPedido();
    });
});