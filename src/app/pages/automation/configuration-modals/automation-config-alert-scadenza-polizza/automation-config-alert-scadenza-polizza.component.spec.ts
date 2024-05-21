import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationConfigAlertScadenzaPolizzaComponent } from './automation-config-alert-scadenza-polizza.component';

describe('AutomationConfigAlertScadenzaPolizzaComponent', () => {
  let component: AutomationConfigAlertScadenzaPolizzaComponent;
  let fixture: ComponentFixture<AutomationConfigAlertScadenzaPolizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationConfigAlertScadenzaPolizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomationConfigAlertScadenzaPolizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
