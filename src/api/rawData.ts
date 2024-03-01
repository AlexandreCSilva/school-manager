export type fullDataType = {
    name: string;
    phoneNumber: string;
    year: number;
    class: string;
    firstSemester: semester | { average: string };
    secondSemester: semester | { average: string };
    presence: number;
    presencePercentage: number;
}

export type dataType = {
    name: string;
    phoneNumber: string;
    year: number;
    class: string;
    firstSemester: semester;
    secondSemester: semester;
    presence: number;
};

type semester = {
    mathGrade: number;
    portugueseGrade: number;
    historyGrade: number;
    geometryGrade: number;
    chemicalGrade: number;
    phisycsGrade: number;
    biologyGrade: number;
    englishGrade: number;
    spanishGrade: number;
    artGrade: number;
    phisycalEducationGrade: number;
    sociologyGrade: number;
    philosophyGrade: number;
}

const data = [
    {
        name: 'João Lucas',
        phoneNumber: '(12) 93456-7890',
        year: 2024,
        class: '1-A',
        firstSemester: {
            mathGrade: 10,
            portugueseGrade: 8,
            historyGrade: 7.5,
            geometryGrade: 9,
            chemicalGrade: 8.5,
            phisycsGrade: 9.5,
            biologyGrade: 8,
            englishGrade: 10,
            spanishGrade: 9.5,
            artGrade: 10,
            phisycalEducationGrade: 8,
            sociologyGrade: 9,
            philosophyGrade: 9,
        },
        secondSemester: {
            mathGrade: 10,
            portugueseGrade: 8.5,
            historyGrade: 8,
            geometryGrade: 8,
            chemicalGrade: 9.5,
            phisycsGrade: 9.75,
            biologyGrade: 8.75,
            englishGrade: 10,
            spanishGrade: 9.5,
            artGrade: 10,
            phisycalEducationGrade: 8,
            sociologyGrade: 8,
            philosophyGrade: 9,
        },
        presence: 184, 
    },
    {
        name: 'Maria Fernanda',
        phoneNumber: '(13) 99876-5432',
        year: 2024,
        class: '1-A',
        firstSemester: {
            mathGrade: 10,
            portugueseGrade: 8,
            historyGrade: 7.5,
            geometryGrade: 9,
            chemicalGrade: 8.5,
            phisycsGrade: 9.5,
            biologyGrade: 8,
            englishGrade: 10,
            spanishGrade: 9.5,
            artGrade: 10,
            phisycalEducationGrade: 8,
            sociologyGrade: 9,
            philosophyGrade: 9,
        },
        secondSemester: {
            mathGrade: 10,
            portugueseGrade: 8.5,
            historyGrade: 8,
            geometryGrade: 8,
            chemicalGrade: 9.5,
            phisycsGrade: 9.75,
            biologyGrade: 8.75,
            englishGrade: 10,
            spanishGrade: 9.5,
            artGrade: 10,
            phisycalEducationGrade: 8,
            sociologyGrade: 8,
            philosophyGrade: 9,
        },
        presence: 184, 
    },
]

export default data;
