export type dataType = {
    studentId: number;
    name: string;
    phoneNumber: string;
    year: number;
    class: string;
    firstSemester: semester;
    secondSemester: semester;
    presence: number;
};

export interface fullDataType extends Omit<dataType, 'firstSemester' | 'secondSemester' > {
    firstSemester: semester | { average: string };
    secondSemester: semester | { average: string };
    presencePercentage: number;
}

export type PaginatedFullDataType = {
    currentPage: number;
    elements: fullDataType[];
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

type semester = {
    mathGrade: number;
    portugueseGrade: number;
    historyGrade: number;
    geographyGrade: number;
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
        studentId: 1,
        name: 'João Lucas',
        phoneNumber: '(12) 93456-7890',
        year: 2024,
        class: '2-A',
        firstSemester: {
            mathGrade: 10,
            portugueseGrade: 8,
            historyGrade: 7.5,
            geographyGrade: 9,
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
            geographyGrade: 8,
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
        studentId: 1,
        name: 'João Lucas',
        phoneNumber: '(12) 93456-7890',
        year: 2023,
        class: '1-A',
        firstSemester: {
            mathGrade: 9,
            portugueseGrade: 9,
            historyGrade: 9.75,
            geographyGrade: 9,
            chemicalGrade: 8.5,
            phisycsGrade: 9.5,
            biologyGrade: 7,
            englishGrade: 10,
            spanishGrade: 9.5,
            artGrade: 10,
            phisycalEducationGrade: 9,
            sociologyGrade: 9,
            philosophyGrade: 9,
        },
        secondSemester: {
            mathGrade: 9.5,
            portugueseGrade: 8.5,
            historyGrade: 8,
            geographyGrade: 8,
            chemicalGrade: 9,
            phisycsGrade: 9.5,
            biologyGrade: 8.75,
            englishGrade: 9,
            spanishGrade: 9,
            artGrade: 10,
            phisycalEducationGrade: 9,
            sociologyGrade: 8,
            philosophyGrade: 9,
        },
        presence: 188, 
    },
    {
        studentId: 2,
        name: 'Maria Fernanda',
        phoneNumber: '(13) 99876-5432',
        year: 2024,
        class: '1-A',
        firstSemester: {
            mathGrade: 10,
            portugueseGrade: 8,
            historyGrade: 7.5,
            geographyGrade: 9,
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
            geographyGrade: 8,
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
        presence: 195, 
    },
]

export default data;
