# E-Commerce Backend

This is a Spring Boot-based e-commerce backend application.

## Overview

The backend provides REST APIs for an e-commerce platform with features for user management, product management, order processing, and cart functionality.

## Features

- User authentication and authorization
- Product management
- Order processing
- Cart functionality
- Category management
- JWT-based security
- OpenAPI/Swagger documentation

## Technology Stack

- Java 21
- Spring Boot 3.5.8
- Spring Security
- Spring Data JPA
- MySQL Database
- Lombok
- JWT for authentication
- ModelMapper for object mapping
- Swagger/OpenAPI for API documentation

## Configuration

### Database Configuration
The application uses MySQL as the database. Update the following properties in `application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=<username>
spring.datasource.password=your_password
```

### JWT Configuration
JWT tokens are configured with a secret key and expiration time:
```
spring.app.jwtSecret=your_secret_key
spring.app.jwtExpirationMs=3000000
```

## Getting Started

1. Clone the repository
2. Configure your database settings in `application.properties`
4. Run the application using `mvn spring-boot:run`

## API Documentation

API documentation is available through Swagger UI at `/swagger-ui.html` when the application is running.

## Database Schema

The application uses JPA with Hibernate to manage database entities. The main entities include:
- User
- Product
- Category
- Order
- Cart

## Security

The application implements JWT-based authentication and authorization using Spring Security. Protected endpoints require a valid JWT token 

## Build

Build the application using:
```
mvn clean package
```

## Deployment

The application can be deployed as a standalone JAR file or in a servlet container.