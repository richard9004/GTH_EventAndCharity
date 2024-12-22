import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  
  profileImg: File|null;

  profileImagePreview: string | ArrayBuffer | null = null;

  errorMessage: string = '';

  constructor(private service:AuthService, private router:Router,  private fb: FormBuilder){} 

  // Scroll to error div
  scrollToError() {
    const errorDiv = document.getElementById('userRegistrationDiv');
    if (errorDiv) {
     
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  

  signUpForm : FormGroup
  ngOnInit() {
    // Initialize the form with the `FormBuilder`
    this.signUpForm = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      preferredName: new FormControl(null, Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.confirmationValidator.bind(this),
      ]),
      phone: new FormControl(''),
      streetAddress: new FormControl(''),
      suburb: new FormControl(''),
      city: new FormControl(''),
      postcode: new FormControl(''),
      country: new FormControl('New Zealand'),
      birthDate: new FormControl(''),
      profileImage: new FormControl(''),
      terms: new FormControl(false, Validators.requiredTrue)
    });
  }
  
   // Custom Validator Function
 confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  if (!control.value) {
    return { require: true };
  } else if (control.value !== this.signUpForm.controls["password"].value) {
    return { confirm: true, error: true };
  }
  return {};
};

signup(): void {
  // Mark all controls as touched to trigger validation
  this.markAllAsTouched();

  // Check if the form is valid
  if (this.signUpForm.valid) {
    // Create a new FormData object to send the form data
    const formData = new FormData();

    // Append form values to the FormData object
    formData.append('firstName', this.signUpForm.get('firstName')?.value);
    formData.append('lastName', this.signUpForm.get('lastName')?.value);
    formData.append('preferredName', this.signUpForm.get('preferredName')?.value);
    formData.append('email', this.signUpForm.get('email')?.value);
    formData.append('password', this.signUpForm.get('password')?.value);
    formData.append('confirmPassword', this.signUpForm.get('confirmPassword')?.value);
    formData.append('phone', this.signUpForm.get('phone')?.value);
    formData.append('streetAddress', this.signUpForm.get('streetAddress')?.value);
    formData.append('suburb', this.signUpForm.get('suburb')?.value);
    formData.append('city', this.signUpForm.get('city')?.value);
    formData.append('postcode', this.signUpForm.get('postcode')?.value);
    formData.append('country', this.signUpForm.get('country')?.value);
    formData.append('birthDate', this.signUpForm.get('birthDate')?.value);
    formData.append('profileImage', this.profileImg);
    formData.append('terms', this.signUpForm.get('terms')?.value.toString());
// this.signUpForm.get('profileImage')?.value
    // Call the service method to submit the form data
    this.service.registeruser(formData).subscribe((response) => {
      this.errorMessage = ''; // Clear error
      this.router.navigate(['/login'], {
        queryParams: { successMessage: 'User created successfully! Please login.' },
      });
    }, (error) => {
      console.error('Error during registration:', error);

     // Set error message based on response
     if (error.status === 400) {
      this.errorMessage = 'Bad Request: Please check the provided data.';
    } else if (error.status === 406) {
      this.errorMessage = 'Conflict: User with this email already exists.';
    } else if (error.status === 500) {
      this.errorMessage = 'Internal Server Error: Something went wrong on the server.';
    } else {
      this.errorMessage = 'Unexpected error occurred. Please try again.';
    }
   
  
     if (error.error && error.error.message) {
       this.errorMessage = error.error.message;
     }

     this.scrollToError();
    });
  } else {
    this.debugFormControls();
    console.log('Form is invalid');
  }
}

   // Method to mark all form controls as touched
   markAllAsTouched() {
    Object.values(this.signUpForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Helper Method to Debug Form Controls
private debugFormControls(): void {
  const controls = this.signUpForm.controls;

  Object.keys(controls).forEach((key) => {
    const control = controls[key];
    console.log(`${key}:`, {
      value: control.value,
      valid: control.valid,
      touched: control.touched,
      errors: control.errors,
    });
  });
}

onProfileImageSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    this.profileImg = file;
    // Check file size (500KB)
    if (file.size > 500 * 1024) {
      this.signUpForm.get('profileImage')?.setErrors({ maxSize: true });
     // this.logoPreview = null; // Clear preview
      return;
    }

    // Clear any previous errors
    this.signUpForm.get('profileImage')?.setErrors(null);

    // Generate preview
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    // Set form control value (optional, if needed for backend)
    this.signUpForm.get('profileImage')?.setValue(file);
  }
}

}
