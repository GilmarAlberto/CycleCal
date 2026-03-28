export function ehFeriado(data, lista) {
    return lista.find(
        (f) => f.dia === data.getDate() && f.mes === data.getMonth()
    );
}
