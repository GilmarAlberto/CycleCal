import { eventosDoDia, buildLayers, getTopLayer } from "./logic/events.js";
import { ehFolga } from "./logic/folgas.js";
import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./logic/feriados.js";
import { getContext } from "./logic/context.js";
import { ajustarAniversario, formatarData, isValidDate } from "./logic/utils.js";
import { AREAS, AREA_PRESETS, AREAS_WITHOUT_DSR, normalizeArea, getAreaConfig } from "./logic/areas.js";
import { getProximaFerias } from "./logic/vacations.js";

// Expõe para o index.html
window.getContext         = getContext;
window.getAreaConfig      = getAreaConfig;
window.normalizeArea      = normalizeArea;
window.ajustarAniversario = ajustarAniversario;
window.formatarData       = formatarData;
window.isValidDate        = isValidDate;
window.AREAS_WITHOUT_DSR  = AREAS_WITHOUT_DSR;
window.AREAS              = AREAS;
window.AREA_PRESETS       = AREA_PRESETS;
window.getProximaFerias   = getProximaFerias;

// 🆕 Sistema de layers (Fase 1)
window.buildLayers  = buildLayers;
window.getTopLayer  = getTopLayer;

window.isFolga = function (data) {
    const ctx = getContext();
    return ehFolga(data, ctx.user, ctx.baseFolgaDomingo, ctx.AREAS_WITHOUT_DSR);
};

window.getEventos = function (data) {
    return eventosDoDia(data, getContext());
};

// Sinaliza que o módulo terminou de carregar
window.dispatchEvent(new CustomEvent("cyclecal:ready"));
