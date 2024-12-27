import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../app/auth/services/storage/storage.service';

export const authenticateChildrenGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router)
   console.log("IN Children GUARD 2");
  
   if (StorageService.hasToken()) {
    console.log("User is authenticated.");
    return true; // Allow access if a token exists
  } else {
    console.log("User is not authenticated. Redirecting to login.");
    router.navigateByUrl('/login');
    return false; // Block access and redirect
  }
};
