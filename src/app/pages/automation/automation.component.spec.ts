import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationsComponent } from './automations.component';

describe('AutomationComponent', () => {
  let component: AutomationComponent;
  let fixture: ComponentFixture<AutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AutomationComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
