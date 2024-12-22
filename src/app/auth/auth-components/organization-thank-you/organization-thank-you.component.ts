import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './organization-thank-you.component.html',
  styleUrl: './organization-thank-you.component.css'
})
export class OrganizationThankYouComponent {
  
  orgName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract orgName from query params
    this.route.queryParams.subscribe(params => {
      this.orgName = params['orgName'] || 'Organization';
    });
  }

}
