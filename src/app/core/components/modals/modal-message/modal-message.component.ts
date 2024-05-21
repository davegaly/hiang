import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-message',
    standalone: true,
    templateUrl: './modal-message.component.html',
    styleUrls: ['./modal-message.component.scss'],
    imports: [CommonModule, FontAwesomeModule]
})
export class ModalMessageComponent {
    @Input() type = 'primary';
    @Input() modalTitle = 'Messaggio';
    @Input() message = 'Modale di messaggio';
    @Input() okText = 'OK';
    @Input() okIcon?: IconProp;
    @Input() canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>);

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
}
