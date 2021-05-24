import { TestBed } from '@angular/core/testing';

import { MediaCollectionsService } from './media-collections-service.service';

describe('MediaCollectionsServiceService', () => {
  let service: MediaCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
