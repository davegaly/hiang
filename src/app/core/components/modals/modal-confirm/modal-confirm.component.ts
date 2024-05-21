import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-custom-modal-confirm',
    standalone: true,
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss'],
    imports: [CommonModule, FontAwesomeModule]
})
export class ModalConfirmComponent{
    @Input() type = 'primary';
    @Input() modalTitle = 'Conferma';
    @Input() message = 'Modale di conferma';
    @Input() cancelText = 'Annulla';
    @Input() okText = 'OK';
    @Input() cancelIcon?: IconProp;
    @Input() okIcon?: IconProp;
    @Input() canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>);
    @Input() canDismiss?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>);

    get okButtonClass() {
        return 'btn-' + this.type;
    }

    constructor(private modal: NgbActiveModal) {
    }

    onOk() {
        const result = this.canClose === undefined ? true : this.canClose;

        if (typeof result === 'boolean') {
            if (result) this.modal.close('ok');
        } else if (typeof result === 'function') {
            const subResult = result();
            if (typeof subResult === 'boolean') {
                if (subResult) this.modal.close('ok');
            } else {
                subResult.then(close => {
                    if (close) this.modal.close('ok');
                });
            }
        } else {
            result.then(close => {
                if (close) this.modal.close('ok');
            });
        }
    }

    onCancel() {
        const result = this.canDismiss === undefined ? true : this.canDismiss;

        if (typeof result === 'boolean') {
            if (result) this.modal.dismiss('cancel');
        } else if (typeof result === 'function') {
            const subResult = result();
            if (typeof subResult === 'boolean') {
                if (subResult) this.modal.dismiss('cancel');
            } else {
                subResult.then(close => {
                    if (close) this.modal.dismiss('cancel');
                });
            }
        } else {
            result.then(close => {
                if (close) this.modal.dismiss('cancel');
            });
        }
    }
}
