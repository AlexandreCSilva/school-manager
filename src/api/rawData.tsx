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
    firstSemester: semester & { average: number };
    secondSemester: semester & { average: number };
    presencePercentage: number;
    state: string;
}

export type PaginatedFullDataType = {
    currentPage: number;
    elements: fullDataType[];
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

type semester = {
    mathGrade: number | null;
    portugueseGrade: number | null;
    historyGrade: number | null;
    geographyGrade: number | null;
    chemicalGrade: number | null;
    phisycsGrade: number | null;
    biologyGrade: number | null;
    englishGrade: number | null;
    spanishGrade: number | null;
    artGrade: number | null;
    phisycalEducationGrade: number | null;
    sociologyGrade: number | null;
    philosophyGrade: number | null;
}

const data = [
    {
        studentId: 1,
        name: 'João Lucas',
        phoneNumber: '(12) 93456-7890',
        year: 2024,
        class: '2-A',
        firstSemester: {
            mathGrade: 5,
            portugueseGrade: 4,
            historyGrade: 4,
            geographyGrade: 5,
            chemicalGrade: 3.5,
            phisycsGrade: 4,
            biologyGrade: 4.5,
            englishGrade: 5,
            spanishGrade: 4.5,
            artGrade: 5,
            phisycalEducationGrade: null,
            sociologyGrade: 4.5,
            philosophyGrade: 4.5,
        },
        secondSemester: {
            mathGrade: null,
            portugueseGrade: null,
            historyGrade: null,
            geographyGrade: null,
            chemicalGrade: null,
            phisycsGrade: null,
            biologyGrade: null,
            englishGrade: null,
            spanishGrade: null,
            artGrade: null,
            phisycalEducationGrade: null,
            sociologyGrade: null,
            philosophyGrade: null,
        },
        presence: 64, 
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
    {
        studentId: 3,
        name: 'Marcos Neto',
        phoneNumber: '(14) 92345-6789',
        year: 2022,
        class: '3-B',
        firstSemester: {
            mathGrade: 8,
            portugueseGrade: 8,
            historyGrade: 7.75,
            geographyGrade: 8,
            chemicalGrade: 8.75,
            phisycsGrade: 8.5,
            biologyGrade: 7,
            englishGrade: 9,
            spanishGrade: 8.75,
            artGrade: 8,
            phisycalEducationGrade: 8,
            sociologyGrade: 8,
            philosophyGrade: 7,
        },
        secondSemester: {
            mathGrade: 8.5,
            portugueseGrade: 8.5,
            historyGrade: 7,
            geographyGrade: 8,
            chemicalGrade: 8,
            phisycsGrade: 8.5,
            biologyGrade: 8.75,
            englishGrade: 8,
            spanishGrade: 7,
            artGrade: 8,
            phisycalEducationGrade: 8,
            sociologyGrade: 8,
            philosophyGrade: 7,
        },
        presence: 164, 
    },
    {
        studentId: 4,
        name: 'Luana Segunda',
        phoneNumber: '(12) 91234-5678',
        year: 2022,
        class: '3-B',
        firstSemester: {
            mathGrade: 6,
            portugueseGrade: 8,
            historyGrade: 7.75,
            geographyGrade: 7,
            chemicalGrade: 6.25,
            phisycsGrade: 4.5,
            biologyGrade: 7,
            englishGrade: 8,
            spanishGrade: 7.75,
            artGrade: 8,
            phisycalEducationGrade: 6,
            sociologyGrade: 8,
            philosophyGrade: 7,
        },
        secondSemester: {
            mathGrade: 6.75,
            portugueseGrade: 6.75,
            historyGrade: 7,
            geographyGrade: 7,
            chemicalGrade: 6,
            phisycsGrade: 5,
            biologyGrade: 7.75,
            englishGrade: 8,
            spanishGrade: 7,
            artGrade: 8,
            phisycalEducationGrade: 6,
            sociologyGrade: 8,
            philosophyGrade: 7,
        },
        presence: 198, 
    },
    {
        studentId: 5,
        name: 'Alan Henrique',
        phoneNumber: '(12) 95756-7890',
        year: 2023,
        class: '2-B',
        firstSemester: {
            mathGrade: null,
            portugueseGrade: null,
            historyGrade: null,
            geographyGrade: null,
            chemicalGrade: null,
            phisycsGrade: null,
            biologyGrade: null,
            englishGrade: null,
            spanishGrade: null,
            artGrade: null,
            phisycalEducationGrade: null,
            sociologyGrade: null,
            philosophyGrade: null,
        },
        secondSemester: {
            mathGrade: null,
            portugueseGrade: null,
            historyGrade: null,
            geographyGrade: null,
            chemicalGrade: null,
            phisycsGrade: null,
            biologyGrade: null,
            englishGrade: null,
            spanishGrade: null,
            artGrade: null,
            phisycalEducationGrade: null,
            sociologyGrade: null,
            philosophyGrade: null,
        },
        presence: 8, 
    },
    {
        studentId: 6,
        name: 'Vitor Santos',
        phoneNumber: '(14) 9777-7777',
        year: 2023,
        class: '1-B',
        firstSemester: {
            mathGrade: 7,
            portugueseGrade: 7,
            historyGrade: 7,
            geographyGrade: 7,
            chemicalGrade: 7,
            phisycsGrade: 7,
            biologyGrade: 7,
            englishGrade: 7,
            spanishGrade: 7,
            artGrade: 7,
            phisycalEducationGrade: 7,
            sociologyGrade: 7,
            philosophyGrade: 7,
        },
        secondSemester: {
            mathGrade: null,
            portugueseGrade: null,
            historyGrade: null,
            geographyGrade: null,
            chemicalGrade: null,
            phisycsGrade: null,
            biologyGrade: null,
            englishGrade: null,
            spanishGrade: null,
            artGrade: null,
            phisycalEducationGrade: null,
            sociologyGrade: null,
            philosophyGrade: null,
        },
        presence: 188, 
    },
]

export default data;
