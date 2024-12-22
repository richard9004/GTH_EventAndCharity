import { Component } from '@angular/core';
import CustomerService from '../../services/customer.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
   
  constructor(private service:CustomerService){}
  
  cars: any = [];
  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.service.getAllCars().subscribe(res => {
       this.cars = res;
       console.log(this.cars);
    }, error => {
      console.error('Error occurred:', error);
        
      if (error.status == 401) {
          // Handle token expired or invalid case
          console.log('401: ' + error.error);
          // Optionally redirect to login page or perform other actions
      } else {
          // Handle other errors (like network issues)
          console.log('403: ' + error.message);
      }
    });
}

getCarImage(base64String: string): string {
  // If base64String is null or empty, use a placeholder image
  if (!base64String) {
    return 'https://via.placeholder.com/200x150?text=No+Image';
  }

  // Prefix the Base64 string if it doesn’t already include the MIME type
  const base64Prefix = 'data:image/jpeg;base64,';
  if (!base64String.startsWith('data:image')) {
    return base64Prefix + base64String;
  }

  return base64String; // If already prefixed, return as-is
}

}
