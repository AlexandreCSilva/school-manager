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

export function translateGrade(grade: string) {
    const newGrade = grade.replace('Grade', '');

    switch (newGrade) {
        case 'math':
            return 'matemática';
        case 'portuguese':
            return 'português';
        case 'history':
            return 'história';
        case 'geography':
            return 'geografia';
        case 'chemical':
            return 'química';
        case 'phisycs':
            return 'física';
        case 'biology':
            return 'biologia';
        case 'english':
            return 'inglês';
        case 'spanish':
            return 'espanhol';
        case 'art':
            return 'arte';
        case 'phisycalEducation':
            return 'educação física';
        case 'sociology':
            return 'sociologia'; 
        case 'philosophy':
            return 'filosofia';
        case 'average':
            return 'média';
        default:
            return newGrade;
    }
}

export function addPercentage(value: number | string) {
    return value.toString() + '%';
}

export function greenToRedColor(value: number) {
    const hue = ((value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}

export const colorPallete = [
    '#ef1101', '#5c0300', '#a45d00', '#fd9206', '#ffd000', '#758f00',
    '#0efd0e', '#009a00', '#010afb', '#070b74', '#5d107e', '#ba20fd',
    '#e7766e',
];
