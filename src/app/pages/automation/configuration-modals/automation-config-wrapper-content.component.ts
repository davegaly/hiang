import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutomationConfiguration } from '../automation-configuration.model';
import { CommonModule } from '@angular/common';

@Component({
    template: '',
    standalone:true,
    imports: [NgbModalModule, CommonModule]
})
export abstract class AutomationConfigWrapperContentComponent<TConfiguration extends AutomationConfiguration> {

    // tipo di automazione corrente
    public automationKey: string = '';

    private _configuration: TConfiguration;
    /**
     * Configurazione da caricare nell'interfaccia
     */
    set configuration(value: TConfiguration) {
        this._configuration = value;
        this.onConfigurationSet();
    }
    /**
     * Configurazione da caricare nell'interfaccia
     */
    get configuration(): TConfiguration {
        return this._configuration;
    }
    /**
     * Modale corrente
     */
    abstract activeModal: NgbActiveModal;

    constructor() {
        this._configuration = <TConfiguration>{};
    }

    @Output() showParentModalFooter = new EventEmitter<any>();
    @Output() hideParentModalFooter = new EventEmitter<any>();

    /**
     * Evento scatenato dopo aver assegnato la configurazione
     */
    abstract onConfigurationSet(): void;

    /**
     * Indica se la modale può essere chiusa al salvataggio
     * @returns
     */
    abstract canSave(): boolean;

    /**
     * Evento per sincronizzare l'oggetto configurazione prima del salvataggio
     */
    abstract onSyncConfiguration(): void;

    /**
     * Evento per mostrare il footer nella modale parent
     */
    showParentModalFooterOutput() {
        console.log("enabe")
        this.showParentModalFooter.emit();
    };

    /**
     * Evento per nascondere il footer nella modale parent
     */
    hideParentModalFooterOutput() {
        console.log("falseeee")
        this.hideParentModalFooter.emit();
    };

    /**
     * Indica se la modale può essere chiusa all'annullamento
     * @returns
     */
    canDismiss() {
        return true;
    }
}
