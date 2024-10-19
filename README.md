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
   
 - MONGO_URI=your_mongo_db_connection_string
 - JWT_SECRET=your_jwt_secret_key


## 4. API Endpoints
### User API Endpoint
- https://social-media-backend-ochre.vercel.app/api/user/Endpoint

| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/api/user/userLists`      | Get all users                           |
| GET    | `/api/user/find/:id`       | Get a user by ID                        |
| PUT    | `/api/user/:id`            | Update a user's profile                 |
| PUT    | `/api/user/updatedpassword/:id` | Update a user's password             |
| PUT    | `/api/user/updatedprofilepicture/:id` | Update a user's profile picture |
| DELETE | `/api/user/:id`            | Delete a user                           |


### Posts API Endpoints
- https://social-media-backend-ochre.vercel.app/api/posts/Endpoint


| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/api/posts`              | Get all posts                           |
| GET    | `/api/posts/:id`          | Get a post by ID                        |
| POST   | `/api/posts`              | Create a new post                       |
| PUT    | `/api/posts/:id`          | Update a post                           |
| DELETE | `/api/posts/:id`          | Delete a post                           |


### Comments API Endpoints
- https://social-media-backend-ochre.vercel.app/api/comments/Endpoint


| Method | Endpoint                        | Description                             |
|--------|----------------------------------|-----------------------------------------|
| POST   | `/api/posts/:id/comments`        | Comment on a post                       |
| GET    | `/api/posts/:id/comments`        | Get all comments for a post             |
| DELETE | `/api/comments/:id`              | Delete a comment                        |


#### like Endpoints

| Method | Endpoint                        | Description                             |
|--------|----------------------------------|-----------------------------------------|
| POST   | `/api/posts/:id/like`            | Like a post                             |
| POST   | `/api/posts/:id/unlike`          | Unlike a post                           |



## 5. sceema structure .
- User Schema
```bash
{
  "username": "String (Required)",
  "email": "String (Required, Unique)",
  "password": "String (Required)",
  "avatar": "String (Default: empty string)",
  "city": "String (Default: empty string)",
  "country": "String (Default: empty string)",
  "phone": "String (Default: empty string)",
  "isAdmin": "Boolean (Default: false)",
  "followers": ["String (Default: empty array)"],
  "following": ["String (Default: empty array)"],
  "notifications": ["String (Default: empty array)"],
  "seenNotification": ["String (Default: empty array)"],
  "posts": ["String (Default: empty array)"],
  "createdAt": "Date (Generated automatically)",
  "updatedAt": "Date (Generated automatically)"
}

```
- POST Schema
```bash
{
  "title": "String (Required, MaxLength: 30)",
  "desc": "String (Required, MaxLength: 30)",
  "userId": "String (Required)",
  "images": ["String (Default: empty array)"],
  "likes": ["String (Default: empty array)"],
  "comments": ["String (Default: empty array)"],
  "createdAt": "Date (Generated automatically)",
  "updatedAt": "Date (Generated automatically)"
}

```
- COMMENT Schema
```bash
{
  "userId": "String (Required)",
  "postId": "String (Required)",
  "text": "String (Required)",
  "createdAt": "Date (Generated automatically)",
  "updatedAt": "Date (Generated automatically)"
}

```

- story Schema
```bash

{
  "title": "String (Required)",
  "userId": "String (Required)",
  "images": "String (Default: '')",
  "likes": "[String] (Default: [])",
  "createdAt": "Date (Generated automatically)",
  "updatedAt": "Date (Generated automatically)"
}

```




## Authors

- [Kawsar firoz](https://github.com/kawsar334)

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://kawsar334.github.io/kawsars_portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kawsar-firoz-a140b9237/)
