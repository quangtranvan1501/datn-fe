import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaXQuangComponent } from './khoa-x-quang.component';

describe('KhoaXQuangComponent', () => {
  let component: KhoaXQuangComponent;
  let fixture: ComponentFixture<KhoaXQuangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoaXQuangComponent]
    });
    fixture = TestBed.createComponent(KhoaXQuangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
