import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaNoiComponent } from './khoa-noi.component';

describe('KhoaNoiComponent', () => {
  let component: KhoaNoiComponent;
  let fixture: ComponentFixture<KhoaNoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaNoiComponent]
    });
    fixture = TestBed.createComponent(KhoaNoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
