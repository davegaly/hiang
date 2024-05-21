import { AutomationConfigWrapperComponent } from '../automation-config-wrapper/automation-config-wrapper.component';
import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AutomationConfigWrapperContentComponent } from '../automation-config-wrapper-content.component';
import { AutomationConfigurationCreazioneFlussiAvvisiSiComunica, AutomationConfigurationCreazioneFlussiAvvisiSiComunicaFrequenza, AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola } from './automation-configuration-creazione-flussi-avvisi-sicomunica.model';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutomationApiService } from 'src/app/core/services/automation.services';
import { AutomazioneResponseDTO } from '../../automation-response.model';
import { Select2Data, Select2Module, Select2Option } from 'ng-select2-component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import '../../../../core/extensions/array.extensions'

@Component({
  standalone: true,
  selector: 'app-automation-config-creazione-flussi-avvisi-sicomunica',
  templateUrl: './automation-config-creazione-flussi-avvisi-sicomunica.component.html',
  styleUrl: './automation-config-creazione-flussi-avvisi-sicomunica.component.scss',
  imports: [ReactiveFormsModule, NgbModalModule, AutomationConfigWrapperComponent, CommonModule, Select2Module, FontAwesomeModule]})
export class AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent extends AutomationConfigWrapperContentComponent<AutomationConfigurationCreazioneFlussiAvvisiSiComunica> {
    constructor(public activeModal: NgbActiveModal, protected automationApiService: AutomationApiService,){
        super();
    }

    // liste dati caricati all'avvio
    listaProduttori: any[] | undefined;
    listaCompagnie: any[] | undefined;
    listaTipiDocumento: any[] | undefined;
    listaFrazionamenti: any[] | undefined;

