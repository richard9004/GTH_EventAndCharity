import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { GivingtocauseComponent } from './components/givingtocause/givingtocause.component';
import { GivingtofundraiserComponent } from './components/givingtofundraiser/givingtofundraiser.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './auth/auth-components/user-registration/user-registration.component';
import { OrganizerRegistrationComponent } from './auth/auth-components/organizer-registration/organizer-registration.component';
import { OrganizationThankYouComponent } from './auth/auth-components/organization-thank-you/organization-thank-you.component';

import { preventAccessIfLoggedInGuardGuard } from '../guard/prevent-access-if-logged-in-guard.guard';
import { userGuard } from '../guard/user.guard';
import { organizerGuard } from '../guard/organizer.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[preventAccessIfLoggedInGuardGuard] },
  { path: 'register', component: SignupComponent, canActivate:[preventAccessIfLoggedInGuardGuard] },
  { path: 'user-registration', component: UserRegistrationComponent, canActivate:[preventAccessIfLoggedInGuardGuard] },
  { path: 'organizer-thank-you', component: OrganizationThankYouComponent },
  { path: 'organizer-registration', component: OrganizerRegistrationComponent, canActivate:[preventAccessIfLoggedInGuardGuard] },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), 
    canMatch: [] 
  },
  // { 
  //   path: 'customer', 
  //   loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule), 
  //   canMatch: [] 
  // },
  { 
    path: 'user', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), 
    canMatch: [userGuard] 
  },
  { 
    path: 'organizers', 
    loadChildren: () => import('./modules/organizers/organizers.module').then(m => m.OrganizersModule), 
    canMatch: [organizerGuard] 
  },

  { path: 'giving-to-fundraiser', component: GivingtofundraiserComponent },
  { path: 'giving-to-cause', component: GivingtocauseComponent },
  { path: 'home', component: HomeComponent },
   // Make HomeComponent the default page
   { path: '', component: HomeComponent },
   // Optional route for '/home' to also load HomeComponent
   { path: 'home', component: HomeComponent },
   // Wildcard route for handling unknown paths
   { path: '**', redirectTo: '' },
];
