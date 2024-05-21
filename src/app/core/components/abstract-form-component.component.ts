import { UIService } from './../services/ui.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AbstractBaseComponent } from './abstract-base-component.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-form-component',
    template: '<h1>Form component works!</h1>',
})
export abstract class AbstractFormComponent extends AbstractBaseComponent implements AfterViewInit {
    /**
     * Riferimento a elemento HTML (#autofocus) su cui impostare il fuoco di default. Simula l'attributo HTML5 autofocus, ma funziona anche col routing.
     */
    @ViewChild('autofocus') autofocus!: ElementRef;

    private _uiService?: UIService;

    /**
     * Form del controller corrente
     */
    abstract form: FormGroup;

    /**
         * Messaggio di successo
         */
    private _successMessageValue = '';
    /**
     * Indica se il componente ha successi da mostrare
     */
    private _hasSuccessSubject = new Subject<boolean>();
    /**
     * Messaggio di successo
     */
    get successMessage() {
        return this._successMessageValue;
    }
    /**
     * Indica se il componente ha successi da mostrare
     */
    public hasSuccess = this._hasSuccessSubject.asObservable();

    /**
     * Imposta il messaggio di successo
     * @param message 
     */
    public setSuccessMessage(message: any): NgbModalRef | null {
        if (!message) {
            this._successMessageValue = '';
            this._hasSuccessSubject.next(false);
            return null;
        } else {
            this._successMessageValue = message.toString();
            if (this._uiService) {
                return this._uiService.openSuccessModal(this.successMessage);
            } else {
                this._hasSuccessSubject.next(true);
                return null;
            }
        }
    }

    /**
     * Reimposta il messaggio di successo
     */
    public resetSuccessMessage() {
        this.setSuccessMessage(null);
    }

    /**
     * Messaggio di errore
     */
    private _errorMessageValue = '';
    /**
     * Indica se il componente ha errori da mostrare
     */
    private _hasErrorSubject = new Subject<boolean>();
    /**
     * Messaggio di errore
     */
    get errorMessage() {
        return this._errorMessageValue;
    };
    /**
     * Indica se il componente ha errori da mostrare
     */
    public hasError = this._hasErrorSubject.asObservable();

    /**
     * Imposta il messaggio di errore
     * @param message 
     */
    public setErrorMessage(message: any): NgbModalRef | null {
        if (!message) {
            this._errorMessageValue = '';
            this._hasErrorSubject.next(false);
            return null;
        } else {
            this._errorMessageValue = message.toString();
            if (this._uiService) {
                return this._uiService.openErrorModal(this.errorMessage);
            } else {
                this._hasErrorSubject.next(true);
                return null;
            }
        }
    }

    /**
     * Reimposta il messaggio di errore
     */
    public resetErrorMessage() {
        this.setErrorMessage(null);
    }

    /**
     * Mostra i messaggi di errore e successo sotto forma di modali
     * @param uiService 
     */
    handleMessagesWithModals(uiService: UIService) {
        //potrei fare la subscribe, ma siccome potrei volermi concatenare setErrorMessage o setSuccessMessage
        this._uiService = uiService;
    }

    public constructor() {
        super();
    }

    ngAfterViewInit(): void {
        //se esiste l'elemento di autofocus eseguo il focus
        this.autofocus?.nativeElement?.focus();
    }
}
