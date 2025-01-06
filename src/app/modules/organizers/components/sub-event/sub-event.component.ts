import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { TicketComponent } from '../ticket/ticket.component';
import { SponsorsComponent } from '../sponsors/sponsors.component';
@Component({
  selector: 'app-sub-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TicketComponent, SponsorsComponent],
  templateUrl: './sub-event.component.html',
  styleUrls: ['./sub-event.component.css']
})
export class SubEventComponent {
  @Input() subEvent: any; // Pass subEvent as a FormGroup from the parent component
  @Input() subEventIndex: number;  // The index of the sub-event passed from the parent
  @Output() removeSubEvent = new EventEmitter<void>(); // Event to remove sub-event

  constructor(private fb: FormBuilder) {}

  remove() {
    this.removeSubEvent.emit();
  }

  removeTicket(index: number) {
    this.tickets.removeAt(index);  // Remove the ticket from the FormArray at the specified index
  }

 

  // Get the 'tickets' FormArray from the subEvent FormGroup
  get tickets(): FormArray {
    return this.subEvent.get('tickets') as FormArray;
  }


  
   // Add a free ticket
   addFreeTicket() {
    this.addTicket("free");
  }

  // Add a paid ticket
  addPaidTicket() {
    this.addTicket("paid");
  }

  // Add a donation ticket
  addDonationTicket() {
    this.addTicket("donation");
  }

// Generic method to add a ticket
addTicket(ticketType: any) {
  const ticketForm = this.fb.group({
    title: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(0)]],
    saleEndDate: ['', Validators.required],
    minTicketCount: ['', [Validators.required, Validators.min(1)]],
    maxTicketCount: ['', [Validators.required, Validators.min(1)]],
    type: [ticketType], // Add ticket type
  });

  this.tickets.push(ticketForm); // Add the ticket form to the tickets array
}

get sponsors(): FormArray {
  return this.subEvent.get('sponsors') as FormArray;
}

addSponsor(sponsorData: any) {
  const sponsorForm = this.fb.group({
    text: [sponsorData.text, Validators.required],
    link: [sponsorData.link, [Validators.required, Validators.pattern('https?://.+')]],
    image: [sponsorData.image, Validators.required],
  });

  this.sponsors.push(sponsorForm); // Add the sponsor data to the sponsors FormArray
}

removeSponsor(index: number): void {
  this.sponsors.removeAt(index); // Remove the sponsor at the specified index
}

 



  
  

  
}
