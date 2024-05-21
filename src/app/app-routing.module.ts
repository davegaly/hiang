import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomationComponent } from './pages/automation/automation.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'automation' },
    { path: 'automation', component: AutomationComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
