import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {  Landingcomponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: Landingcomponent }, // <-- NEW DEFAULT
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  // Wildcard route
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];