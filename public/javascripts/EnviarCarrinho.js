import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  
    // Configuração do Firebase
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

    function enviarPedido() {
      const pedido = {
        itens: Object.entries(carrinho).map(([nome, item]) => {
          return {
            ImageUrl: item.imagem,
            nome: nome,
            quantidade: item.quantidade,
            preco: item.total
          };
        }),
        total: Object.values(carrinho).reduce((total, item) => total + item.total, 0)      
      };

      addDoc(collection(db, "pedidos"), pedido)
        .then(() => {
          alert("Pedido enviado com sucesso!");
          limparCarrinho();
        })
      }

      const finalizarPedidoBtn = document.getElementById('finalizar-pedido');

// Evento ao clicar no botão "Finalizar Pedido"
finalizarPedidoBtn.addEventListener('click', () => {
    if (Object.keys(carrinho).length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
    } else {
        enviarPedido();
        limparCarrinho(); 
    }
});


function limparCarrinho() {
    for (const nome in carrinho) {
        delete carrinho[nome];
    }
    atualizarModalCarrinho();  
}