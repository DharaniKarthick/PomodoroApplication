import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  username!: string;
  password!: string;
  constructor(private authService: AuthService, private router: Router) { }

  signup(): void {
    this.authService.signup(this.username, this.password)
      .subscribe(
        (response: any) => {
          console.log('User Created');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('User creation failed:', error);
          // Handle login failure (e.g., display error message)
        }
      );
  }

  navigatetoLogin() {
    this.router.navigate(['/login']);
  }

}
