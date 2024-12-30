import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventAccessIfLoggedInGuardGuard } from './prevent-access-if-logged-in-guard.guard';

describe('preventAccessIfLoggedInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventAccessIfLoggedInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
