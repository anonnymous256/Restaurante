function AtualizarPreco() {
    let total = 0;

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        const price = parseFloat(input.getAttribute('data-price'));
        const quantity = parseInt(input.value);

        if (!isNaN(quantity) && quantity >= 0 && !isNaN(price)) {
            total += price * quantity;
        }
    });

    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}


