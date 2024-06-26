import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
})
export class AppComponent {
    title = 'hiang';

    constructor(faIconLibrary: FaIconLibrary) {
        faIconLibrary.addIconPacks(fas);
        faIconLibrary.addIconPacks(far);
        faIconLibrary.addIconPacks(fab);
    }
}
