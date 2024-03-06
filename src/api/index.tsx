import data, { dataType, fullDataType } from './rawData';
import { Request } from 'miragejs';

function getSemesterGradesInArray(obj: any) {
    return Object.keys(obj).map(k => obj[k]);
}

const routes = function(this: any) {
    this.passthrough("https://identitytoolkit.googleapis.com/**");

    this.get(
        'api/students/paginated', 
        (_schema: fullDataType, request: Request) => {
            const { years, size, start, names, classes } = request.queryParams;
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
    
            const elementsSliced: dataType[] =
                rawData.slice(currentElements - take < 0 ? 0 : currentElements - take, currentElements + totalElements);

            const treatedData: fullDataType[] = elementsSliced.map(element => {
                let count = 0;
                let sum = 0;
                let aux = [];

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
                    presencePercentage: (element.presence / 200) * 100
                }
            })
    
            return JSON.stringify({
                currentPage,
                elements: treatedData,
                pageSize: take,
                totalElements,
                totalPages: Math.ceil(Number(totalElements) / take),
            });
        }
    );

    this.get(
        'api/students',
        (_schema: fullDataType, request: Request) => {
            const { years, classNames } = request.queryParams;
            const yearFilter: number[] = years 
                ? (years as string[]).map((year: string) => Number(year)) 
                : [];
            const classFilter: string[] = classNames ? classNames as unknown as string[] : [];

            const rawData: string[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.name)) {
                    if (yearFilter.length !== 0 && yearFilter.includes(dataInfo.year)) {
                        if (classFilter && classFilter.includes(dataInfo.class) && !rawData.includes(dataInfo.name)) {
                            rawData.push(dataInfo.name);
                        } else {
                            rawData.push(dataInfo.name);
                        }
                    } else if (classFilter.length !== 0 && classFilter.includes(dataInfo.class) && !rawData.includes(dataInfo.name)) {
                        rawData.push(dataInfo.name);
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
            const yearFilter: number | undefined = years ? years as unknown as number : undefined;
            const namesFilter: string[] = names ? names as unknown as string[] : [];

            const rawData: string[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.class)) {
                    if (yearFilter && dataInfo.year === yearFilter) {
                        if (yearFilter && yearFilter === dataInfo.year) {
                            rawData.push(dataInfo.class);
                        } else {
                            rawData.push(dataInfo.class);
                        }
                    } else if (namesFilter.length !== 0 && namesFilter.includes(dataInfo.name)) {
                        rawData.push(dataInfo.class);
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

    this.get(
        'api/phones',
        (_schema: fullDataType, request: Request) => {
            const { year, classNames } = request.queryParams;
            const yearFilter: number | undefined = year ? year as unknown as number : undefined;
            const classFilter: string[] = classNames ? classNames as unknown as string[] : [];

            const rawData: string[] = [];

            data.forEach((dataInfo) => {
                if (!rawData.includes(dataInfo.name)) {
                    if (yearFilter && dataInfo.year === yearFilter) {
                        if (classFilter && classFilter.includes(dataInfo.class) && !rawData.includes(dataInfo.name)) {
                            rawData.push(dataInfo.name);
                        } else {
                            rawData.push(dataInfo.name);
                        }
                    } else if (classFilter && classFilter.includes(dataInfo.class) && !rawData.includes(dataInfo.name)) {
                        rawData.push(dataInfo.name);
                    } else {
                        rawData.push(dataInfo.name);
                    }
                }
            })

            return rawData;
        }
    );
}

export { routes };
