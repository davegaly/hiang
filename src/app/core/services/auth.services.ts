import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { SintesiApiResponse } from '../models/sintesi-api-response.model';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutomazioneResponseDTO } from 'src/app/pages/automation/automation-response.model';
import { LocalStorageService } from './localStorage.services';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(protected httpClient: HttpClient, protected localStorageService: LocalStorageService) {}

    /**
     * Spedisce l'authentication token e prova a far restituire l'access token da salvare nello session storage
     * @param authenticationToken
     * @returns
     */
    public getAccessTokenByAuthenticationToken(authenticationToken: string): Promise<any> {
        let params = new HttpParams().set('licenza_cliente_id', '200002');
        let objPost = { authenticationToken: authenticationToken };
        return this.unwrapResponse(
            this.httpClient.post<SintesiApiResponse<any>>(environment.apiUrl + '/sintesi/auth/token', objPost, { params }),
            []
        );
    }

    /**
     * Ritorna la collections degli headers includendo il valore sintesiAccessToken dal local storage
     * @returns
     */
    public returnSintesiAuthHeader(): HttpHeaders {
        const headers = new HttpHeaders({'Authorization': this.localStorageService.getItem("sintesiAccessToken")});
        return headers;
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
