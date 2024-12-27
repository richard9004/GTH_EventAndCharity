import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.css'
})
export class OrganizerDashboardComponent {

  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit() {

    this.titleService.setTitle('GivingToHelp - Organizer Dashboard');
  
    this.meta.addTag({ name: 'title', content: 'GivingToHelp - Organizer Dashboard' });

    
    this.meta.addTag({ name: 'description', content: 'Organiozer Dashboard, View total events, fundraisers and more' });
  }

}
