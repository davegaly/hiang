import { AutomationConfiguration } from "../../automation-configuration.model";

// contiene la configurazione per questa automazione
export interface AutomationConfigurationSolleciti extends AutomationConfiguration {
    // lista dei vari step di solleciti
    listaConfigurazioniSolleciti: AutomationConfigurationSollecitiSingolo[];
}

// contiene le informazioni di configurazione singola (la lista dei vari step di solleciti)
export interface AutomationConfigurationSollecitiSingolo {
    key: string | null;
    keyDisplayText: string | null;
    isAttivo: boolean | false;
    numeroGiorniPostScadenza: number | null;
    modalitaInvio: string | null;
    modelloEmail: number | null;
    modellSMS: number | null;
    isReportAgenzia: boolean | false;
    destinatariReportAgenzia: string | null;
    isReportCollaboratore: boolean | false;
}
