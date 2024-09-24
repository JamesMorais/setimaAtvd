if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}
let eventos = JSON.parse(localStorage.getItem('eventos')) || [];


window.onload = function() {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
        eventos = JSON.parse(eventosSalvos);
        exibirEventos();
    }
}

function adicionarEvento(){
    const opcao = document.getElementById('opcaoEvento').value;
    eventos.push(opcao);

    localStorage.setItem('eventos', JSON.stringify(eventos));
    exibirEventos();
}

function finalizar(){
    alert('Sistema Finalizado');
    calcularPorcentagem();
    localStorage.clear();
    eventos = [];
    exibirEventos();
}

function calcularPorcentagem() {
    let total = eventos.length;
    let tipos = [0, 0, 0]; // [seminário, workshop, conferência]
    let porcentagens = [0, 0, 0];
    const porcentagem = document.getElementById('porcentagens');

    eventos.forEach(function(evento) {
        if (evento === 'S') tipos[0]++;
        else if (evento === 'W') tipos[1]++;
        else if (evento === 'C') tipos[2]++;
    });

    if (total > 0) {
        for (let j = 0; j < tipos.length; j++) {
            porcentagens[j] = (tipos[j] / total) * 100;
        }
        porcentagem.innerHTML = `Seminário: ${porcentagens[0].toFixed(2)}%<br>Workshop: ${porcentagens[1].toFixed(2)}%<br>Conferência: ${porcentagens[2].toFixed(2)}%`;
    } else {
        porcentagem.innerHTML = 'Não foi possível executar essa funcionalidade.';
    }
}

function exibirEventos() {
    let resultado = '';
    eventos.forEach(function(evento, i) {
        resultado += `Posição ${i}: ${evento}<br>`;
    });
    document.getElementById('exibirEventos').innerHTML = resultado;
}

function alterarEvento(){
    const posicao = parseInt(document.getElementById('posicaoEvento').value);
    const novaOpcao = document.getElementById('novaOpcaoEvento').value;

    if(posicao < 0 || posicao >= eventos.length || isNaN(posicao)){
        alert('Digite uma posição válida');
        return;
    }
    alert('Valor alterado');
    eventos[posicao] = novaOpcao;

    localStorage.setItem('eventos', JSON.stringify(eventos));
    exibirEventos();
    document.getElementById('posicaoEvento').value = '';
}
