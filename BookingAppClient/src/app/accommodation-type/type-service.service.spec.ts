import { TestBed, inject } from '@angular/core/testing';

import { TypeServiceService } from './type-service.service';

describe('TypeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeServiceService]
    });
  });

  it('should be created', inject([TypeServiceService], (service: TypeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
