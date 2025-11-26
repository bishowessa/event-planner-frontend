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
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        if (response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/app/dashboard']);
        } else {
          this.errorMessage = 'No token received from server';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error?.error || 'An unexpected error occurred';
      }
    });
  }
}