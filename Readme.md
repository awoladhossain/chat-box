# ChatApp

ChatApp is a real-time chat application built using ReactJS, Redux and Socket.IO on the frontend, and NodeJS, Express and MongoDB on the backend.

The application allows users to sign up and log in to their accounts, and engage in real-time conversations with other users.

## Architecture

The application is built using the following technologies:

### Frontend

*   ReactJS: A JavaScript library for building user interfaces.
*   Redux: A state management library for managing global state.
*   Socket.IO: A JavaScript library for real-time communication between the frontend and backend.

### Backend

*   NodeJS: A JavaScript runtime for building server-side applications.
*   Express: A web application framework for NodeJS.
*   MongoDB: A NoSQL database for storing data.

## Features

*   User authentication: Users can sign up and log in to their accounts.
*   Real-time messaging: Users can engage in real-time conversations with other users.
*   Private messaging: Users can send private messages to other users.
*   Group messaging: Users can send messages to groups of users.
*   File sharing: Users can share files with other users.
*   Image and video preview: Users can preview images and videos before sending them.
*   Offline support: The application works offline, and synchronizes data when the user comes online.

## API Endpoints

### Authentication

*   `POST /auth/signup`: Sign up a new user.
*   `POST /auth/login`: Log in an existing user.
*   `GET /auth/me`: Get the current user.

### Messaging

*   `POST /messages`: Send a new message.
*   `GET /messages`: Get all messages for a user.
*   `GET /messages/:id`: Get a message by ID.
*   `DELETE /messages/:id`: Delete a message by ID.

### Users

*   `GET /users`: Get all users.
*   `GET /users/:id`: Get a user by ID.

## Database Schema

The database schema for the application is as follows:

### Users

*   `_id`: The unique ID of the user.
*   `name`: The name of the user.
*   `email`: The email of the user.
*   `password`: The password of the user.
*   `avatar`: The avatar of the user.

### Messages

*   `_id`: The unique ID of the message.
*   `senderId`: The ID of the user who sent the message.
*   `receiverId`: The ID of the user who received the message.
*   `text`: The text of the message.
*   `media`: The media of the message (image or video).
*   `createdAt`: The timestamp of when the message was sent.

## Setup

To set up the application, follow the steps below:

### Frontend

1.  Clone the repository: `git clone https://github.com/username/chatapp.git`
2.  Move into the frontend directory: `cd chatapp/frontend`
3.  Install the dependencies: `npm install`
4.  Start the development server: `npm start`

### Backend

1.  Clone the repository: `git clone https://github.com/username/chatapp.git`
2.  Move into the backend directory: `cd chatapp/backend`
3.  Install the dependencies: `npm install`
4.  Start the development server: `npm start`

## Deployment

To deploy the application, follow the steps below:

### Frontend

1.  Build the frontend: `npm run build`
2.  Deploy the frontend to a hosting platform such as Vercel or Netlify.

### Backend

1.  Build the backend: `npm run build`
2.  Deploy the backend to a hosting platform such as Heroku or AWS Elastic Beanstalk.

## Development

The application is currently under development, and new features are being added regularly. The frontend and backend are being developed simultaneously, with a focus on building a scalable and maintainable application.

## Contributions

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.


