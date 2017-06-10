import { TestBed, inject } from '@angular/core/testing';

import { AccommodationService } from './accommodation.service';

describe('AccommodationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccommodationService]
    });
  });

  it('should ...', inject([AccommodationService], (service: AccommodationService) => {
    expect(service).toBeTruthy();
  }));
});
