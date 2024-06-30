import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaNoiSoiTieuHoaComponent } from './khoa-noi-soi-tieu-hoa.component';

describe('KhoaNoiSoiTieuHoaComponent', () => {
  let component: KhoaNoiSoiTieuHoaComponent;
  let fixture: ComponentFixture<KhoaNoiSoiTieuHoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaNoiSoiTieuHoaComponent]
    });
    fixture = TestBed.createComponent(KhoaNoiSoiTieuHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
