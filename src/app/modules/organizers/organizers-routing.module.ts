import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { CreateNewEventComponent } from './components/create-new-event/create-new-event.component';

const routes: Routes = [
  {path:"dashboard", component: OrganizerDashboardComponent},
  {path:"create-new-event", component: CreateNewEventComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizersRoutingModule { }
