const botao = document.getElementById('calcular');

const botaoReset = document.getElementById('resetar');

const aparelho = document.getElementById('aparelho');

const consumoTexto = document.getElementById('consumo');

const valorTexto = document.getElementById('custo');

const horas = document.getElementById('tempo');

const bandeira = document.getElementById('bandeira');

const potenciaAparelhos = {
    'televisao': 30,
    'computador': 45,
    'geladeira': 56,
    'maquina_lavar': 12,
    'microondas': 18,
    'chuveiro': 220,
    'ar_condicionado': 193,
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
    console.log('clicou');

    const aparelhoSelecionado = aparelho.value;

    const horaUso = Number(horas.value);

    const consumo = potenciaAparelhos[aparelhoSelecionado];

    const tarifa = Number(bandeira.value);

    const consumoMensal = (consumo * horaUso) / 1000;

    const valorMensal = consumoMensal * tarifa;

    consumos.push(consumoMensal);
    nomeAparelhos.push(aparelhoSelecionado);

    const lista = document.getElementById("aparelhos-lista")

    const item = document.createElement('li');

    item.textContent =
        `${nomesBonitos[aparelhoSelecionado]}
    - R$ ${valorMensal.toFixed(2)}`;

    lista.appendChild(item);
    let somaTotal = 0;

    for (let i = 0; i < consumos.length; i++) {
        somaTotal += consumos[i];
    }
    let maiorValor = consumos[0];

    let indiceMaior = 0;
    for (let i = 1; i < consumos.length; i++) {
        if (consumos[i] > maiorValor) {
            maiorValor = consumos[i];
            indiceMaior = i;
        }
    }
    const totalTexto = document.getElementById('total');
    totalTexto.textContent = `Total da residência: R$ ${somaTotal.toFixed(2)} `

    const textoMaior = document.getElementById('maiorConsumo');
    textoMaior.textContent = `Maior consumo: ${nomesBonitos[nomeAparelhos[indiceMaior]]} - R$ ${maiorValor.toFixed(2)} `;
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
    const diferenca = somaTotal - mediaBrasil;
    const porcentagem = (diferenca / mediaBrasil) * 100;

    const comparacaoTexto = document.getElementById('comparacaoBrasil');
    const economiaTexto = document.getElementById('economiaPossivel');
    const economiaEstima = maiorValor * 0.15;
    economiaTexto.textContent =
        `Economia possível: R$ ${economiaEstima.toFixed(2)} (15% do maior consumo)`;
    const alertaConsumo = document.getElementById('alertaConsumo');
    if (somaTotal > mediaBrasil) {
        alertaConsumo.textContent =
            "Alerta: Seu consumo está acima da média brasileira.";
    } else if (somaTotal < mediaBrasil) {
        alertaConsumo.textContent =
            "Parabéns! Seu consumo está abaixo da média brasileira.";
    } else {
        alertaConsumo.textContent =
            "Seu consumo está exatamente na média brasileira.";
    }
    const impactoTexto = document.getElementById('impactoAmbiental');
    const co2 = somaTotal * 0.084;
    impactoTexto.textContent =
        `Impacto ambiental estimado: ${co2.toFixed(2)} kg de CO2 por mês.`;
    const scoreTexto = document.getElementById('scoreEnergia');
    let score = 100 - Math.abs((somaTotal - mediaBrasil) / mediaBrasil * 10);
    if (score < 0) {
        score = 0;
    }
    scoreTexto.textContent =
        `Score energético: ${score.toFixed(2)}/100`;
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
    consumoTexto.textContent = `Consumo mensal: ${consumoMensal.toFixed(2)} kWh`;
    valorTexto.textContent = `Valor mensal: R$ ${valorMensal.toFixed(2)} `;
    const textoTarifa = document.getElementById('tarifaAtual');
    if (tarifa === 0.72) {
        textoTarifa.textContent = "Tarifa atual: Verde";
    } else if (tarifa === 0.89) {
        textoTarifa.textContent = "Tarifa atual: Amarela";
    } else if (tarifa === 1.05) {
        textoTarifa.textContent = "Tarifa atual: Vermelha 1";
    } else if (tarifa === 1.24) {
        textoTarifa.textContent = "Tarifa atual: Vermelha 2";
    } else {
        textoTarifa.textContent = "Tarifa atual: Desconhecida";
    }
    const ctx = document.getElementById('graficoPizza').getContext('2d');
    if (grafico !== null) {
        grafico.destroy();
    }
    grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nomeAparelhos,
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
