# 📦 Inventory Management System

A full-stack Inventory Management System built using:

- ⚙️ **Backend**: Node.js, Express.js, MongoDB, Swagger API Docs
- 💻 **Frontend**: React.js with Tailwind CSS
- 🐳 **Dockerized** for development and deployment

---

## 🚀 Features

### 🔐 Authentication
- Register and Login (JWT-based)
- Secure password hashing using Bcrypt
- Refresh token mechanism
- Authorization middleware for protected routes

### 📦 Product Management
- Add new products
- Update product quantity
- Paginated product listing
- Optional fields: `image_url`, `description`

### 📄 API Documentation
- Swagger available at: [`http://localhost:8080/api-docs`](http://localhost:8080/api-docs)
- Implemented using Swagger (OpenAPI v3)

---

## 🏗️ Project Structure
```
Inventory-Management/
├── Backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── config/
│ │ ├── docs/
│ │ ├── middlewares/
│ │ ├── app.js
│ │ └── index.js
│ ├── Dockerfile
│ ├── .env
│ └── package.json
│
├── Frontend/
│ ├── src/
│ ├── Dockerfile
│ ├── .env
│ └── package.json
│
├── docker-compose.yml
└── README.md
```


---

## ⚙️ Running Locally with Docker

### 📋 Requirements
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) installed

---

### 🧭 Setup Steps

1. **Clone the Repository**


```
git clone https://github.com/agnijeetsharma/Inventory-Management.git
```
cd Inventory-Management
Configure Environment Variables

Create a .env file in the Backend/ folder with the following:

```
PORT=8080
MONGODB_URI=mongodb://mongo:27017/ims
ACCESS_TOKEN_SECRET=your_secret_access
REFRESH_TOKEN_SECRET=your_secret_refresh
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:8000
```
No .env is required for the frontend unless you're customizing the API base URL.

Start the Application

```
docker-compose up --build
```
🔍 API Endpoints
```
Endpoint	Method	Description
/api/v1/auth/register	POST	Register a new user
/api/v1/auth/login	POST	Login and get tokens
/api/v1/products	GET	Get paginated list of products
/api/v1/products	POST	Add a new product
/api/v1/products/:id/quantity	PUT	Update quantity of a product
```

📘 Swagger UI:
```
http://localhost:8080/api-docs
```

🌐 Frontend

URL:
```
http://localhost:8000
```

Built with React, Vite, and Tailwind CSS

Frontend Features
Authenticated login system

Product listing with pagination

Add product form

Update product quantity UI

🐳 Docker Compose Overview
```
yaml
Copy
Edit
services:
  backend:
    build: ./Backend
    ports:
      - "8080:8080"
    env_file:
      - ./Backend/.env
    depends_on:
      - mongo

  frontend:
    build: ./Frontend
    ports:
      - "8000:80"
    depends_on:
      - backend

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```
🧪 API Testing
Run the Python test script to validate all endpoints:

bash
Copy
Edit
cd Backend
python test_api.py
Ensure the backend is running at http://localhost:8080.
