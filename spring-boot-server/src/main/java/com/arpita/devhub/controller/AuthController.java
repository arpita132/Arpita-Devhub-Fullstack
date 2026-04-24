package com.arpita.devhub.controller;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arpita.devhub.model.User;
import com.arpita.devhub.repository.UserRepository;
import com.arpita.devhub.service.EmailService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	EmailService emailService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody Map<String, String> loginRequest) {
		String email = loginRequest.get("email");
		String password = loginRequest.get("password");

		Optional<User> userOptional = userRepository.findByEmail(email);
		System.out.println("Login attempt for email: " + email);

		if (userOptional.isPresent()) {
			System.out.println("User found. Checking password...");
			if (userOptional.get().getPassword().equals(password)) {
				System.out.println("Login successful!");
				User user = userOptional.get();
				user.setLastLogin(java.time.LocalDateTime.now());
				userRepository.save(user);
				
				Map<String, Object> response = new HashMap<>();
				response.put("id", user.getId());
				response.put("username", user.getUsername());
				response.put("email", user.getEmail());
				response.put("token", "fake-jwt-token-" + user.getId());
				return ResponseEntity.ok(response);
			} else {
				System.out.println("Password mismatch.");
			}
		} else {
			System.out.println("User not found.");
		}
		
		return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
			put("message", "Error: Invalid email or password!");
		}});
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody Map<String, String> signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.get("email"))) {
			return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
				put("message", "Error: Email is already in use!");
			}});
		}

		User user = new User(signUpRequest.get("username"), 
							 signUpRequest.get("email"),
							 signUpRequest.get("password"));

		userRepository.save(user);

		return ResponseEntity.ok(new HashMap<String, String>() {{
			put("message", "User registered successfully!");
		}});
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userRepository.findAll());
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
		try {
			userRepository.deleteById(id);
			return ResponseEntity.ok(new HashMap<String, String>() {{
				put("message", "User deleted successfully!");
			}});
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(new HashMap<String, String>() {{
				put("message", "Error deleting user.");
			}});
		}
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		Optional<User> userOptional = userRepository.findByEmail(email);
		
		if (userOptional.isPresent()) {
			String otp = String.valueOf((int)((Math.random() * 900000) + 100000));
			try {
				emailService.sendOtpEmail(email, otp);
				return ResponseEntity.ok(new HashMap<String, String>() {{
					put("message", "A verification OTP has been sent to your email.");
				}});
			} catch (Exception e) {
				return ResponseEntity.internalServerError().body(new HashMap<String, String>() {{
					put("message", "Error sending email. Please check your SMTP configuration.");
				}});
			}
		} else {
			return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
				put("message", "Error: No account found with this email address.");
			}});
		}
	}
}
