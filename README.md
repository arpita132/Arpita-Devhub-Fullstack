# Arpita's DevHub: Full-Stack Course Management

This is a professional-grade course management platform I built to explore the latest features of **Spring Boot 3** and **Angular 17**. Unlike standard CRUD apps, I focused heavily on the user experience and a modern "Electric Indigo" design aesthetic using glassmorphism.

## Why I built this
I wanted to create a platform that doesn't just manage data but feels responsive and alive. This project was a deep dive into secure authentication flows, complex routing in Angular, and building a centralized Admin Command Center to track real-time platform metrics.

## Key Features
*   **Modern Design System**: A custom-built UI using CSS3 glassmorphism and a responsive grid layout.
*   **Secure Auth Flow**: Complete login/register system with OTP-based password resets via Gmail SMTP.
*   **Admin Insights**: A private dashboard to monitor course statuses (Live vs Draft) and track user login activity with timestamps.
*   **Engagement**: Integrated interactive feedback like confetti effects for successful course creation.
*   **Mobile Ready**: Fully responsive layout optimized for all screen sizes.

## Tech Stack
*   **Frontend**: Angular 17, TypeScript, RxJS, CSS3.
*   **Backend**: Java 17, Spring Boot 3, Hibernate, JPA.
*   **Database**: H2 Database (for easy development/testing).
*   **Security**: Spring Security with custom CORS and Auth Guards.

## Setup Instructions

### Backend
1. Navigate to `spring-boot-server`.
2. Run `mvn spring-boot:run`.
3. (Optional) Configure your Gmail App Password in `application.properties` for real-time OTPs.

### Frontend
1. Navigate to `angular-17-client`.
2. Run `npm install` and then `npm start`.
3. Open `http://localhost:4200` to view the app.

---
**Built with passion and excellence by Arpita.**
