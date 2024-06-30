import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiMuiHongComponent } from './tai-mui-hong.component';

describe('TaiMuiHongComponent', () => {
  let component: TaiMuiHongComponent;
  let fixture: ComponentFixture<TaiMuiHongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaiMuiHongComponent]
    });
    fixture = TestBed.createComponent(TaiMuiHongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
