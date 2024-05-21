import { AutomationConfigWrapperComponent } from '../automation-config-wrapper/automation-config-wrapper.component';
import { Component, Input, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AutomationConfigWrapperContentComponent } from '../automation-config-wrapper-content.component';
import { AutomationConfigurationAlertScadenzaPolizza } from './automation-configuration-alert-scadenza-polizza.model';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-automation-config-alert-scadenza-polizza',
  templateUrl: './automation-config-alert-scadenza-polizza.component.html',
  styleUrl: './automation-config-alert-scadenza-polizza.component.scss',
  imports: [ReactiveFormsModule, NgbModalModule, AutomationConfigWrapperComponent]})
export class AutomationConfigAlertScadenzaPolizzaComponent extends AutomationConfigWrapperContentComponent<AutomationConfigurationAlertScadenzaPolizza> {
    constructor(public activeModal: NgbActiveModal){
        super();
    }

    form = new FormGroup({
        campoProva1: new FormControl('', Validators.required),
        campoProva2: new FormControl('', Validators.required),
    });

    // Method to return form values


    override onConfigurationSet(): void {
        console.log("configuration set", this.configuration);
    }

    override onSyncConfiguration(): void {
        this.configuration.pippopluto = 'paperino';
    }

    override canSave(): boolean {
        return true;
    }


}
