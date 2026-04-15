# E-Commerce Full-Stack Application

This repository contains a complete e-commerce platform with:

- A React + Vite frontend
- A Spring Boot backend
- MySQL persistence
- JWT authentication (cookie-based session flow)
- Stripe payment integration

## Project Structure

```text
E-commerce/
|- frontend/              # React app (customer + admin UI)
|- backend/
|  |- sb-ecom/            # Spring Boot REST API
|  |- images/             # Uploaded product images storage
|- README.md
```

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router
- Redux Toolkit + React Redux
- Axios
- Tailwind CSS + MUI
- Stripe JS + React Stripe

### Backend

- Java 21
- Spring Boot 3.5.8
- Spring Security
- Spring Data JPA
- MySQL
- JWT (jjwt)
- Springdoc OpenAPI (Swagger UI)
- Stripe Java SDK

## Core Features

- User registration/login/logout
- Role-based authorization: `USER`, `SELLER`, `ADMIN`
- Product and category management
- Cart management
- Address management
- Checkout and order workflow
- Stripe payment intent flow
- Admin dashboard and order management
- Seller product/order access

## Prerequisites

Install these before running the app:

- Node.js 20+ and npm
- Java 21
- Maven 3.9+
- MySQL 8+

## Environment Variables

The project uses environment variables on both frontend and backend.

### Backend (`backend/sb-ecom`)

Create your environment variables (system, shell, or IDE run config) for:

| Variable              | Required          | Description                  | Example                                 |
| --------------------- | ----------------- | ---------------------------- | --------------------------------------- |
| `DATASOURCE_URL`      | Yes               | MySQL JDBC URL               | `jdbc:mysql://localhost:3306/ecommerce` |
| `DATASOURCE_USER`     | Yes               | MySQL username               | `root`                                  |
| `DATASOURCE_PASSWORD` | Yes               | MySQL password               | `password`                              |
| `JWT_SECRET`          | Yes               | JWT signing secret           | `change_this_to_long_random_secret`     |
| `JWT_EXPIRATION`      | Yes               | Token TTL (ms)               | `3000000`                               |
| `FRONTEND_URL`        | Yes               | Allowed CORS frontend origin | `http://localhost:5173`                 |
| `IMAGE_BASE_URL`      | Yes               | Base URL to load images      | `http://localhost:8080/images`          |
| `STRIPE_SECRET_KEY`   | Yes (Stripe flow) | Stripe secret key            | `sk_test_...`                           |

### Frontend (`frontend`)

Create a `.env` file in `frontend`:

```env
VITE_BACK_END_URL=http://localhost:8080
VITE_FRONTEND_URL=http://localhost:5173
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Local Development Setup

## 1) Start Backend

```bash
cd backend/sb-ecom
mvn clean spring-boot:run
```

Backend default URL:

- `http://localhost:8080`

Swagger UI:

- `http://localhost:8080/swagger-ui/index.html`

## 2) Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Build Commands

### Frontend

```bash
cd frontend
npm run build
npm run preview
npm run lint
```

### Backend

```bash
cd backend/sb-ecom
mvn clean package
mvn test
```

Jar output:

- `backend/sb-ecom/target/sb-ecom-0.0.1-SNAPSHOT.jar`

Run built jar:

```bash
cd backend/sb-ecom
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

## Docker (Backend)

The backend includes a multi-stage `Dockerfile`.

Build image:

```bash
cd backend/sb-ecom
docker build -t sb-ecom:latest .
```

Run container (example):

```bash
docker run --rm -p 8080:8080 \
	-e DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/ecommerce \
	-e DATASOURCE_USER=root \
	-e DATASOURCE_PASSWORD=password \
	-e JWT_SECRET=change_this_to_long_random_secret \
	-e JWT_EXPIRATION=3000000 \
	-e FRONTEND_URL=http://localhost:5173 \
	-e IMAGE_BASE_URL=http://localhost:8080/images \
	-e STRIPE_SECRET_KEY=sk_test_xxx \
	sb-ecom:latest
```

## Seeded Users (Created On Startup)

The backend seeds roles and default users if they do not already exist:

| Role   | Username  | Password    |
| ------ | --------- | ----------- |
| USER   | `user1`   | `password1` |
| SELLER | `seller1` | `password2` |
| ADMIN  | `admin`   | `adminPass` |

Use these only for local development. Change or remove in production.

## Main API Route Groups

Base API prefix: `/api`

- Auth: `/api/auth/*`
- Public catalog: `/api/public/*`
- Cart: `/api/carts/*`, `/api/cart/*`
- Orders: `/api/order/*`
- Addresses: `/api/addresses*`
- Admin: `/api/admin/*`
- Seller: `/api/seller/*`

Refer to Swagger UI for complete request/response schemas.

## Security Notes

- JWT authentication is enabled through Spring Security.
- CORS allows `http://localhost:3000` and `FRONTEND_URL`.
- Cookies are used with `withCredentials` on frontend API requests.

## Troubleshooting

- 401/403 errors:
  - Confirm login succeeded and browser cookies are present.
  - Verify role-protected endpoints are accessed by correct role.
- CORS issues:
  - Ensure `FRONTEND_URL` exactly matches your frontend origin.
- Image not loading:
  - Check backend `IMAGE_BASE_URL` and `/images/**` availability.
- Payment failure:
  - Verify `STRIPE_SECRET_KEY` (backend) and `VITE_STRIPE_PUBLISHABLE_KEY` (frontend).


