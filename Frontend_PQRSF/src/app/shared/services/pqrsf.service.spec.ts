import { TestBed } from '@angular/core/testing';

import { PqrsfService } from './pqrsf.service';

describe('PqrsfService', () => {
  let service: PqrsfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrsfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
