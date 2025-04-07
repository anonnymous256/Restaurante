import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import Funcionario from "./class/funcionario.js";
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

async function showFuncionarios() {
  const listFuncionarios = document.getElementById('lista-itens');
  listFuncionarios.innerHTML = "";
  let totalGeral = 0;

  try {
    const funcionariosSnap = await Funcionario.getFuncionarios();

    if (funcionariosSnap.empty) {
      console.log("Nenhum item encontrado na coleção 'funcionario'.");
      listFuncionarios.innerHTML = "<p>Nenhum funcionario cadastrado.</p>";
      return;
    }

    let pedidoNumero = 1;

    funcionariosSnap.forEach((doc) => {
      const funcionario = doc;
      console.log("Funcionario carregado:", funcionario);

      const titulo = document.createElement('h2');
      titulo.textContent = `${funcionario.cpf} - ${funcionario.nome}`;
      titulo.style.color = '#8b0000';
      listFuncionarios.appendChild(titulo);

      if (!Array.isArray(funcionario.itens)) {
        console.warn(`Documento ${doc.id} não possui um array válido de itens.`, funcionario);
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
  showFuncionarios();
});
