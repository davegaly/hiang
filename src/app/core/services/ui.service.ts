import { ModalConfirmComponent } from './../components/modals/modal-confirm/modal-confirm.component';
import { ModalMessageComponent } from './../components/modals/modal-message/modal-message.component';
import { ElementRef, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { TextService } from './text.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


@Injectable({
    providedIn: 'root'
})
export class UIService {
    private isLoadingSubject = new Subject<boolean>();
    /**
     * Contatore che assicura che la hideLoading() abbia effetto solo se chiamata un numero di volte uguale a showLoading()
     */
    private loadingCounter = 0;
    isLoading = this.isLoadingSubject as Observable<boolean>;

    public constructor(private modalService: NgbModal, private textService: TextService) {

    }

    /**
     * Mostra il caricamento
     */
    showLoading(): void {
        ++this.loadingCounter;
        this.isLoadingSubject.next(true);
    }

    /**
     * Nasconde il caricamento
     */
    hideLoading(): void {
        if (--this.loadingCounter === 0) {
            this.isLoadingSubject.next(false);
        }
    }

    /**
     * Apre una modale passando un ElementRef come contenuto della modale
     * @param content Contenuto della modale
     * @param options
     * @returns Riferimento alla modale aperta
     */
    private openModal(content: any, options?: {
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }): NgbModalRef {
        const modalRef = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: options?.size,
            centered: options?.centered ?? true,
            scrollable: options?.scrollable,
            fullscreen: options?.fullscreen
        });
        return modalRef;
    }

    /**
     * Apre una modale passando un ElementRef come contenuto della modale. L'ElementRef è un ng-template contenente un app-custom-modal-* (es. <ng-template #nomeModale let-modal><app-custom-modal-confirm [modal]="modal">...)
     * @param content Contenuto della modale
     * @param options
     * @returns Riferimento alla modale aperta
     */
    openCustomModal(content: ElementRef, options?: {
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }): NgbModalRef {
        return this.openModal(content, options);
    }

    /**
     * Apre una modale di messaggio standard
     * @param message
     * @param options
     * @returns
     */
    openMessageModal(message: string, options?: {
        title?: string,
        type?: string,
        canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        canDismiss?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        okButton: string,
        okIcon?: IconProp,
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }) {
        return this.openHtmlMessageModal(this.textService.textToHtmlText(message), options);
    }

    /**
     * Apre una modale di conferma standard
     * @param message
     * @param options
     * @returns
     */
    openConfirmModal(message: string, options?: {
        title?: string,
        type?: string,
        canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        canDismiss?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        okButton?: string,
        okIcon?: IconProp,
        cancelButton?: string,
        cancelIcon?: IconProp,
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }) {
        return this.openHtmlConfirmModal(this.textService.textToHtmlText(message), options);
    }

    /**
     * Apre una modale di successo
     * @param message
     * @param title
     */
    openSuccessModal(
        message: string,
        title = 'Successo') {
        return this.openHtmlSuccessModal(this.textService.textToHtmlText(message), title);
    }

    /**
     * Apre una modale di errore
     * @param message
     * @param title
     */
    openErrorModal(
        message: string,
        title = 'Errore') {
        return this.openHtmlErrorModal(this.textService.textToHtmlText(message), title);
    }

    /**
     * Apre una modale di messaggio standard
     * @param htmlMessage
     * @param options
     * @returns
     */
    openHtmlMessageModal(htmlMessage: string, options?: {
        title?: string,
        type?: string,
        canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        canDismiss?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        okButton: string,
        okIcon?: IconProp,
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }) {
        const modalRef = this.openModal(ModalMessageComponent, options);
        modalRef.componentInstance.canClose = options?.canClose;
        modalRef.componentInstance.canDismiss = options?.canDismiss;
        modalRef.componentInstance.type = options?.type ?? 'success';
        modalRef.componentInstance.modalTitle = options?.title ?? 'Messaggio';
        modalRef.componentInstance.message = htmlMessage;
        modalRef.componentInstance.okButton = options?.okButton ?? 'OK';
        modalRef.componentInstance.okIcon = options?.okIcon;
        return modalRef;
    }

    /**
     * Apre una modale di conferma standard
     * @param htmlMessage
     * @param options
     * @returns
     */
    openHtmlConfirmModal(htmlMessage: string, options?: {
        title?: string,
        type?: string,
        canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        canDismiss?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>),
        okButton?: string,
        okIcon?: IconProp,
        cancelButton?: string,
        cancelIcon?: IconProp,
        size?: undefined | 'sm' | 'lg' | 'xl',
        scrollable?: boolean,
        centered?: boolean,
        fullscreen?: boolean
    }) {
        const modalRef = this.openModal(ModalConfirmComponent, options);
        modalRef.componentInstance.canClose = options?.canClose;
        modalRef.componentInstance.canDismiss = options?.canDismiss;
        modalRef.componentInstance.type = options?.type ?? 'primary';
        modalRef.componentInstance.modalTitle = options?.title ?? 'Conferma';
        modalRef.componentInstance.message = htmlMessage;
        modalRef.componentInstance.okButton = options?.okButton ?? 'OK';
        modalRef.componentInstance.okIcon = options?.okIcon;
        modalRef.componentInstance.cancelButton = options?.cancelButton ?? 'Annulla';
        modalRef.componentInstance.cancelIcon = options?.cancelIcon;
        return modalRef;
    }

    /**
     * Apre una modale di successo
     * @param htmlMessage
     * @param title
     */
    openHtmlSuccessModal(
        htmlMessage: string,
        title = 'Successo') {
        const modalRef = this.openModal(ModalMessageComponent);
        modalRef.componentInstance.type = 'success';
        modalRef.componentInstance.modalTitle = title;
        modalRef.componentInstance.message = htmlMessage;
        return modalRef;
    }

    /**
     * Apre una modale di errore
     * @param htmlMessage
     * @param title
     */
    openHtmlErrorModal(
        htmlMessage: string,
        title = 'Errore') {
        const modalRef = this.openModal(ModalMessageComponent);
        modalRef.componentInstance.type = 'danger';
        modalRef.componentInstance.modalTitle = title;
        modalRef.componentInstance.message = htmlMessage;
        return modalRef;
    }
}
