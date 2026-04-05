// ==============================
// CycleCal — Utilitários
// v1.9.11
// ==============================

// ==============================
// getLocalTimezone()
// Detecta o timezone do navegador automaticamente.
// Fallback: "America/Sao_Paulo".
// ==============================
export function getLocalTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo";
    } catch {
        return "America/Sao_Paulo";
    }
}

// ==============================
// toLocalDate(dateStr, tz?)
// Converte uma string "YYYY-MM-DD" em um objeto Date
// interpretado no timezone local (ou no tz informado),
// evitando o bug de UTC que desloca o dia em UTC-3.
//
// Exemplos:
//   new Date("2025-04-01")        → interpreta como UTC → 2025-03-31 21:00 em UTC-3 ❌
//   toLocalDate("2025-04-01")     → 2025-04-01 00:00 no timezone local ✅
// ==============================
export function toLocalDate(dateStr, tz) {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
    // Constrói a data via componentes — nunca passa pelo parser ISO (UTC)
    const d = new Date(year, month - 1, day);
    d.setHours(0, 0, 0, 0);
    return d;
}

// ==============================
// dateToStr(date)
// Converte um objeto Date para "YYYY-MM-DD" usando
// os componentes locais (evita UTC shift).
// ==============================
export function dateToStr(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function ajustarAniversario(dia, mes, ano) {
    if (dia === 29 && mes === 1) {
        const diasFev = new Date(ano, 2, 0).getDate();
        if (diasFev === 28) {
            return { dia: 28, mes: 1 };
        }
    }
    return { dia, mes };
}

export function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

export function isValidDate(day, month) {
    const d = Number(day);
    const m = Number(month);
    if (m < 1 || m > 12) return false;
    if (d < 1) return false;
    const daysInMonth = new Date(2024, m, 0).getDate();
    return d <= daysInMonth;
}
