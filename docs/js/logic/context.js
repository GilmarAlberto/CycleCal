// ==============================
// CycleCal — Módulo de Contexto
// ==============================
// Centraliza a montagem do objeto context usado por eventosDoDia()
// Depende de globals do index.html: getUser, vacations,
// baseFolgaDomingo, AREAS_WITHOUT_DSR, anoAtual

import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./feriados.js";

export function getContext(ano) {
    const user = getUser();

    let aniversario = null;

    if (user.profile.birthday) {
        const [y, m, d] = user.profile.birthday.split("-");
        aniversario = {
            dia: Number(d),
            mes: Number(m) - 1,
        };
    }

    const anoRef = ano ?? anoAtual;
    const feriadosMoveis = gerarFeriadosMoveis(anoRef);
    const carnaval = gerarCarnaval(anoRef);
    const todosFeriados = [...feriadosFixos, ...feriadosMoveis];

    return {
        user,
        vacations,
        baseFolgaDomingo,
        AREAS_WITHOUT_DSR,
        aniversario,
        todosFeriados,
        carnaval,
    };
}
