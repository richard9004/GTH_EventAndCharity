import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { organizerGuard } from './organizer.guard';

describe('organizerGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => organizerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
