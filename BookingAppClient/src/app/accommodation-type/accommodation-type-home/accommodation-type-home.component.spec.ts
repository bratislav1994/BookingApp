import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTypeHomeComponent } from './accommodation-type-home.component';

describe('AccommodationTypeHomeComponent', () => {
  let component: AccommodationTypeHomeComponent;
  let fixture: ComponentFixture<AccommodationTypeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationTypeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationTypeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
