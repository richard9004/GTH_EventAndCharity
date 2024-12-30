import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import Chart from 'chart.js/auto';

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

    this.initializeChart();

    this.initializeTicketsPerEventChart();
    this.initializeTotalTicketsSoldChart();
    this.initializeSponsorsPerEventChart();
    this.initializeTotalSponsorsOverTimeChart();
    this.initializeFundraisersDonationsChart();

    this.titleService.setTitle('GivingToHelp - Organizer Dashboard');
  
    this.meta.addTag({ name: 'title', content: 'GivingToHelp - Organizer Dashboard' });

    
    this.meta.addTag({ name: 'description', content: 'Organiozer Dashboard, View total events, fundraisers and more' });
  }


  initializeChart(): void {
    const ctx = document.getElementById('eventsOverviewChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Active Events', 'Closed Events'],
        datasets: [{
          label: 'Event Status',
          data: [45, 75], // Replace with dynamic data if required
          backgroundColor: ['#28a745', '#6c757d'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }


  // Bar Chart: Tickets Sold Per Event
  initializeTicketsPerEventChart(): void {
    const ctx = document.getElementById('ticketsPerEventChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'], // Replace with event names dynamically
        datasets: [{
          label: 'Tickets Sold',
          data: [120, 150, 180, 220, 170], // Replace with actual ticket sales data
          backgroundColor: '#007bff',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tickets Sold'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Events'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Line Chart: Total Tickets Sold Over Time
  initializeTotalTicketsSoldChart(): void {
    const ctx = document.getElementById('totalTicketsSoldChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Replace with months or time intervals
        datasets: [{
          label: 'Total Tickets Sold',
          data: [500, 750, 1200, 1600, 2100, 2700], // Replace with cumulative ticket sales data
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: '#28a745',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tickets Sold'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }


  // Sponsors Per Event Chart
initializeSponsorsPerEventChart(): void {
  const ctx = document.getElementById('sponsorsPerEventChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Event A', 'Event B', 'Event C', 'Event D'], // Replace dynamically
      datasets: [{
        label: 'Sponsors',
        data: [5, 8, 3, 10], // Replace dynamically
        backgroundColor: '#ffc107',
        borderColor: '#ff9800',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Sponsors'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Events'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Total Sponsors Over Time Chart
initializeTotalSponsorsOverTimeChart(): void {
  const ctx = document.getElementById('totalSponsorsOverTimeChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Replace dynamically
      datasets: [{
        label: 'Total Sponsors',
        data: [3, 5, 10, 15, 20], // Replace dynamically
        backgroundColor: '#17a2b8',
        borderColor: '#138496',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sponsors Added'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}


initializeFundraisersDonationsChart(): void {
  const ctx = document.getElementById('fundraisersDonationsChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Fundraiser A', 'Fundraiser B', 'Fundraiser C'], // Replace dynamically
      datasets: [
        {
          label: 'Event 1',
          data: [300, 500, 700], // Replace dynamically
          backgroundColor: '#007bff'
        },
        {
          label: 'Event 2',
          data: [200, 400, 600], // Replace dynamically
          backgroundColor: '#28a745'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Donations Collected'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fundraisers'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}




  

}
