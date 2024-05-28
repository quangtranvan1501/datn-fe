import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLookupComponent } from './service-lookup.component';

describe('ServiceLookupComponent', () => {
  let component: ServiceLookupComponent;
  let fixture: ComponentFixture<ServiceLookupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLookupComponent]
    });
    fixture = TestBed.createComponent(ServiceLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
