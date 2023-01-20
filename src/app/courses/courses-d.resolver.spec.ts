import { TestBed } from '@angular/core/testing';

import { CoursesDResolver } from './courses-d.resolver';

describe('CoursesDResolver', () => {
  let resolver: CoursesDResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CoursesDResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
