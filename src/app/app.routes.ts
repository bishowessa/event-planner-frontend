import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { Landingcomponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { MainLayoutComponent } from './layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Landingcomponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // App routes wrapped in Main Layout
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Public
      { path: 'events/create', component: CreateEventComponent, canActivate: [AuthGuard] }, // Private
      { path: 'events/:id', component: EventDetailsComponent } // Public
    ]
  },

  // Wildcard route
  { path: '**', redirectTo: 'app/dashboard', pathMatch: 'full' }
];