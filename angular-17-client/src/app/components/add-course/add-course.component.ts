import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  course: Course = {
    title: '',
    description: '',
    category: '',
    level: '',
    published: false
  };
  submitted = false;
  errors: any = {};

  constructor(private courseService: CourseService) {}

  validate(): boolean {
    this.errors = {};
    if (!this.course.title?.trim()) this.errors.title = true;
    if (!this.course.description?.trim()) this.errors.description = true;
    if (!this.course.category?.trim()) this.errors.category = true;
    if (!this.course.level) this.errors.level = true;
    
    return Object.keys(this.errors).length === 0;
  }

  saveCourse(): void {
    if (!this.validate()) return;

    const data = {
      title: this.course.title,
      description: this.course.description,
      category: this.course.category,
      level: this.course.level
    };

    this.courseService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.launchConfetti();
      },
      error: (e) => console.error(e)
    });
  }

  launchConfetti(): void {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  newCourse(): void {
    this.submitted = false;
    this.course = {
      title: '',
      description: '',
      category: '',
      level: '',
      published: false
    };
    this.errors = {};
  }
}
