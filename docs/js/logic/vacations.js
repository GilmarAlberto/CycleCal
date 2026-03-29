export function ehFerias(data, vacations) {
    const dateStr =
        data.getFullYear() +
        "-" +
        String(data.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(data.getDate()).padStart(2, "0");

    return vacations.some((v) => dateStr >= v.start && dateStr <= v.end);
}

export function getProximaFerias(vacations) {
    if (!vacations || vacations.length === 0) return null;

    const hoje = new Date();
    // Usa string no mesmo formato das férias para evitar problema de timezone
    const hojeStr =
        hoje.getFullYear() +
        "-" +
        String(hoje.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(hoje.getDate()).padStart(2, "0");

    // Filtra férias que ainda não terminaram
    const futuras = vacations.filter((v) => v.end >= hojeStr);

    if (futuras.length === 0) return null;

    // Ordena pela data de início
    futuras.sort((a, b) => (a.start > b.start ? 1 : -1));

    return futuras[0];
}
