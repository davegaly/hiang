import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    standalone: true,
    selector: 'app-automation',
    templateUrl: './polizze.component.html',
    styleUrls: ['./polizze.component.scss'],
    imports: [FontAwesomeModule, NgFor, CommonModule],
})
export class PolizzeComponent {
    constructor(
    ) {}
}
