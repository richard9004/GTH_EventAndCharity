import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router  } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router){}
}
