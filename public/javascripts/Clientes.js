import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import Cliente from "./class/Cliente.js";
//var Cliente = require('./class/cliente.js');

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

async function showClientes() {
  const listClientes = document.getElementById('lista-itens');
  listClientes.innerHTML = "";
  let totalGeral = 0;

  try {
    const clientesSnap = await Cliente.getClientes();

    if (clientesSnap.empty) {
      console.log("Nenhum item encontrado na coleção 'cliente'.");
      listClientes.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
      return;
    }

    let pedidoNumero = 1;

    clientesSnap.forEach((doc) => {
      const cliente = doc;
      console.log("Pedido carregado:", cliente);

      const titulo = document.createElement('h2');
      titulo.textContent = `${cliente.cpf} - ${cliente.nome}`;
      titulo.style.color = '#8b0000';
      listClientes.appendChild(titulo);

      if (!Array.isArray(cliente.itens)) {
        console.warn(`Documento ${doc.id} não possui um array válido de itens.`, cliente);
        return;
      }

      
    });
  } catch (error) {
    console.error("Erro ao carregar itens do Firestore:", error);
    alert("Erro ao carregar o cardápio. Tente novamente.");
  }
}

// Carrega os itens ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  showClientes();
});
