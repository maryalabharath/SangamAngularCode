import { TestBed } from '@angular/core/testing';

import { AnjumanmemberregService } from './anjumanmemberreg.service';

describe('AnjumanmemberregService', () => {
  let service: AnjumanmemberregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnjumanmemberregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
