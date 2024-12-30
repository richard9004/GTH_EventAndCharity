import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-new-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-new-event.component.html',
  styleUrl: './create-new-event.component.css'
})

export class CreateNewEventComponent {

   constructor(private router:Router,  private fb: FormBuilder){} 

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

  // Getter for sub-events
  get subEvents() {
    return (this.createEventForm.get('subEvents') as FormArray);
  }

   // Add a new sub-event
   addSubEvent() {
    const subEventGroup = this.fb.group({
      sub_event_title: new FormControl(null, Validators.required),
      sub_event_start_datetime: new FormControl(null, Validators.required),
      sub_event_end_datetime: new FormControl(null, Validators.required),
      sub_event_description: new FormControl(null, Validators.required)
    });
    this.subEvents.push(subEventGroup);
  }

  // Remove a sub-event
  removeSubEvent(index: number) {
    this.subEvents.removeAt(index);
  }

 // Method to mark all form controls as touched
 markAllAsTouched() {
  Object.values(this.createEventForm.controls).forEach(control => {
    control.markAsTouched();
  });
}




onSubmit(){
// Mark all controls as touched to trigger validation
this.markAllAsTouched();
}


  
}
