import { eventosDoDia, resolverEvento } from "./calendario.js";
import { ehFolga } from "./logic/folgas.js";
import { feriadosFixos, gerarFeriadosMoveis, gerarCarnaval } from "./logic/feriados.js";

function getContext() {
    const user = getUser();

    let aniversario = null;

    if (user.profile.birthday) {
        const [y, m, d] = user.profile.birthday.split("-");
        aniversario = {
            dia: Number(d),
            mes: Number(m) - 1,
        };
    }

    const feriadosMoveis = gerarFeriadosMoveis(anoAtual);
    const carnaval = gerarCarnaval(anoAtual);
    const todosFeriados = [...feriadosFixos, ...feriadosMoveis];

    return {
        user,
        vacations,
        baseFolgaDomingo,
        AREAS_WITHOUT_DSR,
        aniversario,
        todosFeriados,
        carnaval,
    };
}

window.getEventosDoDia = function (data) {
    const context = getContext();
    return resolverEvento(eventosDoDia(data, context));
};

window.isFolga = function (data) {
    const context = getContext();
    return ehFolga(data, context.user, context.baseFolgaDomingo, context.AREAS_WITHOUT_DSR);
};

window.getEventos = function (data) {
    const context = getContext();
    return eventosDoDia(data, context);
};

window.getEventoPrincipal = function (data) {
    return resolverEvento(window.getEventos(data));
};

// Expõe funções de feriados globalmente para compatibilidade
// com gerarCalendario() no index.html (remover após Etapa 4)
window.gerarFeriadosMoveis = gerarFeriadosMoveis;
window.gerarCarnaval = gerarCarnaval;
window.feriadosFixos = feriadosFixos;
