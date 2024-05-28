import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleHistoryComponent } from './shedule-history.component';

describe('SheduleHistoryComponent', () => {
  let component: SheduleHistoryComponent;
  let fixture: ComponentFixture<SheduleHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheduleHistoryComponent]
    });
    fixture = TestBed.createComponent(SheduleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
