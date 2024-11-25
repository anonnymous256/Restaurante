// Função para conferir a senha
function ConferirSenha() {
    const password = document.getElementById('adminPassword').value;
    const correctPassword = '2854'; 

    if (password === correctPassword) {
        window.location.href = '/Dashboard';
        document.getElementById('adminPassword').value = '';
    } else {
        alert('Senha incorreta. Por favor, tente novamente.'); 
        document.getElementById('adminPassword').value = '';
    }
}


function abrirModal() {
    document.getElementById("modal-login").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal-login").style.display = "none";
}

document.querySelector(".Logar").addEventListener("click", abrirModal);

window.onclick = function(event) {
    if (event.target === document.getElementById("modal-login")) {
        fecharModal();
    }
}
