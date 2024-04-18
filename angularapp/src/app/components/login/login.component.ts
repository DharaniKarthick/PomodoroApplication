// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response: any) => {
          console.log('Login successful');
          localStorage.setItem('jwtToken', response.token);
          this.router.navigate(['/task', response.userId]);
        },
        error => {
          console.error('Login failed:', error);
          // Handle login failure (e.g., display error message)
        }
      );
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
