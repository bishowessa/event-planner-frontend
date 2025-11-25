import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        if (response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/app/dashboard']);
        } else {
          console.error('No token in response');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}