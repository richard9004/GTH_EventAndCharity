import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit() {

    this.titleService.setTitle('GivingToHelp - User Dashboard');
  
    this.meta.addTag({ name: 'title', content: 'GivingToHelp - User Dashboard' });

    
    this.meta.addTag({ name: 'description', content: 'Welcome to your dashbord' });
  }
}
