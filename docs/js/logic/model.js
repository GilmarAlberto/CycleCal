// ==============================
// CycleCal — Modelo de Dados Centralizado
// v1.9.4
// ==============================

// Padrões de ciclo de plantão.
// Cada entrada representa a sequência do ciclo como array de dias:
// work = índices de posição onde o dia é de trabalho
// off  = índices de posição onde o dia é de folga
// Total de dias do ciclo = work.length + off.length
//
// ⚠️ Placeholder — regras reais serão definidas ao trabalhar
//    com as áreas de segurança e saúde (v1.9.x futura).

export const cyclePatterns = {
    "24x72": { work: [0],    off: [1, 2, 3]       }, // 24h trabalho / 72h folga
    "24x96": { work: [0],    off: [1, 2, 3, 4]    }, // 24h trabalho / 96h folga
    "12x36": { work: [0],    off: [1, 2, 3]       }, // 12h trabalho / 36h folga
    "12x60": { work: [0],    off: [1, 2, 3, 4, 5] }, // 12h trabalho / 60h folga
};

// Constrói o model a partir do objeto user (vindo do localStorage).
// Retorna apenas os dados necessários para cálculo de tipo de dia.
export function buildModel(user) {
    return {
        cycle: {
            pattern:  user.settings.scale_pattern || "",
            type:     user.settings.scale_type    || "",
            baseDate: user.settings.base_date     || "",
        },
        profile: {
            area: user.profile.area         || "outros",
            dsr:  Number(user.settings.dsr  ?? 0),
        },
    };
}
