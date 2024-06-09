
# Book App

This is a full-stack application with a frontend built with React and a backend built with Node.js and TypeScript. The frontend can be deployed on Netlify or Vercel, while the backend can be run using Docker.

## Project Structure

book_app/
│
├── backend/ # Backend application

│ ├── node_modules/
│ ├── src/
│ ├── package.json
│ ├── package-lock.json
│ └── tsconfig.json
│

├── frontend/ # Frontend application
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ ├── .gitignore
│ ├── package.json
│ ├── package-lock.json
│ └── tsconfig.json
│
└── README.md


## Prerequisites

- Docker (https://www.docker.com/)

## Running the Application

To run both the backend and frontend using Docker, follow these steps:

1. Ensure you are in the root directory of the project (`book_app`):

    ```bash
    cd book_app
    ```

2. Create a `docker-compose.yml` file in the root directory with the following content:

    ```yaml
    version: '3.8'

    services:
      backend:
        build: ./backend
        ports:
          - "4000:4000"
        volumes:
          - ./backend:/usr/src/app
        environment:
          NODE_ENV: development

      frontend:
        build: ./frontend
        ports:
          - "3000:3000"
        volumes:
          - ./frontend:/usr/src/app
        environment:
          NODE_ENV: development
    ```

3. Build and start the Docker containers:

    ```bash
    docker compose up --build
    ```

This command will build the Docker images and start the containers for both the backend and frontend services. You can view the frontend application at `http://localhost:3000` and the backend application at `http://localhost:4000`.

## Stopping the Application

To stop the containers, you can use:

```bash
docker compose down
