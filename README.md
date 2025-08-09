# Wellness Activities App

A full-stack application for managing wellness activities.

- **Backend**: Spring Boot (Java 21)
- **Database**: PostgreSQL 16
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library

---

## Features

- **Activity Management**: Create, update, list, and delete wellness activities.
- **Activity Fields**:
  - Title
  - Category (Fitness, Mindfulness, Nutrition, Sleep, Social, Outdoor, Creative, Learning)
  - Duration (in minutes)
  - Difficulty (1–3)
  - Schedule date
  - Equipment list
- **Backend API**: Built with Spring Boot & PostgreSQL.
- **Frontend**: Modern UI with React + Tailwind + shadcn/ui.

---

## Running Locally with Docker

The project includes a Docker Compose setup to run the backend API with PostgreSQL locally.

### 1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Start Services

```bash
docker compose up --build
```

This will start:
- **db** — PostgreSQL 16 database
- **app** — Spring Boot backend API

---

## Docker Configuration

`docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16
    container_name: items-postgres
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: itemsdb
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d itemsdb"]
      interval: 5s
      timeout: 3s
      retries: 10

  app:
    build: .
    container_name: items-api
    depends_on:
      db:
        condition: service_healthy
    environment:
      DB_HOST: db
      DB_PORT: "5432"
      DB_NAME: itemsdb
      DB_USER: admin
      DB_PASSWORD: admin
    ports:
      - "8080:8080"

volumes:
  db_data:
```

---

## Database Credentials

The backend connects to the database using environment variables (set in `docker-compose.yml`) and loaded in `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:itemsdb}
    username: ${DB_USER:admin}
    password: ${DB_PASSWORD:admin}
```

Default credentials:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `itemsdb`
- **User**: `admin`
- **Password**: `admin`

---

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint            | Description               |
|--------|--------------------|---------------------------|
| GET    | `/activities`       | List all activities       |
| GET    | `/activities/{id}`  | Get activity by ID        |
| POST   | `/activities`       | Create a new activity     |
| PUT    | `/activities/{id}`  | Update an activity        |
| DELETE | `/activities/{id}`  | Delete an activity        |

---

## Frontend

The frontend is built with:
- React + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand state management

### Running Frontend Locally

```bash
pnpm install
pnpm dev
```

Default URL: `http://localhost:5173`

---

## Testing

**Backend**: JUnit & Spring Boot Test  
**Frontend**: Vitest + @testing-library/react

Run frontend tests:
```bash
pnpm test
```
