import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaMatComponent } from './khoa-mat.component';

describe('KhoaMatComponent', () => {
  let component: KhoaMatComponent;
  let fixture: ComponentFixture<KhoaMatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaMatComponent]
    });
    fixture = TestBed.createComponent(KhoaMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
