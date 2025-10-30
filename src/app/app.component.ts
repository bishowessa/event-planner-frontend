import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']   
})
export class AppComponent { 
  constructor(private auth: AuthService) {}
}