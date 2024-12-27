import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticateUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  console.log("IN GUARD");
  console.log("Guard executed for:", state.url);
  
  router.navigateByUrl('/login');
  return false;
};
