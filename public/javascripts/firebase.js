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
  
    
    document.getElementById('crudForm').addEventListener('submit', async function(event) {
      event.preventDefault(); 

      const nome = document.getElementById('nome').value;
      const descricao = document.getElementById('descricao').value;
      const imagem = document.getElementById('imagem').value;
      const preco = parseFloat(document.getElementById('preco').value);
      const categoria = document.getElementById('categoria').value;
  
      try {
        const docRef = await addDoc(collection(db, "cardapio"), {
          nome,
          descricao,
          imagem,
          preco,
          categoria,
          dataCriacao: new Date() 
        });
  
        alert("Item adicionado com sucesso!");
        document.getElementById('crudForm').reset();
      } catch (error) {
        alert("Erro ao adicionar item. Tente novamente.");
      }
    });

    export { db, collection, addDoc };
