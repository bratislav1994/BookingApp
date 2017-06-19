import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedAccommodationComponent } from './not-approved-accommodation.component';

describe('NotApprovedAccommodationComponent', () => {
  let component: NotApprovedAccommodationComponent;
  let fixture: ComponentFixture<NotApprovedAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotApprovedAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
