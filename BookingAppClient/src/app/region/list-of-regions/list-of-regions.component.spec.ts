import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRegionsComponent } from './list-of-regions.component';

describe('ListOfRegionsComponent', () => {
  let component: ListOfRegionsComponent;
  let fixture: ComponentFixture<ListOfRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
