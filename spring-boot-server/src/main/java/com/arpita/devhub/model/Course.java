package com.arpita.devhub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "courses")
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@NotBlank(message = "Title is mandatory")
	@Column(name = "title")
	private String title;

	@NotBlank(message = "Description is mandatory")
	@Column(name = "description")
	private String description;

	@NotBlank(message = "Category is mandatory")
	@Column(name = "category")
	private String category;

	@Column(name = "level")
	private String level;

	@Column(name = "published")
	private boolean published;

	public Course() {}

	public Course(String title, String description, String category, String level, boolean published) {
		this.title = title;
		this.description = description;
		this.category = category;
		this.level = level;
		this.published = published;
	}

	// Getters and Setters
	public long getId() { return id; }
	public void setId(long id) { this.id = id; }
	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }
	public String getCategory() { return category; }
	public void setCategory(String category) { this.category = category; }
	public String getLevel() { return level; }
	public void setLevel(String level) { this.level = level; }
	public boolean isPublished() { return published; }
	public void setPublished(boolean isPublished) { this.published = isPublished; }

	@Override
	public String toString() {
		return "Course [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + "]";
	}
}
