import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaNhiComponent } from './khoa-nhi.component';

describe('KhoaNhiComponent', () => {
  let component: KhoaNhiComponent;
  let fixture: ComponentFixture<KhoaNhiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaNhiComponent]
    });
    fixture = TestBed.createComponent(KhoaNhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
