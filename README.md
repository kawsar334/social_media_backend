# Social Media Backend API

## Project Overview

This is the backend API for a social media platform. It handles user authentication, post creation, comments, likes, and follows, providing endpoints that allow users to interact with the platform.

-  [Frontend Link](https://github.com/kawsar334/tailwind_css-react-_js-social_media_UI-UX_desgn-) 
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
### User Management
- https://social-media-backend-ochre.vercel.app/api/user/Endpoint

#### User Model

| Field          | Type        | Description                                 |
|----------------|-------------|---------------------------------------------|
| `_id`          | ObjectId    | Unique identifier (generated automatically) |
| `name`         | String      | Full name of the user                       |
| `email`        | String      | Email address (must be unique)              |
| `password`     | String      | Hashed password                             |
| `profilePic`   | String      | URL to the user's profile picture           |
| `followers`    | [ObjectId]  | Array of user IDs who follow this user      |
| `following`    | [ObjectId]  | Array of user IDs that this user follows    |
| `createdAt`    | Date        | Timestamp when the user was created         |
| `updatedAt`    | Date        | Timestamp when the user was last updated    |

#### API Endpoints

| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/api/user/userLists`      | Get all users                           |
| GET    | `/api/user/find/:id`       | Get a user by ID                        |
| PUT    | `/api/user/:id`            | Update a user's profile                 |
| PUT    | `/api/user/updatedpassword/:id` | Update a user's password             |
| PUT    | `/api/user/updatedprofilepicture/:id` | Update a user's profile picture |
| DELETE | `/api/user/:id`            | Delete a user                           |


### Posts Management
- https://social-media-backend-ochre.vercel.app/api/posts/Endpoint

#### Post Model

| Field          | Type        | Description                                 |
|----------------|-------------|---------------------------------------------|
| `_id`          | ObjectId    | Unique identifier (generated automatically) |
| `userId`       | ObjectId    | ID of the user who created the post         |
| `content`      | String      | The content of the post                     |
| `image`        | String      | URL of an image associated with the post    |
| `likes`        | [ObjectId]  | Array of user IDs who liked the post        |
| `comments`     | [ObjectId]  | Array of comment IDs associated with the post |
| `createdAt`    | Date        | Timestamp when the post was created         |
| `updatedAt`    | Date        | Timestamp when the post was last updated    |

#### API Endpoints

| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/api/posts`              | Get all posts                           |
| GET    | `/api/posts/:id`          | Get a post by ID                        |
| POST   | `/api/posts`              | Create a new post                       |
| PUT    | `/api/posts/:id`          | Update a post                           |
| DELETE | `/api/posts/:id`          | Delete a post                           |


### Comments Management
- https://social-media-backend-ochre.vercel.app/api/comments/Endpoint

#### Comment Model

| Field          | Type        | Description                                 |
|----------------|-------------|---------------------------------------------|
| `_id`          | ObjectId    | Unique identifier (generated automatically) |
| `postId`       | ObjectId    | ID of the post this comment is for          |
| `userId`       | ObjectId    | ID of the user who made the comment         |
| `content`      | String      | The text of the comment                     |
| `createdAt`    | Date        | Timestamp when the comment was created      |

#### API Endpoints

| Method | Endpoint                        | Description                             |
|--------|----------------------------------|-----------------------------------------|
| POST   | `/api/posts/:id/comments`        | Comment on a post                       |
| GET    | `/api/posts/:id/comments`        | Get all comments for a post             |
| DELETE | `/api/comments/:id`              | Delete a comment                        |

### Likes Management
- https://social-media-backend-ochre.vercel.app/api/likes/Endpoint

#### Like Model

Likes are typically stored as part of the `Post` model:

| Field          | Type        | Description                                 |
|----------------|-------------|---------------------------------------------|
| `likes`        | [ObjectId]  | Array of user IDs who liked the post        |

#### API Endpoints

| Method | Endpoint                        | Description                             |
|--------|----------------------------------|-----------------------------------------|
| POST   | `/api/posts/:id/like`            | Like a post                             |
| POST   | `/api/posts/:id/unlike`          | Unlike a post                           |


## Authors

- [Kawsar firoz](https://github.com/kawsar334)

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://kawsar334.github.io/kawsars_portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kawsar-firoz-a140b9237/)
