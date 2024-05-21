import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app/app/app.component.html',
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
