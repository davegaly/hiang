import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationConfigAuguriCompleannoComponent } from './automation-config-auguri-compleanno.component';

describe('AutomationConfigAuguriCompleannoComponent', () => {
  let component: AutomationConfigAuguriCompleannoComponent;
  let fixture: ComponentFixture<AutomationConfigAuguriCompleannoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationConfigAuguriCompleannoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomationConfigAuguriCompleannoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
