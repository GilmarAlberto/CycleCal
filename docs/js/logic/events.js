import { ehFolga } from "./folgas.js";
import { ehFeriado } from "./holidays.js";
import { ehFerias } from "./vacations.js";

export function eventosDoDia(data, context) {
    const eventos = [];

    if (ehFolga(data, context.user, context.baseFolgaDomingo, context.AREAS_WITHOUT_DSR)) {
        eventos.push("folga");
    }

    if (ehFerias(data, context.vacations)) {
        eventos.push("vacation");
    }

    if (ehFeriado(data, context.todosFeriados)) {
        eventos.push("holiday");
    }

    if (ehFeriado(data, context.carnaval)) {
        eventos.push("cultural");
    }

    if (
        context.aniversario &&
        data.getDate() === context.aniversario.dia &&
        data.getMonth() === context.aniversario.mes
    ) {
        eventos.push("birthday");
    }

    return eventos;
}

export function resolverEvento(eventos) {
    const prioridade = ["vacation", "folga", "holiday", "cultural", "birthday"];
    return prioridade.find((tipo) => eventos.includes(tipo)) || null;
}
