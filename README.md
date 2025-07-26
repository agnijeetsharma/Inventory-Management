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

- Add a new product
- Update product quantity
- Paginated listing of products
- Optional fields: `image_url`, `description`

### 📄 API Documentation

- Available at: `http://localhost:8080/api-docs`
- Implemented using Swagger (OpenAPI v3)

---

## 🏗️ Project Structure

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



---

## ⚙️ Running Locally (with Docker)

### 📋 Requirements

- Docker & Docker Compose installed

---

### 🔧 Step-by-Step

1. **Clone the Repository**

```bash
git clone https://github.com/agnijeetsharma/Inventory-Management.git
cd Inventory-Management

Set Environment Variables

Update Backend/.env file as follows:

PORT=8080
MONGODB_URI=mongodb://mongo:27017/ims
ACCESS_TOKEN_SECRET=your_secret_access
REFRESH_TOKEN_SECRET=your_secret_refresh
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:8000
No .env is required for frontend unless you use custom API URLs.

Run Everything

docker-compose up --build

🔍 API Endpoints
Endpoint	Method	Description
/api/v1/auth/register	POST	Register new user
/api/v1/auth/login	POST	Login user
/api/v1/products	GET	Get products with pagination
/api/v1/products	POST	Add new product
/api/v1/products/:id/quantity	PUT	Update quantity

📘 Swagger Docs: http://localhost:8080/api-docs

🌐 Frontend
Runs on: http://localhost:8000

Built with Vite + React + Tailwind CSS

Features:

Authenticated access

Add product form

Quantity update

Pagination UI

🐳 Docker Compose Overview
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
🧪 API Testing
Use the provided test_api.py script in the Backend folder to test endpoints.


python test_api.py

Make sure server is running on localhost:8080.

