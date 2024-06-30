import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaNgoaiComponent } from './khoa-ngoai.component';

describe('KhoaNgoaiComponent', () => {
  let component: KhoaNgoaiComponent;
  let fixture: ComponentFixture<KhoaNgoaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaNgoaiComponent]
    });
    fixture = TestBed.createComponent(KhoaNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
