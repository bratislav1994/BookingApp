import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeComponent } from './create-type.component';

describe('CreateTypeComponent', () => {
  let component: CreateTypeComponent;
  let fixture: ComponentFixture<CreateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
