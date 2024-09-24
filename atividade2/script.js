if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}
let frutas = JSON.parse(localStorage.getItem('frutas')) || [];

function adicionarFruta(){
    const opcao = document.getElementById('opcaoFruta').value;
    frutas.push(opcao);

    localStorage.setItem('frutas', JSON.stringify(frutas));
    exibirFrutas();
}

function finalizar(){
    alert('Sistema Finalizado');
    calcularPorcentagem();
    localStorage.clear();
    frutas = [];
    exibirFrutas();
}

function calcularPorcentagem() {
    let total = frutas.length;
    let tipos = [0, 0, 0]; // [maçã, banana, laranja]
    let porcentagens = [0, 0, 0];
    const porcentagem = document.getElementById('porcentagens');

    frutas.forEach(function(fruta) {
        if (fruta === 'M') tipos[0]++;
        else if (fruta === 'B') tipos[1]++;
        else if (fruta === 'L') tipos[2]++;
    });

    if (total > 0) {
        for (let j = 0; j < tipos.length; j++) {
            porcentagens[j] = (tipos[j] / total) * 100;
        }
        porcentagem.innerHTML = `Maçã: ${porcentagens[0].toFixed(2)}%<br>Banana: ${porcentagens[1].toFixed(2)}%<br>Laranja: ${porcentagens[2].toFixed(2)}%`;
    } else {
        porcentagem.innerHTML = 'Não foi possível executar essa funcionalidade.';
    }
}

function exibirFrutas() {
    let resultado = '';
    frutas.forEach(function(fruta, i) {
        resultado += `Posição ${i}: ${fruta}<br>`;
    });
    document.getElementById('exibirFrutas').innerHTML = resultado;
}

function alterarFruta(){
    const posicao = parseInt(document.getElementById('posicaoFruta').value);
    const novaOpcao = document.getElementById('novaOpcaoFruta').value;

    if(posicao < 0 || posicao >= frutas.length || isNaN(posicao)){
        alert('Digite uma posição válida');
        return;
    }
    alert('Valor alterado');
    frutas[posicao] = novaOpcao;

    localStorage.setItem('frutas', JSON.stringify(frutas));

    exibirFrutas();
    document.getElementById('posicaoFruta').value = '';
}
