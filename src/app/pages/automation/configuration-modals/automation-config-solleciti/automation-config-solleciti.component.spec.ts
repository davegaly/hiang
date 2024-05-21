import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationConfigSollecitiComponent } from './automation-config-solleciti.component';

describe('AutomationConfigSollecitiComponent', () => {
  let component: AutomationConfigSollecitiComponent;
  let fixture: ComponentFixture<AutomationConfigSollecitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationConfigSollecitiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationConfigSollecitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
