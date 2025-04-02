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

      if (!Array.isArray(pedido.itens)) {
        console.warn(`Documento ${doc.id} não possui um array válido de itens.`, pedido);
        return;
      }

      let totalPedido = 0;

      pedido.itens.forEach((item) => {
        if (!item.nome || !item.preco || !item.ImageUrl) {
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

        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
            <img src="${item.ImageUrl}" alt="${item.nome}">
            <div class="content">
              <div class="card-title">${item.nome}</div>
              <div class="card-price">R$ ${preco.toFixed(2)}</div>
              <div class="card-quantity"> Quantidade:${quantidade}</div>
            </div>
        `;
        listaCardapio.appendChild(div);
      });


      const totalPedidoDiv = document.createElement('div');
      totalPedidoDiv.className = 'total-pedido';
      totalPedidoDiv.innerHTML = `<div class="total-pedido"><strong>Total do Pedido ${pedidoNumero}: R$ ${totalPedido.toFixed(2)}</strong></div>`;
      listaCardapio.appendChild(totalPedidoDiv);



      totalGeral += totalPedido;
      pedidoNumero++;

      document.getElementById('total-geral').textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
    });
  } catch (error) {
    console.error("Erro ao carregar itens do Firestore:", error);
    alert("Erro ao carregar o cardápio. Tente novamente.");
  }
}

// Carrega os itens ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  carregarItensCardapio();
});
