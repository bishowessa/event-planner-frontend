import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- ADD RouterLink
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // <-- ADD RouterLink
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']); // Go to login after success
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }
}