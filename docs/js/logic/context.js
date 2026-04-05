// ==============================
// CycleCal — Módulo de Contexto
// v1.9.11
// ==============================
// Centraliza a montagem do objeto context usado por eventosDoDia()
// Depende de globals do index.html: window.loadUser, vacations,
// baseFolgaDomingo, AREAS_WITHOUT_DSR, anoAtual

import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./feriados.js";
import { getTimezone } from "./storage.js";

export function getContext(ano) {
    const user = window.loadUser();

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
    const timezone = getTimezone();

    return {
        user,
        vacations,
        baseFolgaDomingo,
        AREAS_WITHOUT_DSR,
        aniversario,
        todosFeriados,
        carnaval,
        timezone,
    };
}
