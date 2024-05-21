import { LocalStorageService } from './../../core/services/localStorage.services';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { CommonModule, registerLocaleData } from '@angular/common';
import {
    AfterViewInit,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutomazioneResponseDTO } from './automation-response.model';
import { AutomationApiService } from './../../core/services/automation.services';
import { AutomationConfigAlertScadenzaPolizzaComponent } from './configuration-modals/automation-config-alert-scadenza-polizza/automation-config-alert-scadenza-polizza.component';
import { AutomationConfigAuguriCompleannoComponent } from './configuration-modals/automation-config-auguri-compleanno/automation-config-auguri-compleanno.component';
import { AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent } from './configuration-modals/automation-config-creazione-flussi-avvisi-sicomunica/automation-config-creazione-flussi-avvisi-sicomunica.component';
import { AuthService } from 'src/app/core/services/auth.services';
import { AutomationConfigSollecitiComponent } from './configuration-modals/automation-config-solleciti/automation-config-solleciti.component';

@Component({
    standalone: true,
    selector: 'app-automation',
    templateUrl: './automation.component.html',
    styleUrls: ['./automation.component.scss'],
    imports: [
        FontAwesomeModule,
        NgFor,
        CommonModule,
    ],
})
export class AutomationComponent implements OnInit, AfterViewInit {
    constructor(
        protected automationApiService: AutomationApiService,
        protected authService: AuthService,
        protected localStorageService: LocalStorageService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private router: Router
    ) {}



    /**
    * lista automazioni, recuperata all'avvio della pagina e ad ogni aggiunta e disattivazione automazione
    */
    listaAutomazioni: AutomazioneResponseDTO[] = [];

    // riferimento alla modale per aggiunta automazioni
    @ViewChild('templateModalAddAutomation') templateModalAddAutomation: TemplateRef<any> | undefined;
    modalAddAutomationRef: NgbModalRef | undefined;

    /**
    * automazione key attiva nella modale edit configurazione, impostata al click su una card di una automazione nella lista delle attive
    */
    activeAutomationKey: string = '';

    /**
     * Set chiave-valore con l'abbinamento tra gli id automazione e i componenti di configurazione
     */
    configModals = {
        auguri_compleanno: AutomationConfigAuguriCompleannoComponent,
        alert_scadenza_polizza: AutomationConfigAlertScadenzaPolizzaComponent,
        creazione_flussi_avvisi_sicomunica: AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent,
        solleciti: AutomationConfigSollecitiComponent
    } as { [key: string]: any };

    async ngOnInit(): Promise<void> {
        // se c'è il param in querystring, proviamo con l'auth token presente in query string
        const querystringAuthToken = this.route.snapshot.queryParams['a'];
        if (querystringAuthToken != null && querystringAuthToken != undefined) {
            // prova a convertirlo in access token, richiamando il server
            await this.loadAccessToken(querystringAuthToken);
        }
        // al caricamento della pagina carica la lista delle automazioni
        this.caricaListaAutomazioniDaServer();
    }

    ngAfterViewInit(): void {}

    // prova ad eseguire l'autenticazione usando un auth token da querystring
    async loadAccessToken(querystringAuthToken: string): Promise<void> {
        const data = await this.authService.getAccessTokenByAuthenticationToken(querystringAuthToken);
        // "data" è il token di accesso che deve essere salvato nel session storage
        this.localStorageService.setItem("sintesiAccessToken", data.accessToken);
        this.localStorageService.setItem("sintesiRefreshToken", data.refreshToken);
    }

    /**
    * Carica la lista delle automazioni (attive e non) dal server
    */
    private caricaListaAutomazioniDaServer() {
        // richiama l'api server
        this.automationApiService.getAutomationsList().then((data) => {
            // salva il risultato in una variabile locale
            this.listaAutomazioni = data;
        });
    }

    // disattiva un'automazione esistente (non cancella la configurazione)
    deactivateAutomation(): void {
        this.automationApiService.deactivateAutomation(this.activeAutomationKey).then(result => {
            console.log(result);
            this.closeAddAutomationModal();
            this.caricaListaAutomazioniDaServer();
        });
    }

    // apre la modale per aggiunta automazione
    openAddAutomationModal(): void {
        this.modalAddAutomationRef = this.modalService.open(this.templateModalAddAutomation);
    }
    // chiude la modale per l'aggiunta di un'automazione
    closeAddAutomationModal(): void {
        this.modalAddAutomationRef?.close();
    }
    // attiva l'automazione selezionata nella modale
    addAutomation(automationKey: string): void {
        this.automationApiService.activateAutomation(automationKey).then(result => {
            this.closeAddAutomationModal();
            this.caricaListaAutomazioniDaServer();
       });
    }

    /**
     * Apre la modale per la configurazione di un'automazione esistente (attiva)
     */
    openEditAutomationModal(automationKey: string): void {

        // imposta l'automazione cliccata come quella corrente
        this.activeAutomationKey = automationKey;

        // recupera la configurazione per questa automazione dal server
        this.automationApiService
            .getAutomationConfiguration(this.activeAutomationKey)
            .then((config) => {

                // apro la finestra modale per la configurazione dell'automazione selezionata
                // la funzione open() passa il tipo di componente riferito all'automazione selezionata
                const modalOptions = {size: 'xl'};
                const modalRef = this.modalService.open(this.configModals[automationKey], modalOptions);

                // assegno la configurazione caricata dal server (non serve castare perché componentInstance è any)
                if (config.configuration == null) {
                    config.configuration = {};
                }
                modalRef.componentInstance.configuration = config.configuration;
                modalRef.componentInstance.automationKey = automationKey;

                // risolvo la promise alla chiusura
                modalRef.result.then(
                    (data) => {

                        // in caso di click su rimozione automazione
                        if (data === "removeAutomation") {
                            this.deactivateAutomation();
                            return;
                        }

                        // qui ci occupiamo del salvataggio della configurazione (è nell'oggetto data)
                        console.log("oggetto configurazione per il salvataggio:", data);

                        this.automationApiService
                            .saveAutomationConfiguration(this.activeAutomationKey, data)
                            .then((response) => {
                                console.log("save response:", response);
                            });


                    },
                    () => {
                        //errore
                    }
                );
            });
    }

}
