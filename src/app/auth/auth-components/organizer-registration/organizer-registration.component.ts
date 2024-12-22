import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-organizer-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './organizer-registration.component.html',
  styleUrl: './organizer-registration.component.css'
})
export class OrganizerRegistrationComponent {
  filePreview: { type: string, src: string | SafeResourceUrl } | null = null; // Store file type and preview source
  filePreviewPayment: { type: string, src: string | SafeResourceUrl } | null = null;
  logoPreview: string | ArrayBuffer | null = null;

  logoFile: File|null;
  statementFile1: File|null;
  statementFile2: File|null;

  constructor(private service:AuthService, private router:Router,  private fb: FormBuilder, private sanitizer: DomSanitizer){} 

  registrationForm : FormGroup;
  
  ngOnInit() {
    // Initialize the form with the `FormBuilder`
    
    this.registrationForm = this.fb.group({
      // Organization Details
      orgName: ['', Validators.required],
      irdNumber: [''],
      orgType: ['', Validators.required],
      charityRegistration: ['', Validators.required],
      doneeStatus: ['', Validators.required],
      preferredOrgName: ['', Validators.required],
      overview: [''],
      causeAreas: this.fb.group({
        agedCare: [false],
        aids: [false],
        babies: [false],
        cancer: [false],
        youth: [false],
        sports: [false],
        foodRescue: [false],
        women: [false],
        school: [false],
        humanRights: [false],
        protection: [false],
        drugsAlcohol: [false],
        health: [false],
        education: [false],
        animalWelfare: [false],
        religious: [false],
        cultural: [false],
        ethicActivities: [false],
        
      }),
      logo: [null, [Validators.required, this.fileSizeValidator(500)]],
    
      // Registered Address
      streetAddress: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['New Zealand', Validators.required],
    
      // Administrative Contact
      adminPosition: ['', Validators.required],
      adminSalutation: ['', Validators.required],
      adminFirstName: ['', Validators.required],
      adminLastName: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPhone: [''],
    
      // Financial Contact
      financePosition: ['', Validators.required],
      financeFirstName: ['', Validators.required],
      financeLastName: ['', Validators.required],
      financeEmail: ['', [Validators.required, Validators.email]],
      financePhone: [''],
      
      // Bank Details for Settlement
      settlementBankName: ['', Validators.required],
      settlementAccountNumber: ['', Validators.required],
      settlementBankStatement: [null, Validators.required],
    
      // Same as Above for Payments
      sameAsAbove: [false],
    
      // Bank Details for Payments to GivingToHelp
      paymentBankName: ['', Validators.required],
      paymentAccountNumber: ['', Validators.required],
      paymentBankStatement: [null, Validators.required], 
     
      // Terms and Conditions
      terms: [false, Validators.requiredTrue],
    });

    this.registrationForm.get('sameAsAbove')?.disable();  // Disable initially

    this.registrationForm.get('settlementBankName')?.valueChanges.subscribe(() => {
      this.updateSameAsAboveState(); // Check the validity of the form controls
    });
  
    this.registrationForm.get('settlementAccountNumber')?.valueChanges.subscribe(() => {
      this.updateSameAsAboveState(); // Check the validity of the form controls
    });
    
  }


