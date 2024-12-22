import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule, NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private router: Router){}

  title = 'seller_car';

  // isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  // isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name == "NavigationEnd"){
        // alert('In this');
        // this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        // this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl("/login");
  }

 
}
