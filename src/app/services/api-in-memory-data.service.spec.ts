import { TestBed } from '@angular/core/testing';

import { ApiInMemoryDataService } from './api-in-memory-data.service';

describe('ApiInMemoryDataService', () => {
  let service: ApiInMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
