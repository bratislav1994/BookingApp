import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHomeComponent } from './reservation-home.component';

describe('ReservationHomeComponent', () => {
  let component: ReservationHomeComponent;
  let fixture: ComponentFixture<ReservationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});