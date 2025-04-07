//import { db } from "./firebase_config.js";
import Cliente from "./class/Cliente.js";
import Pagamento from "./class/Pagamento.js";
import Pedido from "./class/pedido.js";

// Gerenciadores de classes
let pedidoManager;
let clienteManager;

// Modal de checkout
let checkoutModal;
let checkoutOverlay;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar os gerenciadores
    pedidoManager = new Pedido();
    clienteManager = new Cliente();
    
    criarModalCheckout();
    
    // Evento para o botão finalizar pedido
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido');
    if (finalizarPedidoBtn) {
        finalizarPedidoBtn.addEventListener('click', iniciarCheckout);
    }
});

// Função para criar o modal de checkout
function criarModalCheckout() {
    checkoutOverlay = document.createElement('div');
    checkoutOverlay.className = 'checkout-overlay';
    checkoutOverlay.style.display = 'none';
    
    checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    
    document.body.appendChild(checkoutOverlay);
    checkoutOverlay.appendChild(checkoutModal);
    
    const style = document.createElement('style');
    style.textContent = `
        .checkout-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .checkout-modal {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .checkout-modal h2 {
            margin-top: 0;
            color: #333;
        }
        
        .checkout-modal label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
        }
        
        .checkout-modal select, .checkout-modal input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        .checkout-modal button {
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .checkout-modal button.secondary {
            background-color: #ccc;
            margin-right: 10px;
        }
        
        .checkout-modal .button-group {
            display: flex;
            justify-content: flex-end;
        }
        
        .checkout-modal .cliente-info {
            margin-top: 15px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
}

async function iniciarCheckout() {
    if (Object.keys(carrinho).length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
        return;
    }
    
    try {
        const funcionarios = await pedidoManager.buscarFuncionarios();
        
        checkoutModal.innerHTML = `
            <h2>Finalizar Pedido</h2>
            
            <label for="funcionario">Funcionário:</label>
            <select id="funcionario" required>
                <option value="">Selecione um funcionário...</option>
                ${funcionarios.map(f => `<option value="${f.id}">${f.nome}</option>`).join('')}
            </select>
            
            <label for="cpf-cliente">CPF do Cliente:</label>
            <input type="text" id="cpf-cliente" placeholder="Digite o CPF (apenas números)" required>
            <button id="buscar-cliente">Buscar Cliente</button>
            
            <div id="cliente-info" class="cliente-info" style="display: none;"></div>
            
            <div id="novo-cliente-form" style="display: none;">
                <label for="nome-cliente">Nome do Cliente:</label>
                <input type="text" id="nome-cliente" placeholder="Digite o nome completo" required>
                <button id="cadastrar-cliente">Cadastrar Cliente</button>
            </div>
            
            <label for="metodo-pagamento">Forma de Pagamento:</label>
            <select id="metodo-pagamento" required>
                <option value="">Selecione uma forma de pagamento...</option>
                ${Pagamento.getMetodosPagamento().map(metodo => `<option value="${metodo}">${metodo}</option>`).join('')}
            </select>
            
            <div class="button-group">
                <button class="secondary" id="cancelar-checkout">Cancelar</button>
                <button id="confirmar-pedido">Confirmar Pedido</button>
            </div>
        `;
        
        checkoutOverlay.style.display = 'flex';
        
        // Adicionar event listeners
        document.getElementById('buscar-cliente').addEventListener('click', handleBuscarCliente);
        document.getElementById('cancelar-checkout').addEventListener('click', fecharCheckout);
        document.getElementById('confirmar-pedido').addEventListener('click', handleConfirmarPedido);
    } catch (error) {
        console.error("Erro ao iniciar checkout:", error);
        alert("Erro ao iniciar o processo de checkout. Tente novamente.");
    }
}


async function handleBuscarCliente() {
    try {
        const cpfInput = document.getElementById('cpf-cliente');
        const cpf = cpfInput.value.trim().replace(/\D/g, ''); 
        
        if (cpf.length !== 11) {
            alert('Por favor, digite um CPF válido com 11 dígitos.');
            return;
        }
        
        const clienteInfo = document.getElementById('cliente-info');
        const novoClienteForm = document.getElementById('novo-cliente-form');
        
        // Usar a instância da classe Cliente
        const cliente = await clienteManager.getClienteByCpf(cpf);
        
        if (cliente) {
            atualizarUIClienteEncontrado(cliente);
        } else {
            atualizarUIClienteNaoEncontrado();
            
            document.getElementById('cadastrar-cliente').addEventListener('click', handleCadastrarCliente);
        }
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        alert("Erro ao buscar cliente. Tente novamente.");
    }
}

function atualizarUIClienteEncontrado(cliente) {
    const clienteInfo = document.getElementById('cliente-info');
    const novoClienteForm = document.getElementById('novo-cliente-form');
    
    clienteInfo.innerHTML = `
        <p style="color: green;"><strong>Cliente encontrado:</strong></p>
        <p style="color: green;">Nome: ${cliente.nome}</p>
        <p style="color: green;">CPF: ${cliente.cpf}</p>
        <input type="hidden" id="cliente-id" value="${cliente.id}">
    `;
    clienteInfo.style.display = 'block';
    novoClienteForm.style.display = 'none';
}

function atualizarUIClienteNaoEncontrado() {
    const clienteInfo = document.getElementById('cliente-info');
    const novoClienteForm = document.getElementById('novo-cliente-form');
    
    clienteInfo.innerHTML = `<p style="color: green;">Cliente não encontrado com este CPF. Por favor, cadastre um novo cliente.</p>`;
    clienteInfo.style.display = 'block';
    novoClienteForm.style.display = 'block';
}

async function handleCadastrarCliente() {
    try {
        const cpf = document.getElementById('cpf-cliente').value.trim().replace(/\D/g, '');
        const nome = document.getElementById('nome-cliente').value.trim();
        
        if (!nome) {
            alert('Por favor, digite o nome do cliente.');
            return;
        }
        
        // Usar a instância da classe Cliente para cadastrar
        const novoCliente = await clienteManager.addCliente(nome, cpf);
        
        if (novoCliente) {
            atualizarUIClienteEncontrado(novoCliente);
        } else {
            alert('Erro ao cadastrar o cliente. Tente novamente.');
        }
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente. Tente novamente.");
    }
}

async function handleConfirmarPedido() {
    try {
        const funcionarioSelect = document.getElementById('funcionario');
        const metodoPagamentoSelect = document.getElementById('metodo-pagamento');
        const clienteIdInput = document.getElementById('cliente-id');
        
        // Obter valores dos campos
        const funcionarioId = funcionarioSelect.value;
        const metodoPagamento = metodoPagamentoSelect.value;
        const clienteId = clienteIdInput ? clienteIdInput.value : '';
    
        const itens = Object.entries(carrinho).map(([nome, item]) => {
            return {
                nome: nome,
                quantidade: item.quantidade,
                preco: item.preco,
                imagem: item.imagem
            };
        });
        
        const resultado = await pedidoManager.finalizarPedido(
            funcionarioId,
            clienteId,
            itens,
            metodoPagamento
        );
        
        if (resultado.sucesso) {
            fecharCheckout();
            limparCarrinho();
            
            alert('Pedido finalizado com sucesso!');
        } else {
            // Exibir mensagem de erro
            alert(resultado.erro || 'Erro ao finalizar pedido. Tente novamente.');
        }
    } catch (error) {
        console.error("Erro ao confirmar pedido:", error);
        alert("Erro ao confirmar pedido. Tente novamente.");
    }
}

function fecharCheckout() {
    checkoutOverlay.style.display = 'none';
}

function limparCarrinho() {
    for (const nome in carrinho) {
        delete carrinho[nome];
    }
    atualizarModalCarrinho();
}

export { limparCarrinho };