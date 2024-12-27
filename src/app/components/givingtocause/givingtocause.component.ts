import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-givingtocause',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './givingtocause.component.html',
  styleUrl: './givingtocause.component.css'
})
export class GivingtocauseComponent {

}
