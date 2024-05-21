import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    standalone: true,
    selector: 'app-automation',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    imports: [FontAwesomeModule, NgFor, CommonModule],
})
export class HomepageComponent {
    constructor(
    ) {}
}