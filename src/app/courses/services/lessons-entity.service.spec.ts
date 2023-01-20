import { TestBed } from '@angular/core/testing';

import { LessonsEntityService } from './lessons-entity.service';

describe('LessonsEntityService', () => {
  let service: LessonsEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonsEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
