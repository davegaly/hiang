import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalMessageComponent } from './custom-modal-message.component';

describe('CustomModalMessageComponent', () => {
  let component: CustomModalMessageComponent;
  let fixture: ComponentFixture<CustomModalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CustomModalMessageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CustomModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
