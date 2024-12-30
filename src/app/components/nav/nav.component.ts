// import { Component } from '@angular/core';
// import { RouterOutlet, RouterModule, Router  } from '@angular/router';
// import { StorageService } from '../../auth/services/storage/storage.service';
// import { CommonModule } from '@angular/common'; // Import CommonModule


// @Component({
//   selector: 'app-nav',
//   standalone: true,
//   imports: [RouterModule,CommonModule],
//   templateUrl: './nav.component.html',
//   styleUrl: './nav.component.css'
// })
// export class NavComponent {
//   isOrganizerLoggedIn: boolean = false;
//   isUserLoggedIn: boolean = false;
//   constructor(private router: Router){}

//   ngOnInit(): void {
//     this.isOrganizerLoggedIn = StorageService.isOrganizerLoggedIn();
//     this.isUserLoggedIn = StorageService.isUserLoggedIn();
  
//   }

//   onSignInClick(): void {
//     if (!this.isOrganizerLoggedIn && !this.isUserLoggedIn) {
//       this.router.navigateByUrl('/login');  // Or redirect to any login route you have
//     }
//   }
// }




import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterModule, Router  } from '@angular/router';
import { StorageService } from '../../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Corrected to styleUrls
})
export class NavComponent {
  isLoggedIn: boolean = false;
  isOrganizerLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  userName: string = '';
  
 private loginStatusSubscription: Subscription;
 
  constructor(private router: Router,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.loginStatusSubscription = StorageService.loggedInSubject$.subscribe((status) => {
      // Set login status
      this.isLoggedIn = status;

      // Check user and organizer roles
      this.isUserLoggedIn = StorageService.isUserLoggedIn();
      this.isOrganizerLoggedIn = StorageService.isOrganizerLoggedIn();
    });


    // Check if the organizer or user is logged in
    this.isOrganizerLoggedIn = StorageService.isOrganizerLoggedIn();
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
    const user = StorageService.getUser();
    if (user) {
      this.userName = user.name || 'User'; // Assuming the user has a 'name' property
    }
  }

  // Redirect user to login page if not logged in
  onSignInClick(): void {
    if (!this.isOrganizerLoggedIn && !this.isUserLoggedIn) {
      this.router.navigate(['/login']);  // Or redirect to any login route you have
    }
  }

  // Sign out the user
  onSignOutClick(): void {
    StorageService.signOut();
    StorageService.loggedInSubject$.next(false);
    this.isOrganizerLoggedIn = false;
    this.isUserLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/home']);
  }
}
