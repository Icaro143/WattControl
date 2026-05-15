const botao = document.getElementById('calcular');

const botaoReset = document.getElementById('resetar');

const aparelho = document.getElementById('aparelho');

const consumoTexto = document.getElementById('consumo');

const valorTexto = document.getElementById('custo');

const horas = document.getElementById('tempo');

const bandeira = document.getElementById('bandeira');

const potenciaAparelhos = {

    televisao: 100,

    computador: 300,

    geladeira: 150,

    maquina_lavar: 1000,

    microondas: 1400,

    chuveiro: 5500,

    ar_condicionado: 1200,
};

const nomesBonitos = {

    televisao: "Televisão",

    computador: "Computador",

    geladeira: "Geladeira",

    maquina_lavar: "Máquina de Lavar",

    microondas: "Micro-ondas",

    chuveiro: "Chuveiro",

    ar_condicionado: "Ar Condicionado"
};

const consumos = [];

const nomeAparelhos = [];

let grafico = null;

botao.addEventListener('click', function () {

    const aparelhoSelecionado = aparelho.value;

    const horaUso = Number(horas.value);

    if (horaUso <= 0 || isNaN(horaUso)) {

        alert("Digite um valor válido de horas.");

        return;
    }

    if (horaUso > 720) {

        alert("O máximo permitido é 720 horas mensais.");

        return;
    }

    const potencia = potenciaAparelhos[aparelhoSelecionado];

    const tarifa = Number(bandeira.value);

    const consumoMensal = (potencia * horaUso) / 1000;

    const valorMensal = consumoMensal * tarifa;

    const indiceExistente =
        nomeAparelhos.indexOf(aparelhoSelecionado);

    if (indiceExistente !== -1) {

        consumos[indiceExistente] += valorMensal;

    } else {

        nomeAparelhos.push(aparelhoSelecionado);

        consumos.push(valorMensal);
    }

    const lista =
        document.getElementById("aparelhos-lista");

    lista.innerHTML = "";

    for (let i = 0; i < nomeAparelhos.length; i++) {

        const item = document.createElement('li');

        item.textContent =
            `${nomesBonitos[nomeAparelhos[i]]} - R$ ${consumos[i].toFixed(2)}`;

        lista.appendChild(item);
    }

    const somaTotal = consumos.reduce(

        (total, valor) => total + valor,

        0
    );

    const maiorValor = Math.max(...consumos);

    const indiceMaior =
        consumos.indexOf(maiorValor);

    const totalTexto =
        document.getElementById('total');

    totalTexto.textContent =
        `Total da residência: R$ ${somaTotal.toFixed(2)}`;

    const textoMaior =
        document.getElementById('maiorConsumo');

    textoMaior.textContent =
        `Maior consumo: ${nomesBonitos[nomeAparelhos[indiceMaior]]} - R$ ${maiorValor.toFixed(2)}`;

    const dicaTexto =
        document.getElementById('dicaEconomia');

    if (nomeAparelhos[indiceMaior] === "chuveiro") {

        dicaTexto.textContent =
            "Dica: reduza o tempo de banho para economizar energia.";

    } else if (nomeAparelhos[indiceMaior] === "ar_condicionado") {

        dicaTexto.textContent =
            "Dica: utilize o ar-condicionado em 23°C.";

    } else if (nomeAparelhos[indiceMaior] === "geladeira") {

        dicaTexto.textContent =
            "Dica: evite abrir a geladeira muitas vezes.";

    } else if (nomeAparelhos[indiceMaior] === "computador") {

        dicaTexto.textContent =
            "Dica: desligue o computador quando não estiver usando.";

    } else {

        dicaTexto.textContent =
            "Dica: acompanhe regularmente seu consumo.";
    }

    const mediaBrasil = 350;

    const diferenca =
        somaTotal - mediaBrasil;

    const porcentagem =
        (diferenca / mediaBrasil) * 100;

    const comparacaoTexto =
        document.getElementById('comparacaoBrasil');

    if (somaTotal > mediaBrasil) {

        comparacaoTexto.textContent =
            `Seu consumo é ${porcentagem.toFixed(2)}% maior que a média brasileira.`;

    } else if (somaTotal < mediaBrasil) {

        comparacaoTexto.textContent =
            `Seu consumo é ${Math.abs(porcentagem).toFixed(2)}% menor que a média brasileira.`;

    } else {

        comparacaoTexto.textContent =
            "Seu consumo está igual à média brasileira.";
    }

    const economiaTexto =
        document.getElementById('economiaPossivel');

    const economiaEstimada =
        maiorValor * 0.15;

    economiaTexto.textContent =
        `Economia possível: R$ ${economiaEstimada.toFixed(2)}`;

    const alertaConsumo =
        document.getElementById('alertaConsumo');

    if (somaTotal > mediaBrasil) {

        alertaConsumo.textContent =
            "Alerta: Seu consumo está acima da média brasileira.";

    } else {

        alertaConsumo.textContent =
            "Parabéns! Seu consumo está controlado.";
    }

    const impactoTexto =
        document.getElementById('impactoAmbiental');

    const co2 =
        somaTotal * 0.084;

    impactoTexto.textContent =
        `Impacto ambiental estimado: ${co2.toFixed(2)} kg de CO2/mês`;

    const scoreTexto =
        document.getElementById('scoreEnergia');

    let score =
        100 - Math.abs((somaTotal - mediaBrasil) / mediaBrasil * 10);

    if (score < 0) {

        score = 0;
    }

    if (score > 100) {

        score = 100;
    }

    scoreTexto.textContent =
        `Score energético: ${score.toFixed(0)}/100`;

    consumoTexto.textContent =
        `Consumo mensal: ${consumoMensal.toFixed(2)} kWh`;

    valorTexto.textContent =
        `Valor mensal: R$ ${valorMensal.toFixed(2)}`;

    const textoTarifa =
        document.getElementById('tarifaAtual');

    if (tarifa === 0.72) {

        textoTarifa.textContent =
            "Tarifa atual: Bandeira Verde";

    } else if (tarifa === 0.89) {

        textoTarifa.textContent =
            "Tarifa atual: Bandeira Amarela";

    } else if (tarifa === 1.05) {

        textoTarifa.textContent =
            "Tarifa atual: Bandeira Vermelha 1";

    } else if (tarifa === 1.24) {

        textoTarifa.textContent =
            "Tarifa atual: Bandeira Vermelha 2";
    }

    const ctx =
        document.getElementById('graficoPizza').getContext('2d');

    if (grafico !== null) {

        grafico.destroy();
    }

    grafico = new Chart(ctx, {

        type: 'pie',

        data: {

            labels: nomeAparelhos.map(

                nome => nomesBonitos[nome]
            ),

            datasets: [{

                data: consumos,

                backgroundColor: [

                    '#22c55e',
                    '#3b82f6',
                    '#f97316',
                    '#ef4444',
                    '#eab308',
                    '#8b5cf6',
                    '#14b8a6'
                ],

                borderWidth: 2
            }]
        }
    });
});

botaoReset.addEventListener("click", function () {

    horas.value = "";

    consumos.length = 0;

    nomeAparelhos.length = 0;

    document.getElementById("aparelhos-lista")
        .innerHTML = "";

    document.getElementById("total")
        .textContent =
        "Total da residência: R$ 0,00";

    consumoTexto.textContent =
        "Consumo: 0 kWh";

    valorTexto.textContent =
        "Custo: R$ 0,00";

    document.getElementById('comparacaoBrasil')
        .textContent =
        "Comparação com média: -";

    document.getElementById('dicaEconomia')
        .textContent =
        "Dica de economia: -";

    document.getElementById('tarifaAtual')
        .textContent =
        "Tarifa atual: -";

    document.getElementById('economiaPossivel')
        .textContent =
        "Economia possível: -";

    document.getElementById('alertaConsumo')
        .textContent =
        "Nível de consumo: -";

    document.getElementById('impactoAmbiental')
        .textContent =
        "Impacto ambiental: -";

    document.getElementById('scoreEnergia')
        .textContent =
        "Score energético: -";

    document.getElementById('maiorConsumo')
        .textContent =
        "Maior consumo: -";

    if (grafico !== null) {

        grafico.destroy();

        grafico = null;
    }
});