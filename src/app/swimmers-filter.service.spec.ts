import { TestBed } from '@angular/core/testing';

import { SwimmersFilterService } from './swimmers-filter.service';

describe('SwimmersFilterService', () => {
  let service: SwimmersFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwimmersFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
