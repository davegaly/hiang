import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal-message',
  templateUrl: './custom-modal-message.component.html',
  styleUrls: ['./custom-modal-message.component.scss']
})
export class CustomModalMessageComponent {
    @Input() type = "primary";
    @Input() modalTitle = "Messaggio";
    @Input() okText = "OK";
    @Input() okIcon?: IconProp;
    @Input() modal!: NgbActiveModal;
    @Input() canClose?: boolean | Promise<boolean> | (() => boolean | Promise<boolean>);

    get okButtonClass() {
        return 'btn-' + this.type;
    }

    constructor() {
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