    // valori per comboboxes
    listaValoriFrequenza: Select2Option[] = [
        { value: 'primo', label: 'Al primo giorno del mese' },
        { value: 'primoquindici', label: 'Al primo e quindicesimo giorno del mese' },
        { value: 'quindici', label: 'Al quindicesimo giorno del mese' }
    ];
    listaValoriElaboraSeElaborato: Select2Option[] = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' }
    ];
    listaValoriCapogruppoDestinatario: Select2Option[] = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' }
    ];
    listaValoriScadenzeAuto: Select2Option[] = [
        { value: 'NoRID', label: 'Si, esclusi RID' },
        { value: 'EscludiAnnuali', label: 'Si, escluse annualità quietanze' },
        { value: 'Si', label: 'Si' },
        { value: 'AnnualiRID', label: 'Si, annualità RID' },
        { value: 'No', label: 'No' }
    ];
    listaValoriScadenzeRE: Select2Option[] = [
        { value: 'NoRID', label: 'Si, esclusi RID' },
        { value: 'Si', label: 'Si' },
        { value: 'AnnualiRID', label: 'Si, annualità RID' },
        { value: 'No', label: 'No' }
    ];
    listaValoriScadenzeVita: Select2Option[] = [
        { value: 'NoRID', label: 'Si, esclusi RID' },
        { value: 'Si', label: 'Si' },
        { value: 'AnnualiRID', label: 'Si, annualità RID' },
        { value: 'No', label: 'No' }
    ];

    // configurazione singola selezionata nella tabella
    configurazioneSingolaCurrent: AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola | null = null;
    configurazioneSingolaGuid: string = '';

    // form per ogni configurazione singola
    form = new FormGroup({
        titoloPianificazione: new FormControl(''),
        frequenzaPreparazioneAvvisi: new FormControl(''),
        elaboraSeElaborato: new FormControl(''),
        destinatarioCapogruppo: new FormControl(''),
        compagnie: new FormControl<number[]>([]),
        produttori: new FormControl<number[]>([]),
        frazionamenti: new FormControl<number[]>([]),
        tipiDocumenti: new FormControl<number[]>([]),
        scadenzeAuto: new FormControl(''),
        scadenzeRe: new FormControl(''),
        scadenzeVita: new FormControl(''),
    });
    titoloPianificazioneShowValidationRequired: boolean = false;
    frequenzaPreparazioneAvvisiShowValidationRequired: boolean = false;

    override onConfigurationSet(): void {
        // carica i dati necessari (liste per dropdownlist etc...).
        // posizionato qui per non eseguirla ad ogni avvio pagina, dove magari non è necessario
        this.automationApiService.getProduttori().then((data) => { this.listaProduttori = data; });
        this.automationApiService.getCompagnie().then((data) => { this.listaCompagnie = data; });
        this.automationApiService.getTipiDocumento().then((data) => { this.listaTipiDocumento = data; });
        this.automationApiService.getTipiFrazionamento().then((data) => { this.listaFrazionamenti = data; });

        // assicurarsi che la lista sia sempre valorizzata (è null alla prima configurazione per questa agenzia)
        if (this.configuration.listaConfigurazioniSingole == null) {
            this.configuration.listaConfigurazioniSingole = [];
        }
    }

    override onSyncConfiguration(): void {
        // preparazione per salvataggio configurazione (se necessario)?
        // this.configuration.frequenzaPreparazioneAvvisi = this.form.controls.frequenzaPreparazioneAvvisi.value;
    }

    override canSave(): boolean {
        return true;
    }

    // passa alla maschera di creazione di una configurazione per produttore
    onAddClickTabellaConfigurazioneSingola() {
        // seleziona questa configurazione come corrente, questo farà visualizzare la finestra di edit
        const newGuid = uuidv4();
        const configurazioneSingolaEmpty: AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola = {
            guid: newGuid,
            titoloConfigurazione: "",
            frequenzaPreparazioneAvvisi: "",
            listaCompagnieId: [],
            listaProduttoriId: [],
            listaTipiDocumentoId: [],
            listaFrazionamentiId: [],
            elaboraSeElaborato: "Si",
            destinatarioCapogruppo: "Si",
            scadenzeAuto: "Si",
            scadenzeRe: "Si",
            scadenzeVita: "Si"
        };
        this.configurazioneSingolaCurrent = configurazioneSingolaEmpty;
        this.clearForm();
        this.hideParentModalFooterOutput();
    }

    // evento on click sulla configurazione singola
    onEditClickTabellaConfigurazioneSingola(configurazioneSingolaItem: AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola) {
        // seleziona questa configurazione come corrente, questo farà visualizzare la finestra di edit
        this.configurazioneSingolaCurrent = configurazioneSingolaItem
        this.configurazioneSingolaGuid = configurazioneSingolaItem.guid!;

        // associa i valori dei controlli del form per questa configurazione esistente
        this.clearForm();
        this.form.controls.titoloPianificazione.setValue(this.configurazioneSingolaCurrent.titoloConfigurazione);
        this.form.controls.frequenzaPreparazioneAvvisi.setValue(this.configurazioneSingolaCurrent.frequenzaPreparazioneAvvisi);
        this.form.controls.compagnie.setValue(this.configurazioneSingolaCurrent.listaCompagnieId);
        this.form.controls.produttori.setValue(this.configurazioneSingolaCurrent.listaProduttoriId);
        this.form.controls.tipiDocumenti.setValue(this.configurazioneSingolaCurrent.listaTipiDocumentoId);
        this.form.controls.frazionamenti.setValue(this.configurazioneSingolaCurrent.listaFrazionamentiId);
        this.form.controls.elaboraSeElaborato.setValue(this.configurazioneSingolaCurrent.elaboraSeElaborato);
        this.form.controls.destinatarioCapogruppo.setValue(this.configurazioneSingolaCurrent.destinatarioCapogruppo);
        this.form.controls.scadenzeAuto.setValue(this.configurazioneSingolaCurrent.scadenzeAuto);
        this.form.controls.scadenzeRe.setValue(this.configurazioneSingolaCurrent.scadenzeRe);
        this.form.controls.scadenzeVita.setValue(this.configurazioneSingolaCurrent.scadenzeVita);

        this.hideParentModalFooterOutput();
    }

    // annulla la singola pianificazione e torna alla lista
    onCancelClickFormConfigurazioneSingola() {
        this.configurazioneSingolaCurrent = null;
        this.configurazioneSingolaGuid = '';
        this.clearForm();
        this.showParentModalFooterOutput();
    }

    onDeleteClickFormConfigurazioneSingola() {
        if (confirm('Eliminare la singola Pianificazione?')) {
            this.configuration.listaConfigurazioniSingole = this.configuration.listaConfigurazioniSingole.filter(configurazioneSingola => configurazioneSingola.guid !== this.configurazioneSingolaGuid);
            this.configurazioneSingolaCurrent = null;
            this.configurazioneSingolaGuid = '';
            this.clearForm();
            this.showParentModalFooterOutput();
        }
    }

    // salva la singola pianificazione e torna alla lista
    onSaveClickFormConfigurazioneSingola() {

        if (this.validaForm() == false) { return; }

        // modifica i dati della configurazione corrente
        if (this.configurazioneSingolaCurrent != null) {
            this.configurazioneSingolaCurrent.titoloConfigurazione = this.form.controls.titoloPianificazione.value;
            this.configurazioneSingolaCurrent.frequenzaPreparazioneAvvisi = this.form.controls.frequenzaPreparazioneAvvisi.value;
            this.configurazioneSingolaCurrent.listaCompagnieId = this.form.controls.compagnie.value as unknown as number[];
            this.configurazioneSingolaCurrent.listaProduttoriId = this.form.controls.produttori.value as unknown as number[];
            this.configurazioneSingolaCurrent.listaTipiDocumentoId = this.form.controls.tipiDocumenti.value as unknown as number[];
            this.configurazioneSingolaCurrent.listaFrazionamentiId = this.form.controls.frazionamenti.value as unknown as number[];
            this.configurazioneSingolaCurrent.elaboraSeElaborato =  this.form.controls.elaboraSeElaborato.value;
            this.configurazioneSingolaCurrent.destinatarioCapogruppo = this.form.controls.destinatarioCapogruppo.value;
            this.configurazioneSingolaCurrent.scadenzeAuto = this.form.controls.scadenzeAuto.value;
            this.configurazioneSingolaCurrent.scadenzeRe = this.form.controls.scadenzeRe.value;
            this.configurazioneSingolaCurrent.scadenzeVita = this.form.controls.scadenzeVita.value;
        }

        // aggiorna o aggiunge il nostro oggetto con la lista delle pianificazioni locale
        if (this.configurazioneSingolaGuid != '') {
            const index = this.configuration.listaConfigurazioniSingole.findIndex(configurazioneSingola => configurazioneSingola.guid === this.configurazioneSingolaGuid);
            this.configuration.listaConfigurazioniSingole[index] = this.configurazioneSingolaCurrent!;
        }
        else
        {
            this.configuration.listaConfigurazioniSingole.push(this.configurazioneSingolaCurrent!);
        }

        // torna alla lista
        this.onCancelClickFormConfigurazioneSingola();
        this.showParentModalFooterOutput();
    }

    // pulisce i valori esistenti del form
    clearForm() {
        this.form.controls.titoloPianificazione.setValue('');
        this.form.controls.frequenzaPreparazioneAvvisi.setValue('');
        this.form.controls.compagnie.setValue([]);
        this.form.controls.produttori.setValue([]);
        this.form.controls.frazionamenti.setValue([]);
        this.form.controls.tipiDocumenti.setValue([]);
        this.titoloPianificazioneShowValidationRequired = false;
        this.frequenzaPreparazioneAvvisiShowValidationRequired = false;

        // defaults
        this.form.controls.elaboraSeElaborato.setValue("Si");
        this.form.controls.destinatarioCapogruppo.setValue("Si");
        this.form.controls.scadenzeAuto.setValue("Si");
        this.form.controls.scadenzeRe.setValue("Si");
        this.form.controls.scadenzeVita.setValue("Si");
    }

    // valida il form prima del salvataggio
    validaForm(): boolean {
        console.log(this.form.controls.frequenzaPreparazioneAvvisi.value);
        let validationResult: boolean = true;
        this.titoloPianificazioneShowValidationRequired = false;
        this.frequenzaPreparazioneAvvisiShowValidationRequired = false;
        if (this.form.controls.titoloPianificazione.value == '' || this.form.controls.titoloPianificazione.value == undefined) {
            this.titoloPianificazioneShowValidationRequired = true;
            validationResult = false;
        }
        if (this.form.controls.frequenzaPreparazioneAvvisi.value == ''|| this.form.controls.frequenzaPreparazioneAvvisi.value == undefined) {
            this.frequenzaPreparazioneAvvisiShowValidationRequired = true;
            validationResult = false;
        }
        return validationResult;
    }

    // ritorna una descrizione da un array (usata per il campo frequenza)
    ritornaDescrizioneFrequenza(id: string): string | undefined {
        const item = this.listaValoriFrequenza.find(item => item.value === id);
        return item ? item.label : undefined;
    }

}
