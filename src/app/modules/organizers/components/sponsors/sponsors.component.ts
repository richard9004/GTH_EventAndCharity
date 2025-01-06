import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css'
})
export class SponsorsComponent {
  @Input() sponsorForm: any; // Accept sponsorForm from parent
  @Output() sponsorAdded = new EventEmitter<any>(); // Emit sponsor data to p

  constructor(private fb: FormBuilder) {
    this.sponsorForm = this.fb.group({
      text: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      image: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.sponsorForm.value);
    if (this.sponsorForm.valid) {
      this.sponsorAdded.emit(this.sponsorForm.value); // Emit form data
      this.sponsorForm.reset(); // Reset form after submission
    } else {
      this.sponsorForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}
