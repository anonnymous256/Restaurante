import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmltChBbiMDZOB26QOeuSMt8Hi8kuu1Lg",
  authDomain: "restaurante-eb4cc.firebaseapp.com",
  projectId: "restaurante-eb4cc",
  storageBucket: "restaurante-eb4cc.appspot.com",
  messagingSenderId: "328765970187",
  appId: "1:328765970187:web:5d75b96ef982b96b0d740e",
  measurementId: "G-PK6S3XR105"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function carregarItensCardapio() {
  const listaCardapio = document.getElementById('lista-itens');
  listaCardapio.innerHTML = "";
  let totalGeral = 0;

  try {
    const querySnapshot = await getDocs(collection(db, "pedidos"));

    if (querySnapshot.empty) {
      console.log("Nenhum item encontrado na coleção 'pedidos'.");
      listaCardapio.innerHTML = "<p>Nenhum item disponível no momento.</p>";
      return;
    }

    let pedidoNumero = 1;

    querySnapshot.forEach((doc) => {
      const pedido = doc.data();
      console.log("Pedido carregado:", pedido);

      const pedidoTitulo = document.createElement('h2');
      pedidoTitulo.textContent = `Pedido ${pedidoNumero}`;
      pedidoTitulo.style.color = '#8b0000';
      listaCardapio.appendChild(pedidoTitulo);

      // Adicionar informações do cliente e data
      const infoPedido = document.createElement('div');
      infoPedido.className = 'info-pedido';
      
      // Formatar a data se estiver disponível
      let dataFormatada = "Data não disponível";
      if (pedido.dataCriacao && pedido.dataCriacao.toDate) {
        const data = pedido.dataCriacao.toDate();
        dataFormatada = data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');
      } else if (pedido.dataCriacao) {
        dataFormatada = pedido.dataCriacao.toString();
      }
      
      infoPedido.innerHTML = `
        <p><strong>Cliente ID:</strong> ${pedido.clienteId || 'Não informado'}</p>
        <p><strong>Data:</strong> ${dataFormatada}</p>
        <p><strong>Método de Pagamento:</strong> ${pedido.pagamento?.metodo || 'Não informado'}</p>
      `;
      listaCardapio.appendChild(infoPedido);

      if (!Array.isArray(pedido.itens)) {
        console.warn(`Documento ${doc.id} não possui um array válido de itens.`, pedido);
        return;
      }

      let totalPedido = 0;

      pedido.itens.forEach((item) => {
        // Verificar todas as possíveis propriedades de imagem
        const imagemUrl = item.imageUrl || item.ImageUrl || item.imagem || item.Imagem || item.url || item.URL || '';
        console.log(`Item: ${item.nome}, URL da imagem: ${imagemUrl}`);
        
        if (!item.nome || !item.preco) {
          console.warn(`Item com campos ausentes no documento ${doc.id}:`, item);
          return;
        }

        const preco = parseFloat(item.preco);
        if (isNaN(preco)) {
          console.warn(`O preço do item ${item.nome} não é válido.`, item);
          return;
        }

        const quantidade = item.quantidade || 1;
        const totalItem = preco * quantidade;
        totalPedido += totalItem;

        // Imagem padrão caso a URL esteja vazia ou seja inválida
        const imagemPadrao = '/images/livro-padrao.jpg';
        
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
            <img src="${imagemUrl}" alt="${item.nome}" onerror="this.onerror=null; this.src='${imagemPadrao}'; console.log('Erro ao carregar imagem: ${imagemUrl}');">
            <div class="content">
              <div class="card-title">${item.nome}</div>
              <div class="card-price">R$ ${preco.toFixed(2)} x ${quantidade}</div>
              <div class="card-total">Total: R$ ${totalItem.toFixed(2)}</div>
            </div>
        `;
        listaCardapio.appendChild(div);
      });

      // Usar o total do pedido do objeto se disponível, senão calcular
      const totalPedidoFinal = pedido.total || pedido.pagamento?.valor || totalPedido;

      const totalPedidoDiv = document.createElement('div');
      totalPedidoDiv.className = 'total-pedido';
      totalPedidoDiv.innerHTML = `<div class="total-pedido"><strong>Total do Pedido ${pedidoNumero}: R$ ${totalPedidoFinal.toFixed(2)}</strong></div>`;
      listaCardapio.appendChild(totalPedidoDiv);

      // Adicionar um separador entre pedidos
      const separador = document.createElement('hr');
      separador.className = 'pedido-separador';
      listaCardapio.appendChild(separador);

      totalGeral += totalPedidoFinal;
      pedidoNumero++;
    });

    // Exibir o total geral após todos os pedidos
    const totalGeralElement = document.getElementById('total-geral');
    if (totalGeralElement) {
      totalGeralElement.textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
    } else {
      const totalGeralDiv = document.createElement('div');
      totalGeralDiv.id = 'total-geral';
      totalGeralDiv.className = 'total-geral';
      totalGeralDiv.innerHTML = `<strong>Total Geral: R$ ${totalGeral.toFixed(2)}</strong>`;
      listaCardapio.appendChild(totalGeralDiv);
    }
  } catch (error) {
    console.error("Erro ao carregar itens do Firestore:", error);
    alert("Erro ao carregar os pedidos. Tente novamente.");
  }
}

// Carrega os itens ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  carregarItensCardapio();
});