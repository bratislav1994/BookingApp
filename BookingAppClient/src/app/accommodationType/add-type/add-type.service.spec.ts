import { TestBed, inject } from '@angular/core/testing';

import { AddTypeService } from './add-type.service';

describe('AddTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTypeService]
    });
  });

  it('should be created', inject([AddTypeService], (service: AddTypeService) => {
    expect(service).toBeTruthy();
  }));
});
