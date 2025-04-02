
   
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

    async function carregarItensCardapio(categoriaSelecionada = "Massa") {
    const listaCardapio = document.getElementById('lista-Massa');
    listaCardapio.innerHTML = ""; 

    try {
       
        console.log("Carregando itens da categoria: ", categoriaSelecionada);
        
        const querySnapshot = await getDocs(collection(db, "cardapio"));
       
        if (querySnapshot.empty) {
            console.log("Nenhum item encontrado na coleção 'cardapio'");
        }

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            console.log("Item carregado:", item);

            if (item && item.categoria === categoriaSelecionada) {
                const div = document.createElement('div');
                div.className = 'card-item';
                div.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="content">
                        <div class="card-title">${item.nome}</div>
                        <div class="card-description">${item.descricao}</div>
                        <div class="card-price">R$ ${item.preco.toFixed(2)}</div>
                    </div>
                    <div>
                        <input 
                            type="number" 
                            id="quantidade_${item.nome}" 
                            name="quantidade_${item.nome}" 
                            class="quantity-input" 
                            value="0" 
                            min="0" 
                            data-price="${item.preco}" 
                            onchange="adicionarAoCarrinho('${item.nome}', ${item.preco}, '${item.imagem}', this.value)">
                    </div>
                    
                `;
                
                listaCardapio.appendChild(div); 
            }
        });
    } catch (error) {
        console.error("Erro ao carregar itens do Firestore:", error);
        alert("Erro ao carregar o cardápio. Tente novamente.");
    }
}

// Carrega os itens ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    carregarItensCardapio("Massa"); 
});

