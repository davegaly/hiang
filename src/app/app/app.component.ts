import { Component, ViewEncapsulation } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import './app.component.cs1s'
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

}
