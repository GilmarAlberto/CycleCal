// ==============================
// CycleCal — Modelo Genérico de Eventos
// v1.9.10
// ==============================
// Define a estrutura canônica de um evento no CycleCal.
// Todos os tipos de evento (folga, férias, feriado, aniversário,
// troca de turno, etc.) seguem este modelo.
//
// Estrutura de um evento:
// {
//   id:       string  — identificador único (UUID)
//   type:     string  — tipo do evento (ver EVENT_TYPES)
//   start:    string  — data de início "YYYY-MM-DD"
//   end:      string  — data de fim    "YYYY-MM-DD" (igual a start para eventos de 1 dia)
//   label:    string  — descrição legível (opcional)
//   meta:     object  — dados extras específicos do tipo (opcional)
// }
// ==============================

// ==============================
// Tipos de evento suportados
// ==============================
export const EVENT_TYPES = {
    FOLGA:    "folga",      // dia de descanso da escala
    VACATION: "vacation",   // período de férias
    HOLIDAY:  "holiday",    // feriado nacional/estadual/municipal
    CULTURAL: "cultural",   // feriado cultural (ex: carnaval)
    BIRTHDAY: "birthday",   // aniversário do usuário
    SWAP:     "swap",       // troca de turno
};

// ==============================
// Prioridades de exibição por tipo
// (quanto maior, mais relevante visualmente)
// ==============================
export const EVENT_PRIORITY = {
    [EVENT_TYPES.VACATION]: 50,
    [EVENT_TYPES.FOLGA]:    20,
    [EVENT_TYPES.SWAP]:     15,
    [EVENT_TYPES.HOLIDAY]:  10,
    [EVENT_TYPES.CULTURAL]:  8,
    [EVENT_TYPES.BIRTHDAY]:  5,
};

// ==============================
// createEvent(fields)
// Fábrica de eventos — garante estrutura consistente.
//
// Parâmetros obrigatórios: type, start
// Parâmetros opcionais:    id, end, label, meta
//
// Exemplo:
//   createEvent({ type: EVENT_TYPES.HOLIDAY, start: "2026-04-21", label: "Tiradentes" })
// ==============================
export function createEvent({ id, type, start, end, label = "", meta = {} } = {}) {
    if (!type)  throw new Error("[createEvent] 'type' é obrigatório");
    if (!start) throw new Error("[createEvent] 'start' é obrigatório");

    return {
        id:    id    || crypto.randomUUID(),
        type,
        start,
        end:   end   || start,
        label,
        meta,
    };
}

// ==============================
// isValidEvent(event)
// Valida se um objeto segue a estrutura mínima de evento.
// ==============================
export function isValidEvent(event) {
    return (
        event &&
        typeof event.id    === "string" &&
        typeof event.type  === "string" &&
        typeof event.start === "string" &&
        typeof event.end   === "string"
    );
}

// ==============================
// getEventPriority(event)
// Retorna a prioridade de exibição de um evento.
// ==============================
export function getEventPriority(event) {
    return EVENT_PRIORITY[event.type] ?? 0;
}

// ==============================
// sortByPriority(events)
// Ordena array de eventos do maior para o menor priority.
// ==============================
export function sortByPriority(events) {
    return [...events].sort((a, b) => getEventPriority(b) - getEventPriority(a));
}

// ==============================
// filterByDate(events, dateStr)
// Filtra eventos que cobrem uma data específica "YYYY-MM-DD".
// ==============================
export function filterByDate(events, dateStr) {
    return events.filter((e) => dateStr >= e.start && dateStr <= e.end);
}
