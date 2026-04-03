// ==============================
// CycleCal — Módulo de Folgas
// v1.9.4
// ==============================

import { cyclePatterns } from "./model.js";

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

    const [by, bm, bd] = baseDate.split("-").map(Number);
    const base = new Date(by, bm - 1, bd);
    base.setHours(0, 0, 0, 0);

    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

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
// Áreas semanais: mantém DSR por dia da semana + domingo a cada 3 semanas.
// ==============================

export function ehFolga(data, user, baseFolgaDomingo, AREAS_WITHOUT_DSR) {
    const area = user.profile.area;

    // --- Plantão (segurança, hospital etc.) ---
    if (AREAS_WITHOUT_DSR.includes(area)) {
        const model = {
            cycle: {
                pattern:  user.settings.scale_pattern || "",
                baseDate: user.settings.base_date     || "",
            },
        };

        return getDayType(data, model) === "off";
    }

    // --- Semanal (supermercado, indústria etc.) ---
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

        return Math.floor(diff / 7) % 3 === 0;
    }

    return false;
}
