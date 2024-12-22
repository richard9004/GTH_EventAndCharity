import { Component } from '@angular/core';
import CustomerService from '../../services/customer.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent {
carForm: FormGroup; // Reactive form group
imagePreview: string | null = null;
selectedFile: File|null;
 constructor(private service:CustomerService, private router:Router,  private fb: FormBuilder){} 
// List of car brands

 listOfBrands = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Hyundai",
  "Kia",
  "Nissan",
  "Volkswagen",
  "Audi",
  "Tesla",
  "Lexus",
  "Mazda",
  "Jeep"
];

// List of fuel types
 listOfType = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "CNG (Compressed Natural Gas)",
  "LPG (Liquefied Petroleum Gas)"
];

// List of car colors
 listOfColors = [
  "Red",
  "Blue",
  "Black",
  "White",
  "Silver",
  "Grey",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Purple",
  "Pink"
];

// List of car transmission types
 listOfTransmission = [
  "Automatic",
  "Manual",
  "CVT (Continuously Variable Transmission)",
  "Semi-Automatic",
  "Dual-Clutch"
];


ngOnInit() {
  // Initialize the form with the `FormBuilder`
  this.carForm = this.fb.group({
    brand: [null, Validators.required],
    type: [null, Validators.required],
    color: [null, Validators.required],
    transmission: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(1)]],
    description: [null, Validators.maxLength(500)],
    year:[null, Validators.required],
    name:[null, Validators.required],
  });
}

saveCarForm(){
  console.log(this.carForm.value);
  console.log(this.selectedFile);

  const formData: FormData = new FormData();
  formData.append("img", this.selectedFile);
  formData.append("brand", this.carForm.get("brand").value);
  formData.append("name", this.carForm.get("name").value);
  formData.append("type", this.carForm.get("type").value);
  formData.append("color", this.carForm.get("color").value);
  formData.append("year", this.carForm.get("year").value);
  formData.append("transmission", this.carForm.get("transmission").value);
  formData.append("description", this.carForm.get("description").value);
  formData.append("price", this.carForm.get("price").value);
  formData.append("userId", StorageService.getUserId());

  this.service.postCar(formData).subscribe((res)=>{
     console.log(res);
     this.router.navigateByUrl("/customer/dashboard");
  }, error => {
      console.log("Something Went Wrong");
  });
}

onImageSelected(event:any){
    this.selectedFile = (event.target as HTMLInputElement).files?.[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Save the preview URL
      };
      reader.readAsDataURL(this.selectedFile);
    }
}


}
