// ==============================
// CycleCal — Módulo de Folgas
// v1.9.14a
// ==============================

import { cyclePatterns, buildSecondaryModel } from "./model.js";
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

    const cp = cyclePatterns[pattern];
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
// ehFolga()
// Ponto de entrada unificado — mantém assinatura original para
// compatibilidade com events.js, main.js e index.html.
//
// Áreas de plantão (AREAS_WITHOUT_DSR): usa getDayType().
// Áreas semanais com cyclePatterns: usa getDayType() via cyclePatterns.
// Áreas semanais sem cyclePatterns: DSR por dia da semana + domingo a cada N semanas (legado).
// ==============================

export function ehFolga(data, user, baseFolgaDomingo, AREAS_WITHOUT_DSR) {
    const area      = user.profile.area;
    const scaleType = user.settings.scale_type || "";

    // --- Plantão: áreas fixas (segurança, hospital) OU qualquer área com type=plantao ---
    if (AREAS_WITHOUT_DSR.includes(area) || scaleType === "plantao") {
        const model = {
            cycle: {
                pattern:  user.settings.scale_pattern || "",
                baseDate: user.settings.base_date     || "",
            },
        };

        return getDayType(data, model) === "off";
    }

    // --- Semanal com cyclePatterns (ex: 6x1, 5x2) ---
    // Se o padrão estiver definido em cyclePatterns, usa getDayType() diretamente.
    // Isso garante cálculo correto para qualquer ciclo com múltiplos dias de folga.
    const pattern = user.settings.scale_pattern || "";
    if (pattern && cyclePatterns[pattern]) {
        const model = {
            cycle: {
                pattern,
                baseDate: user.settings.base_date || "",
            },
        };
        return getDayType(data, model) === "off";
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