   // Handle file input change event
   onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.statementFile1 = file;
      // For image preview
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = { type: file.type, src: reader.result as string };
        };
        reader.readAsDataURL(file);
      }
      
     // For PDF preview
     else if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        // Use DomSanitizer to safely bind the PDF preview URL
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        this.filePreview = { type: file.type, src: safeUrl };
      };
      reader.readAsDataURL(file);
    }
    }
  }

  updateSameAsAboveState() {
    const bankNameValid = this.registrationForm.get('settlementBankName')?.valid;
    const accountNumberValid = this.registrationForm.get('settlementAccountNumber')?.valid;
  
    // Enable the checkbox if both fields are valid, otherwise disable it
    if (bankNameValid && accountNumberValid) {
      this.registrationForm.get('sameAsAbove')?.enable();  // Enable checkbox when both fields are valid
    } else {
      this.registrationForm.get('sameAsAbove')?.disable();  // Disable checkbox when either field is invalid
    }
  }

  // Custom file size validator (500 KB limit)
  fileSizeValidator(maxSize: number) {
    return (control: any) => {
      const file = control.value;
      if (file) {
        const sizeInKB = file.size / 1024;
        if (sizeInKB > maxSize) {
          return { maxSize: true }; // Validation error if file is too large
        }
      }
      return null; // No validation error
    };
  }

  // Form submission handler
  onSubmit(): void {
    this.markAllAsTouched();

    if (this.registrationForm.valid) {
       // Create a new FormData object to send the data
    const formData = new FormData();

     // Append form values individually
     formData.append('orgName', this.registrationForm.get('orgName')?.value);
     formData.append('irdNumber', this.registrationForm.get('irdNumber')?.value);
     formData.append('orgType', this.registrationForm.get('orgType')?.value);
     formData.append('charityRegistration', this.registrationForm.get('charityRegistration')?.value);
     formData.append('doneeStatus', this.registrationForm.get('doneeStatus')?.value);
     formData.append('preferredOrgName', this.registrationForm.get('preferredOrgName')?.value);
     formData.append('overview', this.registrationForm.get('overview')?.value);
     formData.append('causeAreas', JSON.stringify(this.registrationForm.get('causeAreas')?.value)); // Cause areas as JSON string
     formData.append('streetAddress', this.registrationForm.get('streetAddress')?.value);
     formData.append('suburb', this.registrationForm.get('suburb')?.value);
     formData.append('city', this.registrationForm.get('city')?.value);
     formData.append('postalCode', this.registrationForm.get('postalCode')?.value);
     formData.append('country', this.registrationForm.get('country')?.value);
     formData.append('adminPosition', this.registrationForm.get('adminPosition')?.value);
     formData.append('adminSalutation', this.registrationForm.get('adminSalutation')?.value);
     formData.append('adminFirstName', this.registrationForm.get('adminFirstName')?.value);
     formData.append('adminLastName', this.registrationForm.get('adminLastName')?.value);
     formData.append('adminEmail', this.registrationForm.get('adminEmail')?.value);
     formData.append('adminPhone', this.registrationForm.get('adminPhone')?.value);
     formData.append('financePosition', this.registrationForm.get('financePosition')?.value);
     formData.append('financeFirstName', this.registrationForm.get('financeFirstName')?.value);
     formData.append('financeLastName', this.registrationForm.get('financeLastName')?.value);
     formData.append('financeEmail', this.registrationForm.get('financeEmail')?.value);
     formData.append('financePhone', this.registrationForm.get('financePhone')?.value);
     formData.append('settlementBankName', this.registrationForm.get('settlementBankName')?.value);
     formData.append('settlementAccountNumber', this.registrationForm.get('settlementAccountNumber')?.value);
     formData.append('sameAsAbove', this.registrationForm.get('sameAsAbove')?.value);
     formData.append('paymentBankName', this.registrationForm.get('paymentBankName')?.value);
     formData.append('paymentAccountNumber', this.registrationForm.get('paymentAccountNumber')?.value);
     formData.append('terms', this.registrationForm.get('terms')?.value ? 'true' : 'false');
     formData.append('logo', this.logoFile);
     formData.append('paymentBankStatement', this.statementFile2);
     formData.append('settlementBankStatement', this.statementFile1);
 

    // Call the service method to submit the form data
    this.service.submitOrhanizerRegistration(formData).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['/organizer-thank-you'], {queryParams: { orgName: response.orgName }});
    });

    } else {
      console.log('Form is invalid');
      this.debugFormControls();
    }
  }

  // Helper Method to Debug Form Controls
private debugFormControls(): void {
  const controls = this.registrationForm.controls;

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

  // Cancel button handler
  onCancel(): void {
    this.registrationForm.reset();
  }

  // This function will be called when the "Same as above" checkbox is clicked
  onSameAsAboveChange() {
    const sameAsAbove = this.registrationForm.get('sameAsAbove')?.value;

    if (sameAsAbove) {
      // If 'Same as above' is checked, copy settlement bank details to payment bank details
      this.copySettlementToPayment();
      // Optionally hide the payment details section (to be handled in HTML)
    } else {
      // If 'Same as above' is unchecked, clear the payment bank fields
      this.clearPaymentFields();
    }
  }

   // Function to copy settlement details to payment fields
   copySettlementToPayment() {
    const settlementBankName = this.registrationForm.get('settlementBankName')?.value;
    const settlementAccountNumber = this.registrationForm.get('settlementAccountNumber')?.value;

    // Set payment fields to match settlement values
    this.registrationForm.get('paymentBankName')?.setValue(settlementBankName);
    this.registrationForm.get('paymentAccountNumber')?.setValue(settlementAccountNumber);
    this.registrationForm.get('paymentBankStatement')?.clearValidators();
    this.registrationForm.get('paymentBankStatement')?.updateValueAndValidity();
    
  }

  // Function to clear payment bank fields
  clearPaymentFields() {
    this.registrationForm.get('paymentBankName')?.setValue('');
    this.registrationForm.get('paymentAccountNumber')?.setValue('');
    this.registrationForm.get('paymentBankStatement')?.setValidators([Validators.required]);
    this.registrationForm.get('paymentBankStatement')?.updateValueAndValidity();
  }

   // Handle file input change event for payment bank statement
   onFileSelectedPayment(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        this.statementFile2 = file;
        reader.onload = () => {
          this.filePreviewPayment = { type: file.type, src: reader.result as string };
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
          this.filePreviewPayment = { type: file.type, src: safeUrl };
        };
        reader.readAsDataURL(file);
      }
    }
  }


  // Method to mark all form controls as touched
  markAllAsTouched() {
    Object.values(this.registrationForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }


  onLogoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.logoFile = file;
      // Check file size (500KB)
      if (file.size > 500 * 1024) {
        this.registrationForm.get('logo')?.setErrors({ maxSize: true });
        this.logoPreview = null; // Clear preview
        return;
      }

      // Clear any previous errors
      this.registrationForm.get('logo')?.setErrors(null);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Set form control value (optional, if needed for backend)
      this.registrationForm.get('logo')?.setValue(file);
    }
  }


  

}
