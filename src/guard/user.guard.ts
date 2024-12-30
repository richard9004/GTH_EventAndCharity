import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../app/auth/services/storage/storage.service';
import { inject } from '@angular/core';

export const userGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router)

  if (!StorageService.hasToken()) {
    router.navigateByUrl('/login');
    return false;
  }else if(StorageService.hasToken() && StorageService.isUserLoggedIn()) {
     console.log("User Routes.");
     return true; // Block access to the current route
   }else{
     router.navigateByUrl('/home');
     return false;
   }
};
