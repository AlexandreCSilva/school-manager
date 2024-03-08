export function translateState(state: string) {
    switch (state) {
        case 'approved':
            return 'aprovado';
        case 'disapproved':
            return 'reprovado';
        case 'open':
            return 'em aberto';
        case 'Aprovado':
            return 'approved';
        case 'Reprovado':
            return 'disapproved';
        case 'Em aberto':
            return 'open';
        default:
            return state;
    }
}

export function addPercentage(value: number | string) {
    return value.toString() + '%';
}

export function greenToRedColor(value: number) {
    const hue = ((value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}