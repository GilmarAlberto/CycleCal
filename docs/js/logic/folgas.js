// ==============================
// CycleCal — Módulo de Folgas
// v4.0
// ==============================

import { cyclePatterns, buildSecondaryModel, parseCustomPattern } from "./model.js";
import { toLocalDate } from "./utils.js";

// ==============================
// getDayType()
// Calcula se um dia é de trabalho ou folga com base no ciclo de plantão.
//
// Parâmetros:
//   date  — objeto Date do dia a verificar
//   model — objeto retornado por buildModel() ou equivalente com { cycle: { pattern, baseDate } }
//
// Retorna: 'work' | 'off' | null
//   null = padrão não configurado ou não reconhecido
// ==============================

export function getDayType(date, model) {
    const { pattern, baseDate } = model.cycle;

    if (!pattern || !baseDate) return null;

    const cp = cyclePatterns[pattern] || parseCustomPattern(pattern);
    if (!cp) return null;

    // toLocalDate() garante que strings "YYYY-MM-DD" não sejam
    // interpretadas como UTC (bug UTC-3 que desloca o dia).
    const base   = toLocalDate(baseDate);
    const target = typeof date === "string" ? toLocalDate(date) : (() => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    })();

    const diffDays = Math.round((target - base) / 86400000);
    const cycleLen = cp.work.length + cp.off.length;

    // Módulo sempre positivo (funciona para datas anteriores à base)
    const pos = ((diffDays % cycleLen) + cycleLen) % cycleLen;

    return cp.work.includes(pos) ? "work" : "off";
}

// ==============================
// getDayType12x36Extra()   — v4.0
// Variante da 12x36 com folga adicional após cada 5º plantão.
//
// Ciclo irregular (11 dias):
//   P F P F P F P F P F F F  ← onde P=plantão(work), F=folga(off)
//   pos: 0 1 2 3 4 5 6 7 8 9 10
//   Plantões nas posições: 0, 2, 4, 6, 8  (5 plantões)
//   Folgas nas posições:   1, 3, 5, 7, 9, 10  (após 5º plantão: folga extra)
//
// O ciclo tem 11 dias: 5 plantões × 2 dias (12h+36h) + 1 dia extra de folga.
// A folga extra (pos 10) é marcada com tipo "off-extra" para destaque visual.
//
// Parâmetros:
//   date    — objeto Date do dia a verificar
//   baseDate — string "YYYY-MM-DD" do dia base (último dia trabalhado)
//
// Retorna: 'work' | 'off' | 'off-extra' | null
// ==============================

export function getDayType12x36Extra(date, baseDate) {
    if (!baseDate) return null;

    const base   = toLocalDate(baseDate);
    const target = typeof date === "string" ? toLocalDate(date) : (() => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    })();

    const diffDays = Math.round((target - base) / 86400000);
    const cycleLen = 11; // 5 plantões × 2 dias + 1 folga extra

    const pos = ((diffDays % cycleLen) + cycleLen) % cycleLen;

    // Posições de trabalho: 0, 2, 4, 6, 8
    if (pos % 2 === 0 && pos <= 8) return "work";
    // Folga extra: última posição do ciclo (após o 5º plantão)
    if (pos === 10) return "off-extra";
    // Demais posições: folga normal (36h)
    return "off";
}

// ==============================
// getDayType6hSemanal()   — v4.1
// Turno de 6h com folga semanal fixa em um dia da semana.
//
// Parâmetros:
//   date           — objeto Date do dia a verificar
//   folgaDiaSemana — número 0–6 (0=dom, 1=seg … 6=sab)
//
// Retorna: 'work' | 'off' | null
// ==============================

export function getDayType6hSemanal(date, folgaDiaSemana) {
    if (folgaDiaSemana === null || folgaDiaSemana === undefined) return null;

    const target = typeof date === "string" ? toLocalDate(date) : (() => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    })();

    return target.getDay() === Number(folgaDiaSemana) ? "off" : "work";
}

