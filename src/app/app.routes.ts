import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { GivingtocauseComponent } from './components/givingtocause/givingtocause.component';
import { GivingtofundraiserComponent } from './components/givingtofundraiser/givingtofundraiser.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './auth/auth-components/user-registration/user-registration.component';
import { OrganizerRegistrationComponent } from './auth/auth-components/organizer-registration/organizer-registration.component';
import { OrganizationThankYouComponent } from './auth/auth-components/organization-thank-you/organization-thank-you.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Default route
    { path: 'register', component: SignupComponent }, // Route for the "about" page
    { path: 'user-registration', component: UserRegistrationComponent }, 
    { path: 'organizer-thank-you', component: OrganizationThankYouComponent }, 
    { path: 'organizer-registration', component: OrganizerRegistrationComponent }, 
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
    { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
    { path: 'user', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
    { path: 'organizers', loadChildren: () => import('./modules/organizers/organizers.module').then(m => m.OrganizersModule) },
    { path: 'giving-to-cause', component: GivingtocauseComponent }, 
    { path: 'giving-to-fundraiser', component: GivingtofundraiserComponent }, 
    { path: 'home', component: HomeComponent }, 


  ];
