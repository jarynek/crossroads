import { TestBed } from '@angular/core/testing';

import { CrossroadsService } from './crossroads.service';

describe('CrossroadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrossroadsService = TestBed.get(CrossroadsService);
    expect(service).toBeTruthy();
  });
});
