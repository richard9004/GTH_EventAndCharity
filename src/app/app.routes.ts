import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { GivingtocauseComponent } from './components/givingtocause/givingtocause.component';
import { GivingtofundraiserComponent } from './components/givingtofundraiser/givingtofundraiser.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './auth/auth-components/user-registration/user-registration.component';
import { OrganizerRegistrationComponent } from './auth/auth-components/organizer-registration/organizer-registration.component';
import { OrganizationThankYouComponent } from './auth/auth-components/organization-thank-you/organization-thank-you.component';
import { authenticateUserGuard } from '../guard/authenticate-user.guard';
import { authenticateChildrenGuard } from '../guard/authenticate-children.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'organizer-thank-you', component: OrganizationThankYouComponent },
  { path: 'organizer-registration', component: OrganizerRegistrationComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), 
    canMatch: [authenticateChildrenGuard] 
  },
  { 
    path: 'customer', 
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule), 
    canMatch: [authenticateChildrenGuard] 
  },
  { 
    path: 'user', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), 
    canMatch: [authenticateChildrenGuard] 
  },
  { 
    path: 'organizers', 
    loadChildren: () => import('./modules/organizers/organizers.module').then(m => m.OrganizersModule), 
    canMatch: [authenticateChildrenGuard] 
  },

  { path: 'giving-to-fundraiser', component: GivingtofundraiserComponent },
  { path: 'giving-to-cause', component: GivingtocauseComponent },
  { path: 'home', component: HomeComponent },
];
