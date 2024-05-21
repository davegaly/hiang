import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-base-component',
    template: '<h1>Base component works!</h1>',
  })
export abstract class AbstractBaseComponent implements OnDestroy {
    /**
     * Set di sottoscrizioni effettuate
     */
    subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        this.subscriptions.forEach(f => f.unsubscribe());
    }
}
