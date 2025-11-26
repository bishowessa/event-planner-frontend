import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.errorMessage = null;
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = err.error?.error || 'An unexpected error occurred';
      }
    });
  }
}