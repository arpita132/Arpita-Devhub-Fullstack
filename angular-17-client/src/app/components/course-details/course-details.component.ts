import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCourse: Course = {
    title: '',
    description: '',
    category: '',
    level: '',
    published: false
  };

  message = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCourse(this.route.snapshot.params['id']);
    }
  }

  getCourse(id: string): void {
    this.courseService.get(id).subscribe({
      next: (data) => {
        this.currentCourse = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCourse.title,
      description: this.currentCourse.description,
      category: this.currentCourse.category,
      level: this.currentCourse.level,
      published: status
    };

    this.message = '';

    this.courseService.update(this.currentCourse.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentCourse.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateCourse(): void {
    this.message = '';

    this.courseService
      .update(this.currentCourse.id, this.currentCourse)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This course was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCourse(): void {
    this.courseService.delete(this.currentCourse.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/courses']);
      },
      error: (e) => console.error(e)
    });
  }
}
