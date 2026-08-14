# Easy Code Backend — Spring Boot Auth API

A lightweight **Java Spring Boot** REST API that provides **JWT-based authentication** for the Easy Code App frontend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Spring Boot 3.2 |
| Security | Spring Security + JWT (JJWT 0.11) |
| Database | H2 In-Memory (dev) / PostgreSQL (prod) |
| ORM | Spring Data JPA / Hibernate |
| Language | Java 17 |
| Build Tool | Maven 3.9 |

---

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+ (`brew install maven` on macOS)

### Run the Server
```bash
cd easy-code-backend
mvn spring-boot:run
```
Server starts at **http://localhost:8080**

### H2 Console (Dev DB Browser)
Visit **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:easycodedb`
- Username: `sa`
- Password: *(empty)*

---

## API Endpoints

### `POST /api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGci...",
  "username": "john_doe",
  "email": "john@example.com",
  "message": "Welcome to Easy Code App, john_doe! Your account has been created."
}
```

---

### `POST /api/auth/login`
Login with username/email + password.

**Request Body:**
```json
{
  "usernameOrEmail": "john_doe",
  "password": "mypassword"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGci...",
  "username": "john_doe",
  "email": "john@example.com",
  "message": "Welcome back, john_doe! Ready to write some code today? 🚀"
}
```

---

### `GET /api/auth/me` *(Protected)*
Get current user info. Requires `Authorization: Bearer <token>` header.

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00"
}
```

---

### `GET /api/auth/health`
Server health check (public).

```json
{ "status": "UP", "service": "Easy Code Auth API" }
```

---

## Frontend Integration
The React frontend (running on `http://localhost:5173`) communicates with this backend:
- JWT token is stored in `localStorage` as `easycode-jwt`
- User info is stored in `localStorage` as `easycode-user`
- On logout, both are cleared

## Production Deployment
Swap `H2` for `PostgreSQL` by updating `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/easycodedb
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```
And add the PostgreSQL driver to `pom.xml`.
