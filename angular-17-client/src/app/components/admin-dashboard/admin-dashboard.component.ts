import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h1>Admin Command Center</h1>
        <p>Monitor platform activity and data entries.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ courses.length }}</span>
          <span class="stat-label">Total Courses</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ publishedCount }}</span>
          <span class="stat-label">Published</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>

      <div class="data-section" style="margin-top: 3rem;">
        <h3>Platform Data Overview</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let course of courses">
                <td>{{ course.title }}</td>
                <td>{{ course.category }}</td>
                <td>{{ course.level }}</td>
                <td>
                  <span [class]="course.published ? 'status-published' : 'status-pending'">
                    {{ course.published ? 'Live' : 'Draft' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="data-section" style="margin-top: 3rem;">
        <h3>User Access & Activity</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.lastLogin ? (user.lastLogin | date:'medium') : 'Never' }}</td>
                <td>
                  <button (click)="deleteUser(user.id)" class="btn-delete" title="Delete User Account">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; }
    .admin-header { margin-bottom: 3rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
    .stat-card { background: var(--bg-card); padding: 2rem; border-radius: 20px; border: 1px solid var(--border); text-align: center; }
    .stat-value { display: block; font-size: 2.5rem; font-weight: 700; color: var(--primary); }
    .stat-label { color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
    .table-container { background: var(--bg-card); border-radius: 20px; border: 1px solid var(--border); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 1.5rem; background: rgba(255,255,255,0.05); color: var(--text-muted); font-weight: 500; }
    td { padding: 1.2rem 1.5rem; border-top: 1px solid var(--border); vertical-align: middle; }
    .status-published { color: #10b981; font-weight: 600; }
    .status-pending { color: var(--warning); font-weight: 600; }
    .btn-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; transition: 0.3s; }
    .btn-delete:hover { background: #ef4444; color: white; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  courses: Course[] = [];
  users: any[] = [];
  publishedCount = 0;
  pendingCount = 0;

  constructor(
    private courseService: CourseService, 
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Simple security check: Only allow access if user is logged in
    if (!this.authService.isLoggedIn()) {
      alert("Unauthorized Access! Please log in first.");
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData(): void {
    this.courseService.getAll().subscribe(data => {
      this.courses = data || [];
      this.publishedCount = this.courses.filter(c => c.published).length;
      this.pendingCount = this.courses.length - this.publishedCount;
    });

    this.http.get<any[]>('http://localhost:8080/api/auth/users').subscribe(data => {
      this.users = data || [];
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to permanently delete this user account?')) {
      this.http.delete(`http://localhost:8080/api/auth/users/${id}`).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.loadData();
        },
        error: () => alert('Error deleting user.')
      });
    }
  }
}
