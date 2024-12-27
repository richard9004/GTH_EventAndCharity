import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authenticateChildrenGuard } from './authenticate-children.guard';

describe('authenticateChildrenGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticateChildrenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
