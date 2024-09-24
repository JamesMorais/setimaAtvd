if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function adicionarProduto() {
    const opcao = document.getElementById('opcaoProduto').value;
    produtos.push(opcao);

    localStorage.setItem('produtos', JSON.stringify(produtos));
    exibirProdutos();
}

function finalizar() {
    alert('Sistema Finalizado');
    calcularPorcentagem();
    localStorage.clear();
    produtos = [];
    exibirProdutos();
}

function calcularPorcentagem() {
    let total = produtos.length;
    let tipos = [0, 0, 0]; // [celulares, televisores, notebooks]
    let porcentagens = [0, 0, 0];
    const porcentagem = document.getElementById('porcentagens');

    produtos.forEach(function(produto) {
        if (produto === 'C') tipos[0]++;
        else if (produto === 'T') tipos[1]++;
        else if (produto === 'N') tipos[2]++;
    });

    if (total > 0) {
        for (let j = 0; j < tipos.length; j++) {
            porcentagens[j] = (tipos[j] / total) * 100;
        }
        porcentagem.innerHTML = `Celulares: ${porcentagens[0].toFixed(2)}%<br>Televisores: ${porcentagens[1].toFixed(2)}%<br>Notebooks: ${porcentagens[2].toFixed(2)}%`;
    } else {
        porcentagem.innerHTML = 'Não foi possível executar essa funcionalidade.';
    }
}

function exibirProdutos() {
    let resultado = '';
    produtos.forEach(function(produto, i) {
        resultado += `Posição ${i}: ${produto}<br>`;
    });
    document.getElementById('exibirProdutos').innerHTML = resultado;
}

function alterarProduto() {
    const posicao = parseInt(document.getElementById('posicaoProduto').value);
    const novaOpcao = document.getElementById('novaOpcaoProduto').value;

    if (posicao < 0 || posicao >= produtos.length || isNaN(posicao)) {
        alert('Digite uma posição válida');
        return;
    }
    produtos[posicao] = novaOpcao;

    localStorage.setItem('produtos', JSON.stringify(produtos));
    exibirProdutos();
    document.getElementById('posicaoProduto').value = '';
}
