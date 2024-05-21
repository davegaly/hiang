import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent } from './automation-config-creazione-flussi-avvisi-sicomunica.component';

describe('AutomationConfigAlertScadenzaPolizzaComponent', () => {
  let component: AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent;
  let fixture: ComponentFixture<AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationConfigCreazioneFlussiAvvisiSiComunicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
