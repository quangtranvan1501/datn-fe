import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSheduleComponent } from './config-shedule.component';

describe('ConfigSheduleComponent', () => {
  let component: ConfigSheduleComponent;
  let fixture: ComponentFixture<ConfigSheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigSheduleComponent]
    });
    fixture = TestBed.createComponent(ConfigSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
