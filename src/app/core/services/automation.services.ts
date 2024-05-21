import { AuthService } from 'src/app/core/services/auth.services';
import { LocalStorageService } from './localStorage.services';
import { Injectable } from '@angular/core';
import { environment } from './../../../environment/environment';
import { SintesiApiResponse } from './../models/sintesi-api-response.model';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutomazioneResponseDTO } from 'src/app/pages/automation/automation-response.model';
import { AutomazioneLogResponseDTO } from 'src/app/pages/automation/automation-log-response.model';

@Injectable({ providedIn: 'root' })
export class AutomationApiService {
    constructor(protected httpClient: HttpClient, protected authService: AuthService) {}

    /**
     * Reperisce la lista automazioni
     * @returns
     */
    public getAutomationsList(): Promise<AutomazioneResponseDTO[]> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/automations/', { headers, params }),
            []
        );
    }

    /**
     * Reperisce una singola automazione
     * @param automationKey
     * @returns
     */
    public getAutomationConfiguration(automationKey: string): Promise<any> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/automations/' + automationKey, { headers, params }),
            []
        );
    }

    /**
     * Salva la configurazione di un'automazione
     * @param automationKey
     * @returns
     */
    public saveAutomationConfiguration(automationKey: string, configurationData: any): Promise<any> {
        let headers = this.authService.returnSintesiAuthHeader();
        headers = headers.set('X-Http-Method-Override', 'PUT');
        let params = new HttpParams().set('licenza_cliente_id', '200002');
        const objPost = {configuration: configurationData}
        return this.unwrapResponse(
            this.httpClient.post<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/configurations/'+ automationKey, objPost, { params, headers }),
            []
        );
    }

    /**
     * Attiva l'automazione
     * @param automationKey
     * @returns
     */
    public activateAutomation(automationKey: string): Promise<any> {
        let headers = this.authService.returnSintesiAuthHeader();
        headers = headers.set('X-Http-Method-Override', 'PATCH');
        let params = new HttpParams().set('licenza_cliente_id', '200002');
        let objPost = { isActive: true };
        return this.unwrapResponse(
            this.httpClient.post<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/automations/'+ automationKey, objPost, { params, headers }),
            []
        );
    }

    /**
     * Disattiva l'automazione
     * @param automationKey
     * @returns
     */
    public deactivateAutomation(automationKey: string): Promise<any> {
        let headers = this.authService.returnSintesiAuthHeader();
        headers = headers.set('X-Http-Method-Override', 'PATCH');
        let params = new HttpParams().set('licenza_cliente_id', '200002');
        let objPost = { isActive: false };
        return this.unwrapResponse(
            this.httpClient.post<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/automations/'+ automationKey, objPost, { params, headers }),
            []
        );
    }

    /**
     * Reperisce la lista dei collaboratori
     * @returns
     */
    public getProduttori(): Promise<AutomazioneResponseDTO[]> {
        let headers = this.authService.returnSintesiAuthHeader();
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/produttori/', { headers, params }),
            []
        );
    }

    /**
     * Reperisce la lista dei tipi frazionamento
     * @returns
     */
    public getTipiFrazionamento(): Promise<AutomazioneResponseDTO[]> {
        let headers = this.authService.returnSintesiAuthHeader();
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/frazionamenti/', { headers, params }),
            []
        );
    }

    /**
     * Reperisce la lista dei tipi documento
     * @returns
     */
    public getTipiDocumento(): Promise<AutomazioneResponseDTO[]> {
        let headers = this.authService.returnSintesiAuthHeader();
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/tipidocumento/', { headers, params }),
            []
        );
    }

    /**
     * Reperisce la lista delle compagnie gestite
     * @returns
     */
    public getCompagnie(): Promise<AutomazioneResponseDTO[]> {
        let headers = this.authService.returnSintesiAuthHeader();
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/compagnie/', { headers, params }),
            []
        );
    }

    /**
     * Reperisce gli elementi del log per una data automazione per un'azienda/agenzia
     * @returns
     */
    public getAutomationLogs(automationKey: string): Promise<any[]> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/logs/' + automationKey, { headers, params }),
            []
        );
    }


    /**
     * Reperisce un singolo elemento di log (contenente il campo con i dati)
     * @returns
     */
    public getAutomationLogFile(automationKey: string, logId: number): Promise<any> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/logs/' + automationKey + "/" + logId + "/file", { headers, params }),
            []
        );
    }


    /**
     * Recupera le modalità di invio
     * @returns
     */
    public getModalitaInvio(): Promise<any> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/modalitainvio', { headers, params }),
            []
        );
    }


    /**
     * Recupera le modalità di invio
     * @returns
     */
    public getModelliInvio(tipoModello: string): Promise<any> {
        const params = new HttpParams().set('licenza_cliente_id', '200002');
        let headers = this.authService.returnSintesiAuthHeader();
        return this.unwrapResponse(
            this.httpClient.get<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/automations/modelliinvio/' + tipoModello, { headers, params }),
            []
        );
    }


    /**
     * Sottoscrive la risposta asincrona e ne estrapola il dato significativo
     * @param observable Observable da sottoscrivere che restituisce JSend<TResponse>
     * @param fallbackValue Valore TData di fallback nel caso in cui la risposta sia vuota o con errori
     * @param onUnwrap Metodo da eseguire in caso di evento avvenuto con successo. Definisce come da TResponse si arrivi a TData. Se omesso, TResponse viene castato direttamente a TData
     * @param anonymous Se true, la chiamata viene effettuata anche in caso di login non valida anziché risolvere sul valore di fallback
     * @returns
     */
    public unwrapResponse<TData, TResponse>(
        observable: Observable<SintesiApiResponse<TResponse>>,
        fallbackValue: TData,
        onUnwrap?: (promiseResolve: (value: TData | PromiseLike<TData>) => void, responseData: TResponse | undefined, fallbackValue: TData, promiseReject: (reason?: any) => void) => void,
        anonymous = false
    ): Promise<TData> {
        return new Promise<TData>((resolve, reject) => {
            if (anonymous || true) {
                observable.subscribe({
                    next: response => {
                        if (response && response.httpstatus.code === 200) {
                            //se ho un metodo di unwrap lo uso per estrarre i dati da response.data
                            if (onUnwrap) {
                                onUnwrap(resolve, response.data, fallbackValue, reject);
                                //altrimenti casto diretto
                            } else {
                                resolve(<TData>response.data ?? fallbackValue);
                            }
                        } else {
                            resolve(fallbackValue);
                        }
                    },
                    error: error => {
                        resolve(fallbackValue);
                    }
                });
            } else {
                resolve(fallbackValue);
            }
        });
    }
}
