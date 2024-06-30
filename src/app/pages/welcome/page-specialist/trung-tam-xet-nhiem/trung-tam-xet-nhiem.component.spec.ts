import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrungTamXetNhiemComponent } from './trung-tam-xet-nhiem.component';

describe('TrungTamXetNhiemComponent', () => {
  let component: TrungTamXetNhiemComponent;
  let fixture: ComponentFixture<TrungTamXetNhiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrungTamXetNhiemComponent]
    });
    fixture = TestBed.createComponent(TrungTamXetNhiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
