// ==============================
// CycleCal — Modelo de Dados Centralizado
// v1.9.5
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

// ==============================
// getScaleForDate()
// Retorna a entrada do scale_history vigente para uma data específica.
//
// Parâmetros:
//   date         — objeto Date ou string "YYYY-MM-DD" do dia a consultar
//   scaleHistory — array de entradas { pattern, type, base_date, since }
//
// Retorna: a entrada vigente naquela data | null se histórico vazio
//
// Lógica:
//   Cada entrada vale a partir de `since` até o `since` da próxima entrada.
//   Ordena por `since` crescente e retorna a última entrada cujo `since`
//   seja <= à data consultada.
// ==============================

export function getScaleForDate(date, scaleHistory) {
    if (!scaleHistory || scaleHistory.length === 0) return null;

    // Normaliza para string "YYYY-MM-DD"
    let dateStr;
    if (typeof date === "string") {
        dateStr = date.slice(0, 10);
    } else {
        dateStr =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0");
    }

    // Ordena por since crescente e pega a última vigente
    const sorted = [...scaleHistory].sort((a, b) => (a.since > b.since ? 1 : -1));
    let vigente = null;

    for (const entry of sorted) {
        if (entry.since <= dateStr) {
            vigente = entry;
        } else {
            break;
        }
    }

    return vigente;
}

// ==============================
// buildModel()
// Constrói o model a partir do objeto user (vindo do localStorage).
// Retorna apenas os dados necessários para cálculo de tipo de dia.
//
// Se uma data for passada, usa getScaleForDate() para buscar a escala
// vigente naquele período (histórico). Caso contrário, usa settings atual.
// ==============================

export function buildModel(user, date = null) {
    let pattern, type, baseDate;

    if (date && user.scale_history && user.scale_history.length > 0) {
        const entry = getScaleForDate(date, user.scale_history);
        pattern  = entry?.pattern   || user.settings.scale_pattern || "";
        type     = entry?.type      || user.settings.scale_type    || "";
        baseDate = entry?.base_date || user.settings.base_date     || "";
    } else {
        pattern  = user.settings.scale_pattern || "";
        type     = user.settings.scale_type    || "";
        baseDate = user.settings.base_date     || "";
    }

    return {
        cycle: {
            pattern,
            type,
            baseDate,
        },
        profile: {
            area: user.profile.area        || "outros",
            dsr:  Number(user.settings.dsr ?? 0),
        },
    };
}
