import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private route: ActivatedRoute,
        private router: Router
    ) {}

}
