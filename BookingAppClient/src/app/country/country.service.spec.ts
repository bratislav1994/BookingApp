import { TestBed, inject } from '@angular/core/testing';

import { AddCountryService } from './add-country.service';

describe('AddCountryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCountryService]
    });
  });

  it('should ...', inject([AddCountryService], (service: AddCountryService) => {
    expect(service).toBeTruthy();
  }));
});
