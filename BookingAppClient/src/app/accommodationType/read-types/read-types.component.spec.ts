import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTypesComponent } from './read-types.component';

describe('ReadTypesComponent', () => {
  let component: ReadTypesComponent;
  let fixture: ComponentFixture<ReadTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
