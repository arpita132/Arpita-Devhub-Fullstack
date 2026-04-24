import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses?: Course[];
  currentCourse: Course = {};
  currentIndex = -1;
  title = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.retrieveCourses();
  }

  retrieveCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveCourses();
    this.currentCourse = {};
    this.currentIndex = -1;
  }

  setActiveCourse(course: Course, index: number): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }

  removeAllCourses(): void {
    this.courseService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentCourse = {};
    this.currentIndex = -1;

    this.courseService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
