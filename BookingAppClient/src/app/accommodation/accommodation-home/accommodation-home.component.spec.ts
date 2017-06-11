import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationHomeComponent } from './accommodation-home.component';

describe('AccommodationHomeComponent', () => {
  let component: AccommodationHomeComponent;
  let fixture: ComponentFixture<AccommodationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
