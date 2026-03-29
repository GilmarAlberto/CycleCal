// ==============================
// CycleCal — Utilitários
// ==============================

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
