# Food Plaza

This project utilizes Docker for increased portability and ease of use. While employing Docker best practices would mean using 3 separate containers (frontend, backend, Redis), this project utilizes a single Docker container so that it's easier to run and grade.

Technologies used:
1. React
    - Used to create the frontend of the website
2. Redis
    - Used to cache images to greatly reduce loading times for users
3. Firebase Auth
    - Integrates with Google to allow signing in with Google
    - Handles authentication and credential management of users
4. AWS
    - Provides infrastructure used to host the website (Amazon EC2)
5. Docker
    - Helps with development and deployment to AWS by ensuring that our environment is consistent on both platforms
    - Allows all of the project's dependencies to be contained in one image

There are 2 branches on Git: 
- main (used for local development and testing)
- aws (deployed to AWS EC2 for hosting)

To access the AWS hosted version, simply visit: http://aws.shawnpollock.com

To build and deploy this locally using Docker, please do the following:
1. Run `docker build . -t foodplaza` to build the "foodplaza" container
2. Once the build is complete, you can run the container using:
    - `docker run -p 3000:3000 -p 4000:4000 -it foodplaza` to show the shell for the container as it's running
    - `docker run -p 3000:3000 -p 4000:4000 -d foodplaza` to run the container in the background
3. If running using `-it`, simply CTRL+C to exit. Otherwise, use `docker ps` to find the container's id and then `docker stop <id>` to stop the container

Alternatively, you can also run locally without Docker by doing the following:
1. Run Redis Server
2. Run `npm start` in the root directory to start the backend 
3. Run `npm start` in the client directory to start the React frontend
