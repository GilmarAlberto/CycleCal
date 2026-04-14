// ==============================
// CycleCal — Configurações de Área
// ==============================

export const AREAS = [
    { value: "supermercado", label: "Supermercado / Varejo" },
    { value: "seguranca",    label: "Segurança Pública" },
    { value: "hospital",     label: "Hospital / Saúde" },
    // { value: "industria",    label: "Indústria" },
    { value: "outros",       label: "Outros" },
];

export const AREA_PRESETS = {
    seguranca:    { scale_type: "plantao", scale_pattern: "24x72" },
    hospital:     { scale_type: "plantao", scale_pattern: "12x36" },
    hospital_6h:  { scale_type: "semanal", scale_pattern: "6h"    }, // v4.1: turno de 6h
    supermercado: { scale_type: "semanal", scale_pattern: "6x1"   },
    // industria:    { scale_type: "escala",  scale_pattern: "5x1"   },
};

export const AREAS_WITHOUT_DSR = ["seguranca", "hospital"];

const AREA_CONFIG = {
    seguranca: {
        trabalho:   "Bom plantão 👮‍♂️",
        folga:      "Bom descanso",
        escala:     "Plantão",
        folgaLabel: "Descanso",
    },
    hospital: {
        trabalho:   "Bom plantão 🏥",
        folga:      "Bom descanso",
        escala:     "Plantão",
        folgaLabel: "Descanso",
    },
    supermercado: {
        trabalho:   "Bom trabalho",
        folga:      "Boa folga",
        escala:     "Escala",
        folgaLabel: "Folga",
    },
    industria: {},
    outros: {},
};

export function normalizeArea(area) {
    const valid = ["seguranca", "hospital", "supermercado", "industria", "outros"];
    return valid.includes(area) ? area : "outros";
}

export function getAreaConfig(area) {
    const base = {
        trabalho:   "Bom trabalho",
        folga:      "Bom descanso",
        escala:     "Escala",
        folgaLabel: "Descanso",
    };
    return { ...base, ...(AREA_CONFIG[area] || {}) };
}
