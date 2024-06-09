
# Book App

This is a full-stack application with a frontend built with React and a backend built with Node.js and TypeScript. 

## Project Structure

![alt text](<Screenshot from 2024-06-10 01-30-22.png>)
## Prerequisites

- Docker (https://www.docker.com/)

##

![alt text](<Screenshot from 2024-06-10 01-47-13.png>) ![alt text](<Screenshot from 2024-06-10 01-46-42.png>) ![alt text](<Screenshot from 2024-06-10 01-46-31.png>)
## Running the Application

To run both the backend and frontend using Docker, follow these steps:

1. Ensure you are in the root directory of the project (`book_app`):

    ```bash
    cd book_app
    ```


2. Build and start the Docker containers:

    ```bash
    docker compose up --build
    ```

This command will build the Docker images and start the containers for both the backend and frontend services. You can view the frontend application at `http://localhost:3000` and the backend application at `http://localhost:4000`.

## Stopping the Application

To stop the containers, you can use:

```bash
docker compose down


