# 📝 Tale of Tails - User TODO Backend API
A robust RESTful API built with the MERN stack (MongoDB, Express, Node.js) for managing personal tasks with secure User Authentication. This backend allows users to register, log in, and perform full CRUD operations on their Todos.## 🚀 Tech Stack* **Runtime:** Node.js* **Framework:** Express.js* **Database:** MongoDB (via Mongoose)* **Authentication:** JWT (JSON Web Tokens) & Bcrypt (Password Hashing)* **Middleware:** Cookie-parser, CORS

## 📂 Folder Structure

The project follows a modular Model-Controller-Route architecture:

TALE-OF-TAILS/
├── backend/ <br>
│   ├── node_modules/ <br>
│   ├── src/ <br>
│   │   ├── controllers/ <br>
│   │   │   ├── todo.controller.js    # Logic for create, read, update, delete <br>
│   │   │   └── user.controller.js    # Logic for register, login, profile <br>
│   │   ├── db/ <br>
│   │   │   └── index.js              # Database connection logic <br>
│   │   ├── middlewares/ <br>
│   │   │   └── auth.middleware.js    # JWT verification logic <br>
│   │   ├── models/ <br>
│   │   │   ├── todo.model.js         # Mongoose schema for Todos <br>
│   │   │   └── user.model.js         # Mongoose schema for Users <br>
│   │   ├── routes/ <br>
│   │   │   ├── todo.route.js         # Router: /api/todos <br>
│   │   │   └── user.route.js         # Router: /api/auth & /api/user <br>
│   │   ├── app.js                    # Express app configuration & middleware setup <br>
│   │   ├── constants.js              # Global constants (DB Name) <br>
│   │   └── index.js                  # Entry point (Server listener) <br>
│   ├── .env                          # Environment variables <br>
│   ├── .gitignore <br>
│   ├── package.json <br>
│   └── package-lock.json <br>


## 🛠️ Getting Started

1. Prerequisites

Ensure you have Node.js and MongoDB installed on your machine.

2. Installation

Clone the repository and install dependencies:

```
git clone https://github.com/Prince142001/user-todo-api.git
cd backend
npm install
```
3. Environment Variables

Create a `.env` file in the root directory and add the following configuration:

Code snippet

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_super_secret_key
ACCESS_TOKEN_EXPIRY=1d
```
4. Run the Server

Bash


```
# Development mode (using Nodemon)
npm run dev

# Production mode
npm start
```
--- 
## 🔌 API Documentation

Base URL `http://localhost:8000`.

### 👤 User Authentication

| Method | Endpoint            | Description                 | Auth Required |
|--------|-------------------|----------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user         | ❌ No         |
| POST   | `/api/auth/login`    | Login user & receive token  | ❌ No         |
| GET    | `/api/user/profile`  | Get details of logged-in user | ✅ Yes      |

### 📝 Todo Management

| Method | Endpoint          | Description                         | Auth Required |
|--------|-----------------|-------------------------------------|---------------|
| POST   | `/api/todos`     | Create a new Todo                   | ✅ Yes        |
| GET    | `/api/todos`     | Fetch all Todos for the user        | ✅ Yes        |
| PATCH  | `/api/todos/:id` | Update Todo status (Pending/Completed) | ✅ Yes    |
| DELETE | `/api/todos/:id` | Delete a Todo                        | ✅ Yes        |

> **Note:** For PATCH and DELETE requests, append the specific Todo ID to the URL.  
> Example: `/api/todos/6932f1..........`
--- 

🧪 Postman Configuration

To organize testing, I have structured my Postman collection as follows:

Environment Variable:

- I created a variable named `{{server}}` set to `http://localhost:8000`.
- All URLs use this variable (e.g., `{{server}}/api/todos)`.

Collection Folders:

- 📁 Auth: Contains Login, Register, Profile requests.
- 📁 Todo: Contains Create, Fetch, Update, Delete requests.

### ⚠️ Known Issues & Roadmap
---
🔴 Current Limitation: Manual Token Handling

- Currently, the application relies on Bearer Tokens in the header.
- The Problem: When testing in Postman, the user must manually copy the token string from the Login response and paste it into the "Authorization" tab for every new request tab. If a new tab is opened, the token is lost, resulting in 401 Unauthorized errors.
--- 
🟢 Future Improvement: HttpOnly Cookies

To resolve the manual token issue and improve security, the next update will include:

1. Cookies: Storing the JWT inside an httpOnly cookie upon login.

2. Automation: The browser/Postman will automatically attach the cookie to subsequent requests, removing the need for manual copy-pasting.

3. Security: Protecting the token from client-side scripts (XSS).
