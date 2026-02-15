let hoje = new Date();
let anoAtual = hoje.getFullYear();
let mesAtual = hoje.getMonth() + 1;

// Domingo base: 15/02/2026 é folga
const domingoBase = new Date(2026, 1, 15); 
// Atenção: mês começa do zero (1 = fevereiro)

function ehFolgaDomingo(dataAtual) {

    if (dataAtual.getDay() !== 0) {
        return false;
    }

    // Diferença em milissegundos
    const diffMs = dataAtual - domingoBase;

    // Converte para dias
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Converte para domingos
    const diffDomingos = Math.floor(diffDias / 7);

    return diffDomingos % 3 === 0;
}

function gerarCalendario(ano, mes) {

    const container = document.getElementById("calendario");
    container.innerHTML = "";

    document.getElementById("titulo").innerText = `${mes}/${ano}`;

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    for (let diaNome of diasSemana) {
        const header = document.createElement("div");
        header.classList.add("day", "header");
        header.innerText = diaNome;
        container.appendChild(header);
    }

    const primeiroDia = new Date(ano, mes - 1, 1);
    const diaSemanaInicio = primeiroDia.getDay();
    const diasNoMes = new Date(ano, mes, 0).getDate();

    for (let i = 0; i < diaSemanaInicio; i++) {
        const vazio = document.createElement("div");
        vazio.classList.add("day");
        container.appendChild(vazio);
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {

        const dataAtual = new Date(ano, mes - 1, dia);
        const diaSemana = dataAtual.getDay();

        const divDia = document.createElement("div");
        divDia.classList.add("day");
        divDia.innerText = dia;

        // Quinta-feira = folga fixa
        if (diaSemana === 4) {
            divDia.classList.add("folga");
        }

        // Regra real dos domingos (ciclo contínuo)
        if (ehFolgaDomingo(dataAtual)) {
            divDia.classList.add("folga");
        }

        // Destacar hoje
        if (
            dia === hoje.getDate() &&
            mes - 1 === hoje.getMonth() &&
            ano === hoje.getFullYear()
        ) {
            divDia.classList.add("hoje");
        }

        container.appendChild(divDia);
    }
}

function proximoMes() {
    mesAtual++;
    if (mesAtual > 12) {
        mesAtual = 1;
        anoAtual++;
    }
    gerarCalendario(anoAtual, mesAtual);
}

function mesAnterior() {
    mesAtual--;
    if (mesAtual < 1) {
        mesAtual = 12;
        anoAtual--;
    }
    gerarCalendario(anoAtual, mesAtual);
}

gerarCalendario(anoAtual, mesAtual);

