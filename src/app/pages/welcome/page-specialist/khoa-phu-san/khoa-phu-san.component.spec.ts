import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaPhuSanComponent } from './khoa-phu-san.component';

describe('KhoaPhuSanComponent', () => {
  let component: KhoaPhuSanComponent;
  let fixture: ComponentFixture<KhoaPhuSanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaPhuSanComponent]
    });
    fixture = TestBed.createComponent(KhoaPhuSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
