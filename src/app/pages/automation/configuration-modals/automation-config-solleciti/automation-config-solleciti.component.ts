import { AutomationConfigWrapperComponent } from '../automation-config-wrapper/automation-config-wrapper.component';
import { Component, Input, inject, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AutomationConfigWrapperContentComponent } from '../automation-config-wrapper-content.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutomationApiService } from 'src/app/core/services/automation.services';
import { Select2Data, Select2Module, Select2Option } from 'ng-select2-component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import '../../../../core/extensions/array.extensions'
import { AutomationConfigurationSolleciti, AutomationConfigurationSollecitiSingolo } from './automation-configuration-solleciti.model';

@Component({
  standalone: true,
  selector: 'app-automation-config-solleciti-sicomunica',
  templateUrl: './automation-config-solleciti.component.html',
  styleUrl: './automation-config-solleciti.component.scss',
  imports: [ReactiveFormsModule, NgbModalModule, AutomationConfigWrapperComponent, CommonModule, Select2Module, FontAwesomeModule]})
export class AutomationConfigSollecitiComponent extends AutomationConfigWrapperContentComponent<AutomationConfigurationSolleciti> {
    constructor(public activeModal: NgbActiveModal, protected automationApiService: AutomationApiService,){
        super();
    }

    // liste dati caricati all'avvio
    listaModalitaInvio: any[] | undefined;
    listaModelliInvioEmail: any[] | undefined;
    listaModelliInvioSMS: any[] | undefined;

