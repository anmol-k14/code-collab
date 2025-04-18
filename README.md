# CollabCode

CollabCode is a real-time collaborative coding platform that allows users to work on projects together. It supports user authentication, project creation, file tree management, and AI-assisted coding suggestions. The platform is built with a MERN stack (MongoDB, Express.js, React, Node.js) architecture.

## Key Features

-   **User Authentication:** Secure user registration and login functionality.
-   **Project Creation:** Users can create new projects and invite collaborators.
-   **Real-time Collaboration:** Multiple users can work on the same project simultaneously with changes reflected in real-time.
-   **File Tree Management:** Organize project files and directories in a hierarchical structure.
-   **AI Assistance:** Get coding suggestions and generate code snippets using AI integration.
-   **Web Container Integration:** Run and test frontend applications within a containerized environment.
-   **Socket.IO Integration:** Enable real-time communication and collaboration features.

## Project Structure

The project is structured into two main directories: `frontend` and `backend`.

```
CollabCode/
├── .gitignore
├── backend/
│   ├── app.js
│   ├── controllers/
│   │   ├── ai.controller.js
│   │   ├── project.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── project.model.js
│   │   └── user.model.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── ai.routes.js
│   │   ├── projects.routes.js
│   │   └── user.routes.js
│   ├── server.js
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── project.service.js
│   │   ├── redis.service.js
│   │   └── user.service.js
│   └── vercel.json
├── frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   └── Group.png
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── auth/
│   │   │   └── UserAuth.jsx
│   │   ├── config/
│   │   │   ├── axios.js
│   │   │   ├── socket.js
│   │   │   └── webContainer.js
│   │   ├── context/
│   │   │   └── user.context.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   └── screens/
│   │       ├── home.jsx
│   │       ├── login.jsx
│   │       ├── project.jsx
│   │       └── register.jsx
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── package-lock.json
└── package.json
```

## Backend

-   `app.js`: Main application file that sets up middleware and routes.
-   `controllers/`: Contains route handlers for users, projects, and AI functionalities.
-   `db/`: Includes the database connection setup.
-   `middleware/`: Contains custom middleware, such as authentication middleware.
-   `models/`: Defines the data models for users and projects using Mongoose.
-   `routes/`: Defines the API endpoints for user authentication, project management, and AI interactions.
-   `server.js`: Entry point for the backend server, setting up the HTTP server and Socket.IO.
-   `services/`: Contains business logic for user management, project operations, and AI integration.
-   `vercel.json`: Configuration file for Vercel deployment.

## Frontend

-   `src/`: Contains the main application source code.
-   `components/`: Reusable React components for UI elements.
-   `config/`: Includes configuration files for Axios, Socket.IO, and the WebContainer API.
-   `context/`: Defines the React context for managing user authentication state.
-   `routes/`: Defines the frontend routes using React Router.
-   `screens/`: Contains the main screen components for login, registration, home, and project views.
-   `tailwind.config.js`: Tailwind CSS configuration file.
-   `vite.config.js`: Vite build tool configuration file.
-   `vercel.json`: Configuration file for Vercel deployment.

## Technologies Used

### Backend

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework.
-   **Mongoose:** MongoDB object modeling tool.
-   **MongoDB:** NoSQL database.
-   **JSON Web Tokens (JWT):** Authentication and authorization.
-   **Bcrypt:** Password hashing.
-   **Morgan:** HTTP request logger.
-   **Cookie-parser:** Parse Cookie header and populate `req.cookies`
-   **Cors:** Cross-Origin Resource Sharing middleware.
-   **Socket.IO:** Realtime communication library.
-   **Vercel:** Cloud deployment platform.
-   **ioredis:** Redis client for Node.js.
-   **@google/generative-ai:** Google's generative AI services.
-   **express-validator:** middleware that wraps a set of express-validator validators and sanitizers

### Frontend

-   **React:** JavaScript library for building user interfaces.
-   **React Router:**  React library.
-   **Vite:** Build tool and development server.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **Axios:** HTTP client for making API requests.
-   **Socket.IO Client:** Client-side library for real-time communication.
-   **Highlight.js:** Syntax highlighter for code snippets.
-   **Markdown-to-jsx:** Converts Markdown text to JSX elements.
-   **Remixicon:**  icons.
-   **WebContainer API:** API for running containerized environments in the browser.

## Environment Variables

The project uses the following environment variables:

-   `MONGO_URI`: MongoDB connection string.
-   `JWT_SECRET`: Secret key for JWT encoding.
-   `PORT`: Port number for the backend server (default: 3000).
-   `FRONTENDURL`: URL for the frontend server.
-   `GOOGLE_AI_KEY`: Google AI API key for AI services.
-   `REDIS_HOST`: Redis host address.
-   `REDIS_PORT`: Redis port number.
-   `REDIS_PASSWORD`: Redis password.
-   `VITE_API_URL`: URL for the backend API.

## Getting Started

### Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn
-   MongoDB installation
-   Redis installation
-   Google AI API key

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd CollabCode
    ```

### Backend Setup

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:
    - Create a `.env` file in the `backend` directory.
    - Add the necessary environment variables, such as `MONGO_URI`, `JWT_SECRET`, `PORT`, `FRONTENDURL`, `GOOGLE_AI_KEY`, `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD`.
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=3000
    FRONTENDURL=<your_frontend_url>
    GOOGLE_AI_KEY=<your_google_ai_key>
    REDIS_HOST=<your_redis_host>
    REDIS_PORT=<your_redis_port>
    REDIS_PASSWORD=<your_redis_password>
    ```

4.  Start the backend server:

    ```bash
    node server.js
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:

    -   Create a `.env` file in the `frontend` directory.
    -   Add the `VITE_API_URL` environment variable to point to the backend server URL.
    ```
    VITE_API_URL=<your_backend_url>
    ```

4.  Start the frontend development server:

    ```bash
    npm run dev
    ```

## Contributing

Contributions are welcome! To contribute to the project:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes and write appropriate tests.
4.  Submit a pull request with a clear description of your changes.
