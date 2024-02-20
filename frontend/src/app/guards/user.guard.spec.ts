import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userGuard } from './user.guard';

describe('userGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
