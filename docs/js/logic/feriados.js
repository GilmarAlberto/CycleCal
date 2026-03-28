// ==============================
// CycleCal — Módulo de Feriados
// ==============================

const feriadosNacionais = [
    { dia: 1,  mes: 0,  nome: "Confraternização Universal" },
    { dia: 21, mes: 3,  nome: "Tiradentes" },
    { dia: 1,  mes: 4,  nome: "Dia do Trabalho" },
    { dia: 7,  mes: 8,  nome: "Independência do Brasil" },
    { dia: 12, mes: 9,  nome: "Nossa Senhora Aparecida" },
    { dia: 2,  mes: 10, nome: "Finados" },
    { dia: 15, mes: 10, nome: "Proclamação da República" },
    { dia: 20, mes: 10, nome: "Dia da Consciência Negra" },
    { dia: 25, mes: 11, nome: "Natal" },
];

const feriadosCuritiba = [
    { dia: 8, mes: 8, nome: "Nossa Senhora da Luz dos Pinhais" },
];

export const feriadosFixos = [...feriadosNacionais, ...feriadosCuritiba];

function calcularPascoa(ano) {
    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);

    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(ano, mes - 1, dia);
}

export function gerarFeriadosMoveis(ano) {
    const pascoa = calcularPascoa(ano);

    const sextaSanta = new Date(pascoa);
    sextaSanta.setDate(pascoa.getDate() - 2);

    const corpusChristi = new Date(pascoa);
    corpusChristi.setDate(pascoa.getDate() + 60);

    return [
        { dia: sextaSanta.getDate(),   mes: sextaSanta.getMonth(),   nome: "Sexta-feira Santa" },
        { dia: pascoa.getDate(),        mes: pascoa.getMonth(),        nome: "Páscoa" },
        { dia: corpusChristi.getDate(), mes: corpusChristi.getMonth(), nome: "Corpus Christi" },
    ];
}

export function gerarCarnaval(ano) {
    const pascoa = calcularPascoa(ano);

    const offsets = [
        { offset: -51, nome: "Sexta-feira de Carnaval" },
        { offset: -50, nome: "Sábado de Carnaval" },
        { offset: -49, nome: "Domingo de Carnaval" },
        { offset: -48, nome: "Segunda-feira de Carnaval" },
        { offset: -47, nome: "Terça-feira de Carnaval" },
        { offset: -46, nome: "Quarta-feira de Cinzas (até 14h)" },
    ];

    return offsets.map((item) => {
        const data = new Date(pascoa);
        data.setDate(pascoa.getDate() + item.offset);
        return { dia: data.getDate(), mes: data.getMonth(), nome: item.nome };
    });
}

export function gerarTodosFeriados(ano) {
    return [...feriadosFixos, ...gerarFeriadosMoveis(ano)];
}
