export function ehFolga(data, user, baseFolgaDomingo, AREAS_WITHOUT_DSR) {
    const dsr = Number(user.settings.dsr || 0);
    const area = user.profile.area;

    if (!AREAS_WITHOUT_DSR.includes(area)) {
        if (data.getDay() === dsr) return true;
    }

    if (data.getDay() === 0) {
        const diff = Math.floor(
            (Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) -
                Date.UTC(baseFolgaDomingo.getFullYear(), baseFolgaDomingo.getMonth(), baseFolgaDomingo.getDate())) /
                86400000
        );

        const semanas = Math.floor(diff / 7);
        return semanas % 3 === 0;
    }

    return false;
}
