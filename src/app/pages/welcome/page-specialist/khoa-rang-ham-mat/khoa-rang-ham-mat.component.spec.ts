import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaRangHamMatComponent } from './khoa-rang-ham-mat.component';

describe('KhoaRangHamMatComponent', () => {
  let component: KhoaRangHamMatComponent;
  let fixture: ComponentFixture<KhoaRangHamMatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaRangHamMatComponent]
    });
    fixture = TestBed.createComponent(KhoaRangHamMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
