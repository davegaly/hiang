import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalConfirmComponent } from './custom-modal-confirm.component';

describe('CustomModalConfirmComponent', () => {
  let component: CustomModalConfirmComponent;
  let fixture: ComponentFixture<CustomModalConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CustomModalConfirmComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CustomModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
