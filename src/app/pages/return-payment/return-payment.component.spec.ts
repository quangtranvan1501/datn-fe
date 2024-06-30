import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPaymentComponent } from './return-payment.component';

describe('ReturnPaymentComponent', () => {
  let component: ReturnPaymentComponent;
  let fixture: ComponentFixture<ReturnPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnPaymentComponent]
    });
    fixture = TestBed.createComponent(ReturnPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
