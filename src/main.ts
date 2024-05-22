/// <reference types="@angular/localize" />
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { HomepageComponent } from './app/pages/homepage/homepage.component';
import { PolizzeComponent } from './app/pages/polizze/polizze.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomepageComponent },
    { path: 'polizze', component: PolizzeComponent },
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, NgbModule, FontAwesomeModule, CommonModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
.catch(err => console.error(err));
