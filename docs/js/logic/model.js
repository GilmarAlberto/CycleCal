// ==============================
// CycleCal — Modelo de Dados Centralizado
// v5.0
// ==============================

// Padrões de ciclo de plantão.
// Cada entrada representa a sequência do ciclo como array de dias:
// work = índices de posição onde o dia é de trabalho
// off  = índices de posição onde o dia é de folga
// Total de dias do ciclo = work.length + off.length
//
// "6h" — turno de 6h com folga semanal fixa (v4.1).
//   O cyclePattern aqui é apenas um marcador de tipo.
//   A lógica real usa folga_dia_semana em ehFolga() / getDayType6hSemanal().
//
// "12x36" com folga_extra_5plantoes (v4.0) — ciclo irregular tratado em
//   getDayType12x36Extra() em folgas.js. O cyclePattern base continua 2 dias.

export const cyclePatterns = {
    "12x36": { work: [0],          off: [1]          }, // 12h trabalho / 36h folga  → ciclo de 2 dias
    "24x72": { work: [0],          off: [1, 2, 3]    }, // 24h trabalho / 72h folga  → ciclo de 4 dias
    "24x96": { work: [0],          off: [1, 2, 3, 4] }, // 24h trabalho / 96h folga  → ciclo de 5 dias
    "12x60": { work: [0],          off: [1, 2, 3, 4, 5] }, // 12h trabalho / 60h folga → ciclo de 6 dias
    "5x2":   { work: [0,1,2,3,4], off: [5, 6]       }, // 5 dias trabalho / 2 folga → ciclo de 7 dias
    "6x1":   { work: [0,1,2,3,4,5], off: [6]        }, // 6 dias trabalho / 1 folga → ciclo de 7 dias
    "6h":    { work: [0],          off: []           }, // marcador: lógica real em getDayType6hSemanal()
};

// ==============================
// parseCustomPattern()
// Converte uma string NxM em um objeto { work, off } compatível com cyclePatterns.
//
// Parâmetros:
//   pattern — string no formato "NxM" (ex: "4x2", "3x1", "10x4")
//
// Retorna: { work: [...], off: [...] } | null se inválido
//
// Exemplos:
//   "4x2" → { work: [0,1,2,3], off: [4,5] }
//   "3x1" → { work: [0,1,2],   off: [3]   }
// ==============================

export function parseCustomPattern(pattern) {
    if (!pattern || typeof pattern !== "string") return null;

    const match = pattern.trim().match(/^(\d+)[xX](\d+)$/);
    if (!match) return null;

    const work = Number(match[1]);
    const rest = Number(match[2]);

    if (work < 1 || rest < 1 || work > 365 || rest > 365) return null;

    return {
        work: Array.from({ length: work }, (_, i) => i),
        off:  Array.from({ length: rest }, (_, i) => work + i),
    };
}

// ==============================
// validateCustomPattern()
// Valida uma string NxM e retorna um objeto descritivo do resultado.
//
// Parâmetros:
//   pattern — string digitada pelo usuário
//
// Retorna:
//   { valid: true,  work, rest, cycleLen }  — quando válido
//   { valid: false, error: "mensagem" }      — quando inválido
// ==============================

export function validateCustomPattern(pattern) {
    if (!pattern || !pattern.trim()) {
        return { valid: false, error: "Informe o padrão da escala." };
    }

    const trimmed = pattern.trim();

    // Está na tabela fixa? Sempre válido.
    if (cyclePatterns[trimmed]) {
        const cp = cyclePatterns[trimmed];
        return { valid: true, work: cp.work.length, rest: cp.off.length, cycleLen: cp.work.length + cp.off.length, fixed: true };
    }

    if (!/^\d+[xX]\d+$/.test(trimmed)) {
        return { valid: false, error: "Use o formato NxM (ex: 4x2, 3x1)." };
    }

    const [w, r] = trimmed.split(/[xX]/).map(Number);

    if (w < 1) return { valid: false, error: "Dias de trabalho deve ser pelo menos 1." };
    if (r < 1) return { valid: false, error: "Dias de folga deve ser pelo menos 1." };
    if (w > 365 || r > 365) return { valid: false, error: "Valor muito alto (máx. 365)." };

    return { valid: true, work: w, rest: r, cycleLen: w + r, fixed: false };
}

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
            // v4.0 — folga extra a cada 5 plantões (12x36 variante)
            folgaExtra5: user.settings.folga_extra_5plantoes === true,
            // v4.1 — turno de 6h com folga semanal fixa (0=dom … 6=sab)
            folgaDiaSemana: user.settings.folga_dia_semana ?? null,
        },
        profile: {
            area: user.profile.area        || "outros",
            dsr:  Number(user.settings.dsr ?? 0),
        },
    };
}

// ==============================
// buildSecondaryModel()
// Constrói o model para a escala secundária (segunda instituição).
//
// Parâmetros:
//   user — objeto user vindo do localStorage
//
// Retorna o model da escala secundária | null se não configurada.
//
// A escala secundária não tem histórico — usa sempre os dados
// atuais de user.secondary_scale.
// ==============================

export function buildSecondaryModel(user) {
    const sec = user?.secondary_scale;

    if (!sec || !sec.pattern || !sec.base_date) return null;

    return {
        cycle: {
            pattern:  sec.pattern,
            type:     "plantao",
            baseDate: sec.base_date,
        },
        profile: {
            area: user.profile.area || "outros",
            dsr:  0,
        },
        institution: sec.institution || "",
        color:        sec.color       || "#e67e22",
    };
}
