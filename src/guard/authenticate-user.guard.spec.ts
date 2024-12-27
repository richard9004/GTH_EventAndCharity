import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticateUserGuard } from './authenticate-user.guard';

describe('authenticateUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticateUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
