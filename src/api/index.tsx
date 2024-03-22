import data, { dataType, fullDataType } from './rawData';
import { Request } from 'miragejs';

function getSemesterGradesInArray(obj: any): number[] {
    return Object.values(obj);
}

function daysPassed(dt: Date) {
    const current = new Date(dt.getTime());
    const previous = new Date(dt.getFullYear(), 0, 1);
  
    return Math.ceil((current.getDay() - previous.getDay() + 1));
}

function getCanSomeoneBeAproved(letiveDays: number) {
    return (daysPassed(new Date()) - letiveDays);
}

const routes = function(this: any) {
    this.passthrough("https://identitytoolkit.googleapis.com/**");

    this.get(
        'api/students/paginated', 
        (_schema: fullDataType, request: Request) => {
            const { years, size, start, names, classes, state } = request.queryParams;
            const yearFilter: number[] = years 
                ? (years as string[]).map((year: string) => Number(year)) 
                : [new Date().getFullYear()];
            const nameFilter: string[] = names ? names as unknown as string[] : [];
            const classFilter: string[] = classes ? classes as unknown as string[] : [];

            const take = size ? Number(size) : 10;
            const skip = start ? Number(start) : 0;
            const currentPage = skip;
            const currentElements = currentPage * take;

            const rawData: dataType[] = [];

            data.forEach(dataInfo => {
                if (yearFilter.includes(dataInfo.year)) {
                    if (classFilter.length !== 0) {
                        if (classFilter.includes(dataInfo.class)) {
                            if (nameFilter.length !== 0) {
                                if (nameFilter.includes(dataInfo.name)) {
                                    rawData.push(dataInfo)
                                }
                            } else {
                                rawData.push(dataInfo)
                            }
                        }
                    } else if (nameFilter.length !== 0) {
                        if (nameFilter.includes(dataInfo.name)) {
                            rawData.push(dataInfo)
                        }
                    } else {
                        rawData.push(dataInfo)
                    }
                }
            })

            const totalElements = rawData.length;
    
            const treatedData: fullDataType[] = rawData.map(element => {
                let count = 0;
                let sum = 0;
                let aux: number[] = [];

                count = Object.keys(element.firstSemester).length;

                aux = getSemesterGradesInArray(element.firstSemester);
                aux.forEach(grade => sum += Number(grade))

                const firstSemesterAverage = sum / count;

                count = Object.keys(element.secondSemester).length;

                sum = 0;

                aux = getSemesterGradesInArray(element.secondSemester);
                aux.forEach(grade => sum += Number(grade))

                const secondSemesterAverage = sum / count;

                return {
                    ...element,
                    firstSemester: {
                        ...element.firstSemester,
                        average: firstSemesterAverage
                    },
                    secondSemester: {
                        ...element.secondSemester,
                        average: secondSemesterAverage
                    },
                    presencePercentage: (element.presence / 200) * 100,
                    state: new Date().getFullYear() === element.year
                        ? getCanSomeoneBeAproved(1) < 200
                            ? 'open'
                            : ((element.presence / 200) * 100) < 90
                                ? 'disapproved'
                                : ((firstSemesterAverage + secondSemesterAverage) / 2) >= 7
                                    ? 'approved'
                                    : 'disapproved'
                        : ((element.presence / 200) * 100) < 90
                            ? 'disapproved'
                            : ((firstSemesterAverage + secondSemesterAverage) / 2) >= 7
                                ? 'approved'
                                : 'disapproved'
                }
            })

            const orderedData = treatedData.sort((Adata, Bdata) => {
                if (Adata.class < Bdata.class){
                    return -1;
                } else if ( Adata.class > Bdata.class){
                    return 1;
                } else {
                    if (Adata.year < Bdata.year){
                        return -1;
                    } else if ( Adata.year > Bdata.year){
                        return 1;
                    } else {
                        if (Adata.name < Bdata.name){
                            return -1;
                        } else if ( Adata.name > Bdata.name){
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            });

            const filteredData = state ? orderedData.filter(data => data.state === state) : orderedData;
            
            const elementsSliced: dataType[] =
                filteredData.slice(currentElements, currentElements + take);
    
            return JSON.stringify({
                currentPage,
                elements: elementsSliced,
                pageSize: take,
                totalElements,
                totalPages: Math.ceil(Number(totalElements) / take),
            });
        }
    );

    this.get(
        'api/students/data', 
        (_schema: fullDataType, request: Request) => {
            const { years, names, classes, state } = request.queryParams;
            const yearFilter: number[] = years 
                ? (years as string[]).map((year: string) => Number(year)) 
                : [new Date().getFullYear()];
            const nameFilter: string[] = names ? names as unknown as string[] : [];
            const classFilter: string[] = classes ? classes as unknown as string[] : [];

            const rawData: dataType[] = [];

            data.forEach(dataInfo => {
                if (yearFilter.includes(dataInfo.year)) {
                    if (classFilter.length !== 0) {
                        if (classFilter.includes(dataInfo.class)) {
                            if (nameFilter.length !== 0) {
                                if (nameFilter.includes(dataInfo.name)) {
                                    rawData.push(dataInfo)
                                }
                            } else {
                                rawData.push(dataInfo)
                            }
                        }
                    } else if (nameFilter.length !== 0) {
                        if (nameFilter.includes(dataInfo.name)) {
                            rawData.push(dataInfo)
                        }
                    } else {
                        rawData.push(dataInfo)
                    }
                }
            })

            const treatedData: fullDataType[] = rawData.map(element => {
                let count = 0;
                let sum = 0;
                let aux: number[] = [];

                count = Object.keys(element.firstSemester).length;

                aux = getSemesterGradesInArray(element.firstSemester);
                aux.forEach(grade => sum += Number(grade))

                const firstSemesterAverage = sum / count;

                count = Object.keys(element.secondSemester).length;

                sum = 0;

                aux = getSemesterGradesInArray(element.secondSemester);
                aux.forEach(grade => sum += Number(grade))

                const secondSemesterAverage = sum / count;

                return {
                    ...element,
                    firstSemester: {
                        ...element.firstSemester,
                        average: firstSemesterAverage
                    },
                    secondSemester: {
                        ...element.secondSemester,
                        average: secondSemesterAverage
                    },
                    presencePercentage: (element.presence / 200) * 100,
                    state: new Date().getFullYear() === element.year
                        ? getCanSomeoneBeAproved(1) < 200
                            ? 'open'
                            : ((element.presence / 200) * 100) < 90
                                ? 'disapproved'
                                : ((firstSemesterAverage + secondSemesterAverage) / 2) >= 7
                                    ? 'approved'
                                    : 'disapproved'
                        : ((element.presence / 200) * 100) < 90
                            ? 'disapproved'
                            : ((firstSemesterAverage + secondSemesterAverage) / 2) >= 7
                                ? 'approved'
                                : 'disapproved'
                }
            })

            const orderedData = treatedData.sort((Adata, Bdata) => {
                if (Adata.class < Bdata.class){
                    return -1;
                } else if ( Adata.class > Bdata.class){
                    return 1;
                } else {
                    if (Adata.year < Bdata.year){
                        return -1;
                    } else if ( Adata.year > Bdata.year){
                        return 1;
                    } else {
                        if (Adata.name < Bdata.name){
                            return -1;
                        } else if ( Adata.name > Bdata.name){
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            });

            const filteredData = state ? orderedData.filter(data => data.state === state) : orderedData;
            
            return JSON.stringify(filteredData);
        }
    );

    this.get(
        'api/students',
        (_schema: fullDataType, request: Request) => {
            const { years, classes } = request.queryParams;
            const yearFilter: number[] = years 
                ? (years as string[]).map((year: string) => Number(year)) 
                : [2024];
            const classFilter: string[] = classes ? classes as unknown as string[] : [];

            const rawData: string[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.name)) {
                    if (yearFilter.length !== 0) {
                        if (yearFilter.includes(dataInfo.year)) {
                            if (classFilter.length !== 0) {
                                if (classFilter.includes(dataInfo.class)) {
                                    rawData.push(dataInfo.name);
                                }
                            } else {
                                rawData.push(dataInfo.name);
                            }
                        }
                    } else if (classFilter.length !== 0) {
                        if (classFilter.includes(dataInfo.class)) {
                            rawData.push(dataInfo.name);
                        }
                    } else {
                        rawData.push(dataInfo.name);
                    }
                }
            })

            return rawData;
        }
    );

    this.get(
        'api/classes',
        (_schema: fullDataType, request: Request) => {
            const { years, names } = request.queryParams;
            const yearFilter: number[] = years 
                ? (years as string[]).map((year: string) => Number(year)) 
                : [];
            const namesFilter: string[] = names ? names as unknown as string[] : [];

            const rawData: string[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.class)) {
                    if (yearFilter.length !== 0) {
                        if (yearFilter.includes(dataInfo.year)) {
                            if (namesFilter.length !== 0) {
                                if (namesFilter.includes(dataInfo.name)) {
                                    rawData.push(dataInfo.class);
                                }
                            } else {
                                rawData.push(dataInfo.class);
                            }
                        }
                    } else if (namesFilter.length !== 0) {
                        if (namesFilter.includes(dataInfo.name)) {
                            rawData.push(dataInfo.class);
                        }
                    } else {
                        rawData.push(dataInfo.class);
                    }
                }
            })

            return rawData;
        },
        { timing: 1000 }
    );

    this.get(
        'api/years',
        () => {
            const rawData: number[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.year)) {
                    rawData.push(dataInfo.year);
                }
            })

            return rawData;
        }
    );
}

export { routes };
