import { eventosDoDia, resolverEvento } from "./logic/events.js";
import { ehFolga } from "./logic/folgas.js";
import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./logic/feriados.js";
import { getContext } from "./logic/context.js";
import { ajustarAniversario, formatarData, isValidDate } from "./logic/utils.js";
import { AREAS, AREA_PRESETS, AREAS_WITHOUT_DSR, normalizeArea, getAreaConfig } from "./logic/areas.js";

// Expõe para o index.html
window.getContext       = getContext;
window.getAreaConfig    = getAreaConfig;
window.normalizeArea    = normalizeArea;
window.ajustarAniversario = ajustarAniversario;
window.formatarData     = formatarData;
window.isValidDate      = isValidDate;
window.AREAS_WITHOUT_DSR = AREAS_WITHOUT_DSR;
window.AREAS            = AREAS;
window.AREA_PRESETS     = AREA_PRESETS;

window.getEventosDoDia = function (data) {
    return resolverEvento(eventosDoDia(data, getContext()));
};

window.isFolga = function (data) {
    const ctx = getContext();
    return ehFolga(data, ctx.user, ctx.baseFolgaDomingo, ctx.AREAS_WITHOUT_DSR);
};

window.getEventos = function (data) {
    return eventosDoDia(data, getContext());
};

window.getEventoPrincipal = function (data) {
    return resolverEvento(window.getEventos(data));
};
