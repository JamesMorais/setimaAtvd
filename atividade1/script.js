if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}
// Para recuperar os valores armazenados no localStorage após o carregamento da página
let livros = JSON.parse(localStorage.getItem('livros')) ||  []


function adicionarLivro(){
    const opcao = document.getElementById('opcaoLivro').value;

    livros.push(opcao)
    console.log(livros)

    localStorage.setItem('livros', JSON.stringify(livros));
    exibirLivros()
}
function finalizar(){
    alert('Sistema Finalizado')
    calcularPorcentagem();
    localStorage.clear();
    livros = [];
    exibirLivros();
}


function calcularPorcentagem() {
    let total = livros.length;
    let tipos = [0, 0, 0]; // [ficcao, naoFiccao, tecnico]
    let porcentagens = [0, 0, 0];
    const porcentagem = document.getElementById('porcentagens')

    livros.forEach(function(livro) {
        if (livro === 'F') tipos[0]++;
        else if (livro === 'NF') tipos[1]++;
        else if (livro === 'T') tipos[2]++;
    });

    if (total > 0) {
        for (let j = 0; j < tipos.length; j++) {
            porcentagens[j] = (tipos[j] / total) * 100;
        }
        porcentagem.innerHTML = `Ficção: ${porcentagens[0].toFixed(2)}%<br>Não-ficção: ${porcentagens[1].toFixed(2)}%<br>Técnico: ${porcentagens[2].toFixed(2)}%`;
    } else {
        porcentagem.innerHTML = 'Não foi possível executar essa funcionalidade.';
    }
}

function exibirLivros() {
    let resultado = '';
    livros.forEach(function(livro, i) {
        resultado += `Posição ${i}: ${livro}<br>`;
    });
    document.getElementById('exibirLivros').innerHTML = resultado;
}

function alterarLivro(){
    const posicao = parseInt(document.getElementById('posicaoLivro').value);
    const novaOpcao = document.getElementById('novaOpcaoLivro').value;

    if(posicao < 0 || posicao >= livros.length || isNaN(posicao)){
        alert('Digite uma posição válida')
        return;
    }
    alert('Valor alterado')
    livros[posicao] = novaOpcao;

    localStorage.setItem('livros', JSON.stringify(livros));

    exibirLivros();

    document.getElementById('posicaoLivro').value = '';

}
window.onload = function() {
    exibirLivros();
}
