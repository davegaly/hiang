import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
    title = 'sintesi-frontend';

    constructor(faIconLibrary: FaIconLibrary) {
        //includo i pacchetti di icone fontawesome
        faIconLibrary.addIconPacks(fas);
        faIconLibrary.addIconPacks(far);
        faIconLibrary.addIconPacks(fab);
    }
}
