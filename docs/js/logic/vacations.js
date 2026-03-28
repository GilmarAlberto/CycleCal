export function ehFerias(data, vacations) {
    const dateStr =
        data.getFullYear() +
        "-" +
        String(data.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(data.getDate()).padStart(2, "0");

    return vacations.some((v) => dateStr >= v.start && dateStr <= v.end);
}
