import { Component } from '@angular/core';
import { AutomationConfigurationAuguriCompleanno } from './automation-configuration-auguri-compleanno.modal';
import { AutomationConfigWrapperContentComponent } from '../automation-config-wrapper-content.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutomationConfigWrapperComponent } from '../automation-config-wrapper/automation-config-wrapper.component';

@Component({
  standalone: true,
  selector: 'app-automation-config-auguri-compleanno',
  templateUrl: './automation-config-auguri-compleanno.component.html',
  styleUrl: './automation-config-auguri-compleanno.component.scss',
  imports: [AutomationConfigWrapperComponent]
})
export class AutomationConfigAuguriCompleannoComponent extends AutomationConfigWrapperContentComponent<AutomationConfigurationAuguriCompleanno> {
    constructor(public activeModal: NgbActiveModal){
        super();
    }

    override onConfigurationSet(): void {
    }

    override onSyncConfiguration(): void {
    }

    override canSave(): boolean {
        return true;
    }


}
