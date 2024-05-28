import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DortorNavBarComponent } from './dortor-nav-bar.component';

describe('DortorNavBarComponent', () => {
  let component: DortorNavBarComponent;
  let fixture: ComponentFixture<DortorNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DortorNavBarComponent]
    });
    fixture = TestBed.createComponent(DortorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
