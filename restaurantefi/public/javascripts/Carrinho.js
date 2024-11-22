const carrinho = {};

function adicionarAoCarrinho(nome, preco, imagemUrl) {
    if (!carrinho[nome]) {
        carrinho[nome] = {
            quantidade: 0,
            total: 0,
            imagem: imagemUrl 
        };
    }
    carrinho[nome].quantidade++;
    carrinho[nome].total = carrinho[nome].quantidade * preco;
    atualizarModalCarrinho();
}

const modal = document.getElementById('carrinho-modal');
const openModalBtn = document.getElementById('abrir-modal');
const closeModalBtn = document.querySelector('.fechar');


openModalBtn.addEventListener('click', () => {
    atualizarModalCarrinho();
    modal.style.display = 'block';
});


closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


function atualizarModalCarrinho() {
    const modalCarrinhoItens = document.getElementById('modal-carrinho-itens');
    const modalTotalDiv = document.getElementById('modal-total');
    let totalGeral = 0;

    modalCarrinhoItens.innerHTML = ''; 

    for (const nome in carrinho) {
        const item = carrinho[nome];
        totalGeral += item.total;

        const listItem = document.createElement('li');
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';
        listItem.style.marginBottom = '10px';

        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = nome;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginRight = '10px';

        const itemDetails = document.createElement('span');
        itemDetails.innerHTML = `
            ${nome} (Quantidade: ${item.quantidade}) - Total: R$ ${item.total.toFixed(2)}
        `;

        listItem.appendChild(img);
        listItem.appendChild(itemDetails);
        modalCarrinhoItens.appendChild(listItem);
    }

    modalTotalDiv.textContent = `Total: R$ ${totalGeral.toFixed(2)}`;
}
