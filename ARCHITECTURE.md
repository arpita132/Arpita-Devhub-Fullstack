# Arpita's DevHub - Technical Architecture

This document outlines the architectural patterns and technology choices behind **Arpita's DevHub**.

## 1. Core Principles
- **Decoupled Architecture**: Frontend and Backend are independent, communicating via RESTful JSON APIs.
- **Validation-First**: Data integrity is enforced at the Model level (Backend) and the View level (Frontend).
- **Premium UX**: High-end styling combined with interactive feedback (Confetti, Animations).

## 2. Backend Architecture (Spring Boot)
- **Base Package**: `com.arpita.devhub`
- **Controller Layer**: Handles REST requests and enforces `@Valid` constraints.
- **Service/Repository Layer**: Leverages Spring Data JPA for data management.
- **Validation**: Uses `jakarta.validation-api` (Hibernate Validator) for `@NotBlank` constraints on title, description, and category.

## 3. Frontend Architecture (Angular)
- **Component Design**: Modular components with standalone-ready logic.
- **State Management**: Reactive RxJS streams for course data.
- **Interactive UI**: Integration with `canvas-confetti` for celebratory feedback.
- **Design System**: A token-based CSS system for color consistency and responsiveness.

## 4. UI Design
- **Theme**: Vibrant Indigo (#6366f1) paired with Dark Slate (#0f172a).
- **Layout**: Grid-based navigation with glassmorphism overlays.
