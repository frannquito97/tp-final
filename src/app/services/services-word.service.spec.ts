import { TestBed } from '@angular/core/testing';

import { ServicesWordService } from './services-word.service';

describe('ServicesWordService', () => {
  let service: ServicesWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
