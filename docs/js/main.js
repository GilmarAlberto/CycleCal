import { eventosDoDia, buildLayers, getTopLayer } from "./logic/events.js";
import { ehFolga, getDayTypeSecondary } from "./logic/folgas.js";
import { buildSecondaryModel, cyclePatterns } from "./logic/model.js";
import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./logic/feriados.js";
import { getContext } from "./logic/context.js";
import { ajustarAniversario, formatarData, isValidDate } from "./logic/utils.js";
import { AREAS, AREA_PRESETS, AREAS_WITHOUT_DSR, normalizeArea, getAreaConfig } from "./logic/areas.js";
import { getProximaFerias } from "./logic/vacations.js";
import { initStorage, loadUser, saveUser, clearUser, userExists, loadVacations, saveVacations, loadShiftSwaps, saveShiftSwaps, loadExtraShifts, saveExtraShifts, migrateToIndexedDB } from "./logic/storage.js";
import { EVENT_TYPES, EVENT_PRIORITY, createEvent, isValidEvent, getEventPriority, sortByPriority, filterByDate } from "./logic/events_model.js";

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
window.cyclePatterns      = cyclePatterns;
window.getProximaFerias   = getProximaFerias;

// 💾 Storage — camada de persistência centralizada
window.initStorage = initStorage;
window.loadUser    = loadUser;
window.saveUser    = saveUser;
window.clearUser   = clearUser;
window.userExists  = userExists;
window.loadVacations   = loadVacations;
window.saveVacations   = saveVacations;
window.loadShiftSwaps  = loadShiftSwaps;
window.saveShiftSwaps  = saveShiftSwaps;
window.loadExtraShifts = loadExtraShifts;
window.saveExtraShifts = saveExtraShifts;
window.migrateToIndexedDB = migrateToIndexedDB;

// 🧩 Modelo genérico de eventos (v1.9.10)
window.EVENT_TYPES       = EVENT_TYPES;
window.EVENT_PRIORITY    = EVENT_PRIORITY;
window.createEvent       = createEvent;
window.isValidEvent      = isValidEvent;
window.getEventPriority  = getEventPriority;
window.sortByPriority    = sortByPriority;
window.filterByDate      = filterByDate;

// 🆕 Sistema de layers
window.buildLayers  = buildLayers;
window.getTopLayer  = getTopLayer;

// 🆕 Multi-escala — v1.9.12.b
window.getDayTypeSecondary = function (data) {
    const user = window.loadUser();
    if (!user) return null;
    return getDayTypeSecondary(data, user);
};

window.buildSecondaryModel = function () {
    const user = window.loadUser();
    if (!user) return null;
    return buildSecondaryModel(user);
};

window.isFolga = function (data) {
    const ctx = getContext();
    return ehFolga(data, ctx.user, ctx.baseFolgaDomingo, ctx.AREAS_WITHOUT_DSR);
};

window.getEventos = function (data) {
    const ctx = getContext();
    ctx.shiftSwaps  = window._shiftSwaps  || [];
    ctx.extraShifts = window._extraShifts || [];
    return eventosDoDia(data, ctx);
};

// 🆕 Verifica se um dia (Date ou "YYYY-MM-DD") está envolvido em alguma troca
window.isSwap = function (data) {
    const shiftSwaps = window._shiftSwaps || [];
    if (!shiftSwaps.length) return false;

    let dateStr;
    if (typeof data === "string") {
        dateStr = data.slice(0, 10);
    } else {
        dateStr =
            data.getFullYear() +
            "-" +
            String(data.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(data.getDate()).padStart(2, "0");
    }

    return shiftSwaps.some((s) => s.from === dateStr || s.to === dateStr);
};

// Sinaliza que o módulo terminou de carregar
window.dispatchEvent(new CustomEvent("cyclecal:ready"));
