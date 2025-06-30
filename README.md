# Nawy Apartment Task

This is a full-stack application for browsing and managing apartment listings. It includes a backend API built with Node.js and a frontend client built with Next.js, all orchestrated with Docker for a seamless development and deployment experience.

## Features

- **Backend API**: A  RESTful API for managing apartments, locations (countries, cities, areas), and media.
- **Frontend Client**: A modern, server-rendered React application for browsing and filtering apartments.
- **Dockerized Environment**: The entire application is containerized with Docker and managed with Docker Compose, ensuring consistency across environments.
- **Automated Database Setup**: On startup, the database is automatically created, migrations are run, and initial data is seeded.
- **Optimized Production Builds**: Multi-stage Dockerfiles are used to create lean, secure, and performant production images.
- **API Documentation**: Swagger is integrated for interactive API documentation.

---

## Tech Stack

| Area      | Technology                                                              |
| :-------- | :---------------------------------------------------------------------- |
| **Backend**   | Node.js, Express, TypeScript, TypeORM, PostgreSQL, Redis, Swagger     |
| **Frontend**  | Next.js, React, TypeScript, Tailwind CSS                              |
| **DevOps**    | Docker, Docker Compose                                                |

---

## Project Structure

```
nawy-apartment-task/
├── backend/         # Contains the Node.js backend API
│   ├── .dockerfile  # Multi-stage Dockerfile for production
│   └── entrypoint.sh# Script to run migrations and seeding
├── frontend/        # Contains the Next.js frontend application
│   └── Dockerfile   # Multi-stage Dockerfile for production
└── docker-compose.yml # Main Docker Compose file to orchestrate all services
```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone <repository-url>
    cd nawy-apartment-task
    ```

2.  **Create an Environment File**

    Create a file named `.env` inside the `backend` directory. This file holds the necessary credentials for the database and other services.

    **File:** `backend/.env`
    ```env
    # PostgreSQL Database
    POSTGRES_DB=nawy
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password

    # pgAdmin
    PGADMIN_DEFAULT_EMAIL=admin@example.com
    PGADMIN_DEFAULT_PASSWORD=password

    # Backend Port
    PORT=5000

    # Redis (optional, defaults are set in config)
    REDIS_HOST=redis
    REDIS_PORT=6379

    # AWS S3 (for image uploads)
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_S3_BUCKET=
    AWS_S3_BASE_URL=
    AWS_S3_IMAGE_FOLDER=images
    ```

3.  **Build and Run the Application**

    From the root directory of the project, run the following command:
    ```sh
    docker-compose up --build
    ```
    This will build the Docker images for the frontend and backend, start all the services, and automatically run the database migrations and seeding scripts.

---

## Available Services

Once the application is running, the following services will be available:

| Service               | URL                                   | Credentials (Default)           |
| :-------------------- | :------------------------------------ | :------------------------------ |
| **Frontend**          | `http://localhost:3000`                 | -                               |
| **Backend API**       | `http://localhost:5000`                 | -                               |
| **Swagger API Docs**  | `http://localhost:5000/api`             | -                               |
| **PostgreSQL**        | `localhost:5432` (for direct connection) | `user` / `password`             |
| **Redis**             | `localhost:6379`                        | -                               |

---

## Backend Scripts

The `backend/package.json` contains several useful scripts:

-   `npm run start:prod`: Starts the application in production mode.
-   `npm run migration:run:prod`: Runs database migrations in a production environment.
-   `npm run seed:prod`: Seeds the database with initial data.
-   `npm run dev`: Runs the backend in development mode with hot-reloading.

## Docker Configuration Details

-   **Multi-Stage Builds**: Both the `frontend` and `backend` use multi-stage `Dockerfiles`. This creates a lightweight final image by separating the build environment from the production environment, resulting in smaller, faster, and more secure containers.
-   **Automated Startup**: The `backend/entrypoint.sh` script ensures that every time the backend container starts, it first runs the database migrations and then seeds the database. This guarantees that the application always starts with a correctly configured database.
-   **Health Checks**: The `docker-compose.yml` file includes health checks for the `db` and `redis` services. This ensures that the `backend` service will wait until the database and Redis are fully ready before it starts, preventing connection errors.

---

## How to Build and Run the Project

To build and run the entire application, navigate to the root directory of the project (`nawy-apartment-task`) and execute the following command:

```sh
docker-compose up --build
```

This single command will:
1.  **Build** the production-ready Docker images for the `frontend` and `backend`.
2.  **Start** all services (`frontend`, `backend`, `db`, `redis`, `pgadmin`).
3.  **Automate** the database setup, including running migrations and seeding data.

Once the command finishes, your full-stack application will be up and running. 