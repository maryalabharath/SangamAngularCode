import { TestBed } from '@angular/core/testing';

import { AnjumanloanissuedService } from './anjumanloanissued.service';

describe('AnjumanloanissuedService', () => {
  let service: AnjumanloanissuedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnjumanloanissuedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
