import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { SubEventComponent } from '../sub-event/sub-event.component';

@Component({
  selector: 'app-create-new-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SubEventComponent],
  templateUrl: './create-new-event.component.html',
  styleUrl: './create-new-event.component.css'
})

export class CreateNewEventComponent {

   constructor(private router:Router,  private fb: FormBuilder){} 

   private subEventCounter = 1;
   

   createEventForm : FormGroup
   ngOnInit() {
    // Initialize the form with the `FormBuilder`
    this.createEventForm = this.fb.group({
        event_title: new FormControl(null, Validators.required),
        location: new FormControl(null),
        location_map: new FormControl(null),
        start_datetime: new FormControl(null, Validators.required),
        end_datetime: new FormControl(null, Validators.required),
        banner_image: new FormControl(null, Validators.required),
        event_description: new FormControl(null, Validators.required),
        organization_description: new FormControl(null, Validators.required),
        receipt_text_email: new FormControl(null),
        ticket_terms: new FormControl(null),
        special_instructions: new FormControl(null),
        event_category: new FormControl(null, Validators.required),
        private_page: new FormControl(false),
        public_page: new FormControl(false),
        remaining_tickets: new FormControl(null),
        sponsors_signup: new FormControl(false),
        ticked_event: new FormControl(false),
        donate_to_event: new FormControl(false),
        default_donation_receipt: new FormControl(false),
        donation_receipt_text: new FormControl(null),
        subEvents: this.fb.array([])

    });

    // Subscribe to `default_donation_receipt` value changes
    this.createEventForm.get('default_donation_receipt')?.valueChanges.subscribe((isChecked) => {
      const donationTextControl = this.createEventForm.get('donation_receipt_text');
      if (isChecked) {
        donationTextControl?.setValidators(Validators.required);
      } else {
        donationTextControl?.clearValidators();
      }
      donationTextControl?.updateValueAndValidity();
    });
}

get subEvents(): FormArray {
  return this.createEventForm.get('subEvents') as FormArray;
}

addSubEvent() {
  const subEvent = this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: ['', Validators.required],
    fundraiserAllowed: [false],  // Default value for checkbox
    verifyFundraiser: [false],   // Default value for checkbox
    becomeFundraiser: [false],   // Default value for checkbox
    showFundraiser: [false],      // Default value for checkbox
    tickets: this.fb.array([]),  // Initialize an empty tickets FormArray
    sponsors: this.fb.array([]),
  });

  this.subEvents.push(subEvent); // Add the new sub-event to the FormArray
}

removeSubEvent(index: number) {
  this.subEvents.removeAt(index);
}

 // Method to mark all form controls as touched
//  markAllAsTouched() {
//   Object.values(this.createEventForm.controls).forEach(control => {
//     control.markAsTouched();
//   });
// }

markAllAsTouched() {
  // Mark parent form controls as touched
  this.createEventForm.markAllAsTouched();

  // Now, iterate over sub-events (FormArray) and mark their controls as touched
  this.subEvents.controls.forEach(subEvent => {
    subEvent.markAllAsTouched();
  });
}




onSubmit(){
   // Get the main event data
   const eventData = this.createEventForm.value;
   console.log(eventData);
// Mark all controls as touched to trigger validation
this.markAllAsTouched();
}


  
}
