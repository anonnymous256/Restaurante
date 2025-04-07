import Prato from './class/prato.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('crudForm');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const pratoIdInput = document.getElementById('pratoId');
  const pratosLista = document.getElementById('pratosLista');
  
  // Instância da classe Prato
  const pratoManager = new Prato();
  
  // Carregar todos os pratos ao iniciar a página
  carregarPratos();
  
  async function carregarPratos() {
    try {
      const pratos = await Prato.getPratos();
      renderizarPratos(pratos);
    } catch (error) {
      console.error("Erro ao carregar pratos:", error);
      pratosLista.innerHTML = '<p class="error">Erro ao carregar os livros. Tente novamente mais tarde.</p>';
    }
  }
  

  function renderizarPratos(pratos) {
    if (pratos.length === 0) {
      pratosLista.innerHTML = '<p>Nenhum livro cadastrado.</p>';
      return;
    }
    
    let html = '<div class="pratos-grid">';
    
    pratos.forEach(prato => {
      html += `
        <div class="prato-card">
          <div class="prato-img">
            <img src="${prato.imagem}" alt="${prato.nome}" onerror="this.src='/images/placeholder.jpg'">
          </div>
          <div class="prato-info">
            <h3>${prato.nome}</h3>
            <p>${prato.descricao}</p>
            <p class="categoria">Categoria: ${prato.categoria}</p>
            <p class="preco">R$ ${prato.preco.toFixed(2)}</p>
            <div class="prato-actions">
              <button class="edit-btn" data-id="${prato.id}">Editar</button>
              <button class="delete-btn" data-id="${prato.id}">Excluir</button>
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    pratosLista.innerHTML = html;
    
    // Adicionar event listeners para os botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', editarPrato);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', excluirPrato);
    });
  }
  
  // Função para editar um prato
  async function editarPrato(event) {
    const pratoId = event.target.getAttribute('data-id');
    const prato = await pratoManager.getPrato(pratoId);
    
    if (prato) {
      pratoIdInput.value = prato.id;
      document.getElementById('nome').value = prato.nome;
      document.getElementById('descricao').value = prato.descricao;
      document.getElementById('imagem').value = prato.imagem;
      document.getElementById('preco').value = prato.preco;
      document.getElementById('categoria').value = prato.categoria;
      
      submitBtn.textContent = 'Atualizar Item';
      cancelBtn.style.display = 'inline-block';
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  // Função para excluir um prato
  async function excluirPrato(event) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      const pratoId = event.target.getAttribute('data-id');
      const resultado = await pratoManager.deletePrato(pratoId);
      
      if (resultado) {
        alert('Livro excluído com sucesso!');
        carregarPratos();
      } else {
        alert('Erro ao excluir livro. Tente novamente.');
      }
    }
  }
  
  // Evento de envio do formulário
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const imagem = document.getElementById('imagem').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    
    let resultado;
    
    if (pratoIdInput.value) {
      // Atualizar prato existente
      resultado = await pratoManager.updatePrato(
        pratoIdInput.value,
        nome,
        descricao,
        imagem,
        preco,
        categoria
      );
      
      if (resultado) {
        alert('Livro atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar livro. Tente novamente.');
      }
    } else {
      // Adicionar novo prato
      resultado = await pratoManager.addPrato(
        nome,
        descricao,
        imagem,
        preco,
        categoria
      );
      
      if (resultado) {
        alert('Livro adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar livro. Tente novamente.');
      }
    }
    
    resetarFormulario();
    carregarPratos();
  });
  
  cancelBtn.addEventListener('click', function() {
    resetarFormulario();
  });
  
  function resetarFormulario() {
    form.reset();
    pratoIdInput.value = '';
    submitBtn.textContent = 'Adicionar Item';
    cancelBtn.style.display = 'none';
  }
});