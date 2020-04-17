import { TestBed } from '@angular/core/testing';

import { RegistermemberService } from './registermember.service';

describe('RegistermemberService', () => {
  let service: RegistermemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistermemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