    listaValoriSiNo: Select2Option[] = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' }
    ];

    // configurazione singola selezionata nella tabella
    configurazioneSingolaCurrent: AutomationConfigurationSollecitiSingolo | null = null;

    // form per ogni configurazione singola
    form = new FormGroup({
        isAttivo: new FormControl<string>('No'),
        giorniPostScadenza: new FormControl<number>(0),
        modalitaInvio: new FormControl<string>(''),
        modelloEmail: new FormControl<number>(0),
        modellSMS: new FormControl<number>(0),
        isReportAgenzia: new FormControl<string>('No'),
        destinatariReportAgenzia: new FormControl<string>(''),
        isReportCollaboratore: new FormControl<string>('No')
    });

    giorniPostScadenzaShowValidationRequired: boolean = false;
    modelloEmailShowValidationRequired: boolean = false;
    modellSMSShowValidationRequired: boolean = false;
    destinatariReportAgenziaShowValidationRequired: boolean = false;

    override onConfigurationSet(): void {

        // carica i dati necessari (liste per dropdownlist etc...).
        this.automationApiService.getModalitaInvio().then((data) => { this.listaModalitaInvio = data; });
        this.automationApiService.getModelliInvio("email").then((data) => { this.listaModelliInvioEmail = data; });
        this.automationApiService.getModelliInvio("sms").then((data) => { this.listaModelliInvioSMS = data; });

        if (this.configuration.listaConfigurazioniSolleciti == undefined) {
            // preparazione struttura disattivata, ad esempio quando è stata appena attivata. Gli step devono sempre esserci
            const step1:  AutomationConfigurationSollecitiSingolo = { key : "sollecito1", keyDisplayText: "1° Sollecito", numeroGiorniPostScadenza:10, isAttivo:false, isReportAgenzia:false, isReportCollaboratore:false, modalitaInvio:'', modelloEmail:0, modellSMS:0, destinatariReportAgenzia:'' };
            const step2:  AutomationConfigurationSollecitiSingolo = { key : "sollecito2", keyDisplayText: "2° Sollecito", numeroGiorniPostScadenza:14, isAttivo:false, isReportAgenzia:false, isReportCollaboratore:false, modalitaInvio:'', modelloEmail:0, modellSMS:0, destinatariReportAgenzia:'' };
            const step3:  AutomationConfigurationSollecitiSingolo = { key : "sollecito3", keyDisplayText: "3° Sollecito", numeroGiorniPostScadenza:30, isAttivo:false, isReportAgenzia:false, isReportCollaboratore:false, modalitaInvio:'', modelloEmail:0, modellSMS:0, destinatariReportAgenzia:'' };
            const step4:  AutomationConfigurationSollecitiSingolo = { key : "sollecito4", keyDisplayText: "4° Sollecito", numeroGiorniPostScadenza:60, isAttivo:false, isReportAgenzia:false, isReportCollaboratore:false, modalitaInvio:'', modelloEmail:0, modellSMS:0, destinatariReportAgenzia:'' };
            let configurazioneVuota: AutomationConfigurationSolleciti = { listaConfigurazioniSolleciti: []};
            configurazioneVuota.listaConfigurazioniSolleciti.push(step1);
            configurazioneVuota.listaConfigurazioniSolleciti.push(step2);
            configurazioneVuota.listaConfigurazioniSolleciti.push(step3);
            configurazioneVuota.listaConfigurazioniSolleciti.push(step4);
            this.configuration = configurazioneVuota;
        }

    }

    modalitaInvioOnChange(eventArgs:any) {
        this.form.controls.modelloEmail.enable();
        this.form.controls.modellSMS.enable();
        if (eventArgs == "") {
            this.form.controls.modelloEmail.disable();
            this.form.controls.modellSMS.disable();
        } else if (eventArgs == "Mail" || eventArgs == "Carta" || eventArgs == "MailCarta") {
            this.form.controls.modellSMS.disable();
        } else if (eventArgs == "SMS") {
            this.form.controls.modelloEmail.disable();
        }
    }

    isReportAgenziaOnChange(eventArgs:any) {
        if (eventArgs == "Si") {
            this.form.controls.destinatariReportAgenzia.enable();
        } else {
            this.form.controls.destinatariReportAgenzia.disable();
        }
    }

    override onSyncConfiguration(): void {
        // preparazione per salvataggio configurazione (se necessario)?
        // this.configuration.frequenzaPreparazioneAvvisi = this.form.controls.frequenzaPreparazioneAvvisi.value;
    }

    override canSave(): boolean {
        return true;
    }

    // evento on click sulla configurazione singola
    onEditClickTabellaConfigurazioneSingola(configurazioneSingolaItem: AutomationConfigurationSollecitiSingolo) {
        // seleziona questa configurazione come corrente, questo farà visualizzare la finestra di edit
        this.configurazioneSingolaCurrent = configurazioneSingolaItem

        // associa i valori dei controlli del form per questa configurazione esistente
        this.clearForm();

        if (this.configurazioneSingolaCurrent.isAttivo) { this.form.controls.isAttivo.setValue('Si'); } else { this.form.controls.isAttivo.setValue('No'); }
        this.form.controls.giorniPostScadenza.setValue(this.configurazioneSingolaCurrent.numeroGiorniPostScadenza);
        this.form.controls.modalitaInvio.setValue(this.configurazioneSingolaCurrent.modalitaInvio);
        this.form.controls.modelloEmail.setValue(this.configurazioneSingolaCurrent.modelloEmail);
        this.form.controls.modellSMS.setValue(this.configurazioneSingolaCurrent.modellSMS);
        if (this.configurazioneSingolaCurrent.isReportAgenzia) { this.form.controls.isReportAgenzia.setValue('Si'); } else { this.form.controls.isReportAgenzia.setValue('No'); }
        this.form.controls.destinatariReportAgenzia.setValue(this.configurazioneSingolaCurrent.destinatariReportAgenzia);
        if (this.configurazioneSingolaCurrent.isReportCollaboratore) { this.form.controls.isReportCollaboratore.setValue('Si'); } else { this.form.controls.isReportCollaboratore.setValue('No'); }

        this.hideParentModalFooterOutput();
    }

    // pulisce i valori esistenti del form
    clearForm() {
    }

    // salva la singola configurazione e torna alla lista
    onSaveClickFormConfigurazioneSingola() {

        if (this.validaForm() == false) { return; }

        // modifica i dati della configurazione corrente
        if (this.configurazioneSingolaCurrent != null) {
            if (this.form.controls.isAttivo.value == "Si") {this.configurazioneSingolaCurrent.isAttivo = true;} else {this.configurazioneSingolaCurrent.isAttivo = false;}
            this.configurazioneSingolaCurrent.numeroGiorniPostScadenza = this.form.controls.giorniPostScadenza.value;
            this.configurazioneSingolaCurrent.modalitaInvio = this.form.controls.modalitaInvio.value;
            this.configurazioneSingolaCurrent.modelloEmail = this.form.controls.modelloEmail.value;
            this.configurazioneSingolaCurrent.modellSMS = this.form.controls.modellSMS.value;
            if (this.form.controls.isReportAgenzia.value == "Si") {this.configurazioneSingolaCurrent.isReportAgenzia = true;} else {this.configurazioneSingolaCurrent.isReportAgenzia = false;}
            this.configurazioneSingolaCurrent.destinatariReportAgenzia =  this.form.controls.destinatariReportAgenzia.value;
            if (this.form.controls.isReportCollaboratore.value == "Si") {this.configurazioneSingolaCurrent.isReportCollaboratore = true;} else {this.configurazioneSingolaCurrent.isReportCollaboratore = false;}
        }

        const index = this.configuration.listaConfigurazioniSolleciti.findIndex(configurazioneSingola => configurazioneSingola.key === this.configurazioneSingolaCurrent?.key);
        this.configuration.listaConfigurazioniSolleciti[index] = this.configurazioneSingolaCurrent!;

        // torna alla lista
        this.onCancelClickFormConfigurazioneSingola();
        this.showParentModalFooterOutput();
    }

    // valida il form prima del salvataggio
    validaForm(): boolean {
        let validationResult: boolean = true;
        this.giorniPostScadenzaShowValidationRequired = false;
        this.modelloEmailShowValidationRequired = false;
        this.modellSMSShowValidationRequired = false;
        this.destinatariReportAgenziaShowValidationRequired = false;
        if (this.form.controls.giorniPostScadenza.value == null || this.form.controls.giorniPostScadenza.value < 1) {
            this.giorniPostScadenzaShowValidationRequired = true;
            validationResult = false;
        }
        if (this.form.controls.modelloEmail.enabled && (this.form.controls.modelloEmail.value == null || this.form.controls.modelloEmail.value < 1)) {
            this.modelloEmailShowValidationRequired = true;
            validationResult = false;
        }
        if (this.form.controls.modellSMS.enabled && (this.form.controls.modellSMS.value == null|| this.form.controls.modellSMS.value < 1)) {
            this.modellSMSShowValidationRequired = true;
            validationResult = false;
        }
        if (this.form.controls.destinatariReportAgenzia.enabled && (this.form.controls.destinatariReportAgenzia.value == ''|| this.form.controls.destinatariReportAgenzia.value == undefined)) {
            this.destinatariReportAgenziaShowValidationRequired = true;
            validationResult = false;
        }
        return validationResult;
    }

    // annulla la singola pianificazione e torna alla lista
    onCancelClickFormConfigurazioneSingola() {
        this.configurazioneSingolaCurrent = null;
        this.clearForm();
        this.showParentModalFooterOutput();
    }

    ngAfterViewInit() {

    }


}
