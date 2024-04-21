import { TestBed } from '@angular/core/testing';

import { EoServiceService } from './eo-service.service';

describe('EoServiceService', () => {
  let service: EoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
