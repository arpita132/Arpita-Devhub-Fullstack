import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/courses']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login({ email, password }).subscribe({
      next: data => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/courses']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed. Please check your credentials.';
        this.isLoginFailed = true;
      }
    });
  }
}
