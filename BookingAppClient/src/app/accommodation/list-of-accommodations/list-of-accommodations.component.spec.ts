import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAccommodationsComponent } from './list-of-accommodations.component';

describe('ListOfAccommodationsComponent', () => {
  let component: ListOfAccommodationsComponent;
  let fixture: ComponentFixture<ListOfAccommodationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAccommodationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
