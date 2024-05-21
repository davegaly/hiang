import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationConfigWrapperComponent } from './automation-config-wrapper.component';

describe('AutomationConfigWrapperComponent', () => {
  let component: AutomationConfigWrapperComponent;
  let fixture: ComponentFixture<AutomationConfigWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationConfigWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationConfigWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
