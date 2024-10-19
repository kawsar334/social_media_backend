# Social Media Backend API

## Project Overview

This is the backend API for a social media platform. It handles user authentication, post creation, comments, likes, and follows, providing endpoints that allow users to interact with the platform.


-  Project structure : [click here](https://docs.google.com/presentation/d/1TkPNA5qiVmhk8yDfFHUQdej5ipEm5iS9JMwRLax2q_w/edit?usp=sharing)

### Features

- User authentication and authorization (JWT-based).
- Post creation, editing, and deletion.
- Commenting on posts.
- Liking and unliking posts.
- Following and unfollowing users.
- User profile management.

## Technologies Used

- **Node.js** with **Express.js** as the web framework.
- **MongoDB** for the database.
- **Mongoose** for data modeling.
- **JWT (JSON Web Tokens)** for authentication.
- **bcrypt.js** for password hashing.
- **Cloudinary** (or other cloud services) for media uploads (optional).

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/social-media-backend.git


2. **Install dependencies:**

   ```bash
   npm install

3. **Environment variables:**

   ```bash
   PORT=5000
   
 MONGO_URI=your_mongo_db_connection_string
 JWT_SECRET=your_jwt_secret_key
 CLOUDINARY_API_KEY=your_cloudinary_api_key (if using media upload service).

## API Endpoints

### Authentication
- https://social-media-backend-ochre.vercel.app/api/auth/Endpoint
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/register`       | Register a new user             |
| POST   | `/login`          | Login a user                    |
| POST   | `/auth/logout`         | Logout the current user         |

### User Management
- https://social-media-backend-ochre.vercel.app/api/user/Endpoint

| Method | Endpoint                       | Description                |
|--------|---------------------------------|----------------------------|
| GET    | `user/userLists`                | Get all users              |
| GET    | `find/:id`                      | Get a user by ID           |
| PUT    | `:id`                           | Update a user's profile    |
| PUT    | `updatedpassword/:id`           | Update password            |
| UPDATE | `updatedprofilepicture/:id`     | Update profile image       |
| DELETE | `/:id`                          | Delete a user              |

### Posts

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/posts`               | Get all posts                   |
| GET    | `/api/posts/:id`           | Get a post by ID                |
| POST   | `/api/posts`               | Create a new post               |
| PUT    | `/api/posts/:id`           | Update a post                   |
| DELETE | `/api/posts/:id`           | Delete a post                   |

### Comments

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/posts/:id/comments`  | Comment on a post               |
| GET    | `/api/posts/:id/comments`  | Get all comments for a post     |
| DELETE | `/api/comments/:id`        | Delete a comment                |

### Likes

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/posts/:id/like`      | Like a post                     |
| POST   | `/api/posts/:id/unlike`    | Unlike a post                   |

### Friend Requests

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/users/:id/friend-request` | Send a friend request           |
| POST   | `/api/users/:id/accept-friend`  | Accept a friend request         |
| POST   | `/api/users/:id/decline-friend` | Decline a friend request        |

### Notifications

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/notifications`       | Get all notifications           |
| PUT    | `/api/notifications/:id`   | Mark notification as read       |
| DELETE | `/api/notifications/:id`   | Delete a notification           |

### Messages (Optional)

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/messages`            | Get all messages                |
| POST   | `/api/messages`            | Send a message                  |
| GET    | `/api/messages/:id`        | Get a specific message          |
| DELETE | `/api/messages/:id`        | Delete a message                |






## Authors

- [Kawsar firoz](https://github.com/kawsar334)

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://kawsar334.github.io/kawsars_portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kawsar-firoz-a140b9237/)
