import { TestBed } from '@angular/core/testing';

import { PiscineService } from './piscine.service';

describe('PiscineService', () => {
  let service: PiscineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiscineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
