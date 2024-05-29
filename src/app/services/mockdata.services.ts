import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDataService {
    constructor() {}

    private mockupDataPolizze: MockupDataPolizza[] = [
        { id: 1, numeroPolizza: '08-8279891', compagniaNome: 'UNIPOL-Sai', ramo: 'auto' },
        { id: 2, numeroPolizza: '726871872', compagniaNome: 'UNIPOL-Sai', ramo: 'health' },
        { id: 3, numeroPolizza: '7872991900', compagniaNome: 'Allianz', ramo: 'pets' },
    ];

    getPolizze(filter?: string): MockupDataPolizza[] {
        if (!filter) { return this.mockupDataPolizze; }
    
        return this.mockupDataPolizze.filter(item =>
            item.numeroPolizza.toLowerCase().includes(filter.toLowerCase())
        );
    }

}

export interface MockupDataPolizza {
    id: number;
    numeroPolizza: string;
    compagniaNome: string;
    ramo: string;
}


