import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockDataService, MockupDataPolizza } from 'src/app/services/mockdata.services';

@Component({
    standalone: true,
    selector: 'app-automation',
    templateUrl: './polizze.component.html',
    styleUrls: ['./polizze.component.scss'],
    imports: [FontAwesomeModule, NgFor, CommonModule],
})
export class PolizzeComponent {
    constructor(
        protected mockDataService: MockDataService
    ) {}

    listPolizze: MockupDataPolizza[] | null = null;

    async ngOnInit(): Promise<void> {
        console.log("inited");
        this.listPolizze = this.mockDataService.getPolizze();
    }

    returnRamoIcon(ramo: string) {
        if (ramo == 'auto') { return 'insurance-car.png'; }
        if (ramo == 'health') { return 'insurance-health.png'; }
        if (ramo == 'pets') { return 'insurance-pets.png'; }
        return '';
    }

}
