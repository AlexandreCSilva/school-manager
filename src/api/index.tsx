import React from "react";
import { Server, createServer } from "miragejs";
import data, { dataType } from "./rawData";

declare global {
  interface Window {
    server: Server;
  }
}

window.server = createServer({
  routes() {
    this.get(
        "/api/dashboard/paginated", 
        (_schema, request) => {
            const { year, size, start, name, className } = request.params;
            const yearFilter = Number(year) | new Date().getFullYear();
            const nameFilter: string[] = name as unknown as string[] | [];
            const classFilter: string[] = className as unknown as string[] | [];
            
            const take = size ? Number(size) : 10;
            const skip = start ? Number(start) : 0;
            const currentPage = skip;
            const currentElements = currentPage * take;

            const rawData: dataType[] = [];
            
            data.forEach(dataInfo => {
                if (dataInfo.year === yearFilter) {
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
                rawData.slice(currentElements - take, currentElements);

            return {
                currentPage,
                elements: elementsSliced,
                pageSize: take,
                totalElements,
                totalPages: Math.ceil(Number(totalElements) / take),
            };
        },
        { timing: 2000 }
    )
  },
})