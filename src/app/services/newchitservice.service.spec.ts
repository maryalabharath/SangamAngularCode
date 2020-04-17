import { TestBed } from '@angular/core/testing';

import { NewchitserviceService } from './newchitservice.service';

describe('NewchitserviceService', () => {
  let service: NewchitserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewchitserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