// ==============================
// ehFolga()
// Ponto de entrada unificado — mantém assinatura original para
// compatibilidade com events.js, main.js e index.html.
//
// Roteamento (em ordem de prioridade):
//   1. 12x36 com folga extra (v4.0)    → getDayType12x36Extra()
//   2. 6h com folga semanal (v4.1)     → getDayType6hSemanal()
//   3. Plantão padrão                  → getDayType()
//   4. Semanal legado                  → DSR + domingo rotativo
// ==============================

export function ehFolga(data, user, baseFolgaDomingo, AREAS_WITHOUT_DSR) {
    const area      = user.profile.area;
    const scaleType = user.settings.scale_type || "";
    const pattern   = user.settings.scale_pattern || "";

    // --- v4.0: 12x36 com folga extra a cada 5 plantões ---
    if (pattern === "12x36" && user.settings.folga_extra_5plantoes === true) {
        const tipo = getDayType12x36Extra(data, user.settings.base_date);
        return tipo === "off" || tipo === "off-extra";
    }

    // --- v4.1: turno de 6h com folga semanal fixa ---
    if (pattern === "6h") {
        const fds = user.settings.folga_dia_semana ?? null;
        return getDayType6hSemanal(data, fds) === "off";
    }

    // --- Plantão: áreas fixas (segurança, hospital) OU qualquer área com type=plantao ---
    if (AREAS_WITHOUT_DSR.includes(area) || scaleType === "plantao") {
        const model = {
            cycle: {
                pattern:  pattern,
                baseDate: user.settings.base_date || "",
            },
        };

        return getDayType(data, model) === "off";
    }

    // --- Semanal com cyclePatterns (ex: 6x1, 5x2) ---
    // Só usa getDayType() se for explicitamente plantão (scale_type = "plantao").
    // Escalas semanais (6x1, 5x2) usam a lógica legada de DSR + domingo rotativo,
    // pois o ciclo de dias não captura o descanso semanal fixo nem o domingo a cada N semanas.
    if (pattern && cyclePatterns[pattern] && scaleType === "plantao") {
        const model = {
            cycle: {
                pattern,
                baseDate: user.settings.base_date || "",
            },
        };
        return getDayType(data, model) === "off";
    }

    // --- v5.0: NxM livre com scale_type semanal → rota pelo ciclo posicional ---
    // Padrões livres (ex: 4x2, 3x1) não têm DSR fixo nem domingo rotativo.
    // A folga é posicional no ciclo, igual ao plantão.
    if (pattern && scaleType === "semanal" && !cyclePatterns[pattern]) {
        const cp = parseCustomPattern(pattern);
        if (cp) {
            const model = {
                cycle: {
                    pattern,
                    baseDate: user.settings.base_date || "",
                },
            };
            return getDayType(data, model) === "off";
        }
    }

    // --- Semanal legado: DSR fixo + domingo a cada N semanas ---
    // Fallback para usuários sem scale_pattern definido em cyclePatterns.
    const dsr = Number(user.settings.dsr || 0);

    if (data.getDay() === dsr) return true;

    if (data.getDay() === 0) {
        const diff = Math.floor(
            (Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) -
                Date.UTC(
                    baseFolgaDomingo.getFullYear(),
                    baseFolgaDomingo.getMonth(),
                    baseFolgaDomingo.getDate(),
                )) /
                86400000,
        );

        const sundayCycle = Number(user.settings.sunday_cycle ?? 3);
        return Math.floor(diff / 7) % sundayCycle === 0;
    }

    return false;
}

// ==============================
// getDayTypeSecondary()
// Calcula o tipo do dia para a escala secundária do usuário.
//
// Parâmetros:
//   date — objeto Date ou string "YYYY-MM-DD"
//   user — objeto user vindo do localStorage
//
// Retorna: 'work' | 'off' | null
//   null = escala secundária não configurada
// ==============================

export function getDayTypeSecondary(date, user) {
    const model = buildSecondaryModel(user);
    if (!model) return null;
    return getDayType(date, model);
}
