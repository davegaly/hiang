import { AutomationConfiguration } from "../../automation-configuration.model";

// contiene la configurazione per questa automazione
export interface AutomationConfigurationCreazioneFlussiAvvisiSiComunica extends AutomationConfiguration {
    // lista di configurazione singole
    listaConfigurazioniSingole: AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola[];
}

// contiene le informazioni di configurazione singola (in un'agenzia posso avere n configurazioni per gli invii)
export interface AutomationConfigurationCreazioneFlussiAvvisiSiComunicaSingola {
    // identificativo univodo per questa pianificazione
    guid: string | null;
    titoloConfigurazione: string | null;
    frequenzaPreparazioneAvvisi: string | null;
    listaCompagnieId: number[];
    listaProduttoriId: number[];
    listaTipiDocumentoId: number[];
    listaFrazionamentiId: number[];
    elaboraSeElaborato: string | null;
    destinatarioCapogruppo: string | null;
    scadenzeAuto:string | null;
    scadenzeRe: string | null;
    scadenzeVita: string | null;
}

// rappresenta una chiave valore per il campo frequenza
export interface AutomationConfigurationCreazioneFlussiAvvisiSiComunicaFrequenza {
    id: string;
    descrizione: string;
}
