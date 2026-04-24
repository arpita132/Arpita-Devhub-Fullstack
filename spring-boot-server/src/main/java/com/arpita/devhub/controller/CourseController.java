package com.arpita.devhub.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arpita.devhub.model.Course;
import com.arpita.devhub.repository.CourseRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CourseController {

	@Autowired
	CourseRepository courseRepository;

	@GetMapping("/courses")
	public ResponseEntity<List<Course>> getAllCourses(@RequestParam(required = false) String title) {
		try {
			List<Course> courses = new ArrayList<Course>();

			if (title == null)
				courseRepository.findAll().forEach(courses::add);
			else
				courseRepository.findByTitleContainingIgnoreCase(title).forEach(courses::add);

			if (courses.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(courses, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/courses/{id}")
	public ResponseEntity<Course> getCourseById(@PathVariable("id") long id) {
		Optional<Course> courseData = courseRepository.findById(id);

		if (courseData.isPresent()) {
			return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/courses")
	public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course) {
		try {
			Course _course = courseRepository
					.save(new Course(course.getTitle(), course.getDescription(), course.getCategory(), course.getLevel(), false));
			return new ResponseEntity<>(_course, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable("id") long id, @RequestBody Course course) {
		Optional<Course> courseData = courseRepository.findById(id);

		if (courseData.isPresent()) {
			Course _course = courseData.get();
			_course.setTitle(course.getTitle());
			_course.setDescription(course.getDescription());
			_course.setCategory(course.getCategory());
			_course.setLevel(course.getLevel());
			_course.setPublished(course.isPublished());
			return new ResponseEntity<>(courseRepository.save(_course), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/courses/{id}")
	public ResponseEntity<HttpStatus> deleteCourse(@PathVariable("id") long id) {
		try {
			courseRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/courses")
	public ResponseEntity<HttpStatus> deleteAllCourses() {
		try {
			courseRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/courses/published")
	public ResponseEntity<List<Course>> findByPublished() {
		try {
			List<Course> courses = courseRepository.findByPublished(true);

			if (courses.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(courses, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
