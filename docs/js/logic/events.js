import { ehFolga } from "./folgas.js";
import { ehFeriado } from "./holidays.js";
import { ehFerias } from "./vacations.js";

// ==============================
// CycleCal — Prioridades de Layer
// ==============================

const LAYER_PRIORITY = {
    vacation: 50,
    folga:    20,
    holiday:  10,
    cultural:  8,
    birthday:  5,
};

// ==============================
// Monta array de layers a partir dos eventos do dia
// ==============================

export function buildLayers(eventos) {
    return eventos.map((type) => ({
        type,
        priority: LAYER_PRIORITY[type] ?? 0,
    }));
}

// ==============================
// Retorna a layer de maior prioridade
// ==============================

export function getTopLayer(layers) {
    if (!layers.length) return null;
    return [...layers].sort((a, b) => b.priority - a.priority)[0];
}

// ==============================
// Retorna todos os eventos do dia como array de strings
// ==============================

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

