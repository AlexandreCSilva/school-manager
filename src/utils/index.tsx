import { color } from "echarts";
import { fullDataType } from "../api/rawData";

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
    const color2: number[] = [ 255, 255, 0 ]
    const color1: number[] = [ 255, 0, 0 ]
    const color3: number[] = [ 0, 255, 0 ];

    value = value / 100;

    const value2 = 1 - value;
    
    const rgb: number[] = value <= 0.5 
    ? [
        Math.round(color2[0] * value + color1[0] * value2),
        Math.round(color2[1] * value + color1[1] * value2),
    ]
    : [
        Math.round(color3[0] * value + color2[0] * value2),
        Math.round(color3[1] * value + color2[1] * value2),
    ];
    
    return `rgb(${rgb[0] * 2}, ${rgb[1] * 2}, 0)`;
}

export const colorPallete = [
    '#05434b', '#3f8e9e', '#a5dae4', '#58d199', '#3ac468', '#44be26',
    '#29a809', '#a4cf3e', '#e4e73d', '#ebca39', '#e7a84a', '#FFB38E', 
    '#FF8E8F', '#E178C5', '#8e61e2', '#9339cf',
];

export function ifNameAlreadyIn(data: fullDataType[]): fullDataType[] {
    const aux: string[] = [];
    const result: fullDataType[] = [];

    data.forEach(student => {
        if (aux.includes(student.name)) {
            const index = result.indexOf(
                result
                    .find(studentResult => studentResult && studentResult.name === student.name) as fullDataType
                );

            result.push({ ...result[index], name: '(' + result[index].year + ') ' + student.name,})

            delete result[index];

            result.push(student)
        } else {
            aux.push(student.name);
            result.push(student)
        }
    })

    return result;
}
