import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor() {}

    // imposta un valore nello session storage
    setItem(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    // recupera un valore dallo session storage
    getItem(key: string): any {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Cancella un elemento
    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }

}
