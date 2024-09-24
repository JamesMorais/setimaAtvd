if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}
let vagas = JSON.parse(localStorage.getItem('vagas')) || [];


function adicionarVeiculo() {
    const opcao = document.getElementById('opcaoVeiculo').value;
    vagas.push(opcao);

    localStorage.setItem('vagas', JSON.stringify(vagas));
    exibirVagas();
}

function finalizar() {
    alert('Sistema Finalizado');
    calcularPorcentagem();
    localStorage.clear();
    vagas = []; 
    exibirVagas();
}

function calcularPorcentagem() {
    let total = vagas.length;
    let tipos = [0, 0, 0]; // [carros, motos, bicicletas]
    let porcentagens = [0, 0, 0];
    const porcentagem = document.getElementById('porcentagens');

    vagas.forEach(function (veiculo) {
        if (veiculo === 'C') tipos[0]++;
        else if (veiculo === 'M') tipos[1]++;
        else if (veiculo === 'B') tipos[2]++;
    });

    if (total > 0) {
        for (let j = 0; j < tipos.length; j++) {
            porcentagens[j] = (tipos[j] / total) * 100;
        }
        porcentagem.innerHTML = `Carros: ${porcentagens[0].toFixed(2)}%<br>Motos: ${porcentagens[1].toFixed(2)}%<br>Bicicletas: ${porcentagens[2].toFixed(2)}%`;
    } else {
        porcentagem.innerHTML = 'Não foi possível executar essa funcionalidade.';
    }
}

function exibirVagas() {
    let resultado = '';
    vagas.forEach(function (veiculo, i) {
        resultado += `Posição ${i}: ${veiculo}<br>`;
    });
    document.getElementById('exibirVagas').innerHTML = resultado;
}

function alterarVeiculo() {
    const posicao = parseInt(document.getElementById('posicaoVeiculo').value);
    const novaOpcao = document.getElementById('novaOpcaoVeiculo').value;

    if (posicao < 0 || posicao >= vagas.length || isNaN(posicao)) {
        alert('Digite uma posição válida');
        return;
    }
    vagas[posicao] = novaOpcao;

    localStorage.setItem('vagas', JSON.stringify(vagas));
    exibirVagas();
    document.getElementById('posicaoVeiculo').value = '';
}
