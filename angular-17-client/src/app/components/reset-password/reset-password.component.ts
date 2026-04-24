import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo-icon">AD</div>
          <h2>Reset Password</h2>
          <p>Enter your email and we'll send you an OTP.</p>
        </div>
        
        <form *ngIf="!submitted" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="name@example.com">
          </div>
          <button class="btn btn-primary btn-block" style="margin-top: 1rem;" [disabled]="loading">
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>
          <div class="alert alert-danger" *ngIf="error" style="margin-top: 1rem; color: var(--danger);">{{ error }}</div>
        </form>

        <div *ngIf="submitted" class="success-message">
          <h3>🎉 Link Sent!</h3>
          <p>Please check your email for the verification code.</p>
          <button class="btn btn-primary btn-block" routerLink="/login" style="margin-top: 1.5rem;">Back to Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
    .auth-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; width: 100%; max-width: 450px; backdrop-filter: var(--glass); }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .btn-block { width: 100%; }
    .success-message { text-align: center; }
  `]
})
export class ResetPasswordComponent {
  email: string = '';
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.http.post('http://localhost:8080/api/auth/forgot-password', { email: this.email }).subscribe({
      next: (res: any) => {
        this.submitted = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error.message || 'An error occurred. Please check your email and try again.';
        this.loading = false;
      }
    });
  }
}
