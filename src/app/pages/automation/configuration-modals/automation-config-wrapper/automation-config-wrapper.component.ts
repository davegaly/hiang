import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutomationConfigWrapperContentComponent } from '../automation-config-wrapper-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, registerLocaleData  } from '@angular/common';
import { AutomazioneLogResponseDTO } from '../../automation-log-response.model';
import { AutomationApiService } from 'src/app/core/services/automation.services';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.services';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

@Component({
  selector: 'app-automation-config-wrapper',
  standalone: true,
  imports: [NgbModalModule,FontAwesomeModule,CommonModule],
  templateUrl: './automation-config-wrapper.component.html',
  styleUrl: './automation-config-wrapper.component.scss',
  providers: [DatePipe]
})
export class AutomationConfigWrapperComponent {
    constructor(
        protected automationApiService: AutomationApiService,
        public datePipe: DatePipe
    ) {}
    @Input() parentComponent!: AutomationConfigWrapperContentComponent<any>;

    /**
     * contiene gli elementi del log per questa automazione/agenzia/azienda. Caricata al click del tab "Log"
     */
    listLogEntries: AutomazioneLogResponseDTO[] = [];
    logData: string = '';

    /**
    * panel da visualizzare nella modale delle automazioni (edit)
    */
    currentSelectedTab: string = 'configure';

    /**
     * indica se visualizzare il footer con i pulsanti (da nascondere se sto modificando un elemento interno di una automazione)
     */
    showModalFooter: boolean = true;

    /**
    * cambia il panel della modale di edit in funzione del tab menu cliccato
    */
    switchPanels(panelKey: string) {
        this.currentSelectedTab = panelKey;

        if (this.currentSelectedTab == "log") {
            this.loadLogEntries();
        }
    }

    onSave() {
        if (this.parentComponent.canSave()) {
            this.parentComponent.onSyncConfiguration();
            this.parentComponent.activeModal.close(this.parentComponent.configuration);
        }
    }

    // evento al click per la rimozione dell'automazione correntemente visualizzata nella modale
    onRemoveAutomation() {
        this.parentComponent.activeModal.close("removeAutomation");
    }

    onDismiss() {
        this.parentComponent.activeModal.dismiss();
    }

    ngOnInit() {

        // evento componente figlio per abilitare o disabilitare i pulsanti di salvataggio della modale principale
        this.parentComponent.showParentModalFooter.subscribe((data) => {
            this.showModalFooter = true;
        });
        this.parentComponent.hideParentModalFooter.subscribe((data) => {
            this.showModalFooter = false;
        });

    }

    // recupera gli elementi di log per questa automazione per questa azienda/agenzia
    loadLogEntries() {
        // richiama l'api server
        this.automationApiService.getAutomationLogs(this.parentComponent.automationKey).then((data) => {
            // salva il risultato in una variabile locale
            this.listLogEntries = data;
        });
    }

    // rendering del badge colorato per lo status della riga del log
    renderLogStatusBadgeClass(statusKey: string) {
        let result = '';
        if (statusKey == "ok") { result = "badge bg-success"; }
        if (statusKey == "error") { result = "badge bg-danger"; }
        if (statusKey == "running") { result = "badge bg-primary"; }
        return result;
    }

    // evento al click
    onLogEntryClick(logId:number) {
        // richiama l'api server
        this.automationApiService.getAutomationLogFile(this.parentComponent.automationKey, logId).then((data) => {
            // salva il risultato in una variabile locale
            this.saveToFile(data.logData);
        });
    }

    // funzione per forzare un download
    saveToFile(data: string) {
        const anchor = document.createElement('a');
        anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
        anchor.download = 'log.txt';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

    // formatta una data
    formatDate(date: Date): string | null {
        const datePipe = new DatePipe('it-IT');
        return datePipe.transform(date, 'dd/MM/yy HH:mm:ss');
    }

}
