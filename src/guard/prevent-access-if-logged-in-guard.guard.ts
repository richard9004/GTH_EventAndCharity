import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { StorageService } from '../app/auth/services/storage/storage.service';

export const preventAccessIfLoggedInGuardGuard: CanActivateFn = (route, state) => {
   
  const router = inject(Router)
 

  if (StorageService.hasToken() && StorageService.isUserLoggedIn()) {
    console.log("User is logged in. Redirecting to user dashboard.");
    router.navigateByUrl('/user/dashboard');
    return false; // Block access to the current route
  }

  if (StorageService.hasToken() && StorageService.isOrganizerLoggedIn()) {
    console.log("Organizer is logged in. Redirecting to organizer dashboard.");
    router.navigateByUrl('/organizers/dashboard');
    return false; // Block access to the current route
  }

  return true;
};
