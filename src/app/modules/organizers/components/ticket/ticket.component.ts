import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  standalone: true,
  styleUrls: ['./ticket.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TicketComponent {
  @Input() ticketForm: any; // Accept FormGroup from parent
  @Input() type: any; // Accept ticket type
  @Output() removeTicket = new EventEmitter<void>(); // Event to notify parent to remove the ticket

  // Emit the remove event when the "Remove" button is clicked
  onRemoveTicket() {
    this.removeTicket.emit();
  }
}