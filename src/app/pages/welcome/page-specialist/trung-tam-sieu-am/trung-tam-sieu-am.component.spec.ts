import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrungTamSieuAmComponent } from './trung-tam-sieu-am.component';

describe('TrungTamSieuAmComponent', () => {
  let component: TrungTamSieuAmComponent;
  let fixture: ComponentFixture<TrungTamSieuAmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrungTamSieuAmComponent]
    });
    fixture = TestBed.createComponent(TrungTamSieuAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
