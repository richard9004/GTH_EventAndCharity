import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-sub-event',
  templateUrl: './sub-event.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./sub-event.component.css']
})
export class SubEventComponent {
  @Input() subEventFormGroup: FormGroup;  // This gets the form group from the parent
  @Output() removeSubEvent = new EventEmitter<void>();  // This will emit an event to remove the sub-event
  
  onRemove() {
    this.removeSubEvent.emit();  // Remove the sub-event when the button is clicked
  }
}
