const carrinho = {}; 

function adicionarAoCarrinho(nome, preco, imagemUrl, quantidadeInput) {
    const quantidade = parseInt(quantidadeInput);  
    if (quantidade > 0) {
        if (!carrinho[nome]) {
            carrinho[nome] = {
                quantidade: 0,
                total: 0,
                imagem: imagemUrl 
            };
        }

        carrinho[nome].quantidade = quantidade;
        carrinho[nome].total = carrinho[nome].quantidade * preco;  
    } else {
        
        delete carrinho[nome];
    }

    atualizarModalCarrinho();  
}


function diminuirQuantidade(nome, preco) {
    if (carrinho[nome]) {
        carrinho[nome].quantidade--;
        if (carrinho[nome].quantidade <= 0) {
            delete carrinho[nome]; 
        } else {
            carrinho[nome].total = carrinho[nome].quantidade * preco;
        }
        atualizarModalCarrinho(); 
    }
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
        
        
        if (item.quantidade > 0) {
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

            
            const buttonDiminuir = document.createElement('button');
            buttonDiminuir.textContent = '-';
            buttonDiminuir.style.marginLeft = '10px';
            buttonDiminuir.addEventListener('click', () => diminuirQuantidade(nome, item.total / item.quantidade));

            listItem.appendChild(img);
            listItem.appendChild(itemDetails);
            listItem.appendChild(buttonDiminuir);
            modalCarrinhoItens.appendChild(listItem);
        }
    }

    modalTotalDiv.textContent = `Total: R$ ${totalGeral.toFixed(2)}`;
}
