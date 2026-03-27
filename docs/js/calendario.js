(function () {
    function ehFolga(data) {
        const user = getUser();
        const dsr = Number(user.settings.dsr || 0);
        const area = user.profile.area;

        // 🚫 ignora DSR para essas áreas
        if (!AREAS_WITHOUT_DSR.includes(area)) {
            if (data.getDay() === dsr) return true;
        }

        // 🔁 ciclo de domingo (mantido)
        if (data.getDay() === 0) {
            const diff = Math.floor(
                (Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) -
                    Date.UTC(baseFolgaDomingo.getFullYear(), baseFolgaDomingo.getMonth(), baseFolgaDomingo.getDate())) /
                    86400000,
            );

            const semanas = Math.floor(diff / 7);
            return semanas % 3 === 0;
        }

        return false;
    }

    function resolverEvento(eventos) {
        const prioridadeEventos = ["vacation", "folga", "holiday", "cultural", "birthday"];

        for (const tipo of prioridadeEventos) {
            if (eventos.includes(tipo)) {
                return tipo;
            }
        }

        return null;
    }

    function eventosDoDia(data, todosFeriados, carnaval, aniversario) {
        const eventos = [];

        if (ehFolga(data)) eventos.push("folga");

        if (ehFerias(data)) eventos.push("vacation");

        if (ehFeriado(data, todosFeriados)) eventos.push("holiday");

        if (ehFeriado(data, carnaval)) eventos.push("cultural");

        if (aniversario && data.getDate() === aniversario.dia && data.getMonth() === aniversario.mes) {
            eventos.push("birthday");
        }

        return eventos;
    }

    function ehFeriado(data, lista) {
        return lista.find((f) => f.dia === data.getDate() && f.mes === data.getMonth());
    }

    function ehFerias(data) {
        const dateStr =
            data.getFullYear() +
            "-" +
            String(data.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(data.getDate()).padStart(2, "0");

        return vacations.some((v) => dateStr >= v.start && dateStr <= v.end);
    }

    window.Calendario = {
        ehFolga,
        ehFerias,
        ehFeriado,
        eventosDoDia,
        resolverEvento
    };
})();
