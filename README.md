# Client Project Tracker (CPT)

A full-stack web application for managing clients and their project tasks. Admins can add clients, create projects under each client, and track their progress.

**Live Demo:** [https://vitric-client-project-tracking-app.vercel.app/](https://vitric-client-project-tracking-app.vercel.app/)

---

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Variables Setup](#environment-variables-setup)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Deployment](#deployment)
- [Project Structure Details](#project-structure-details)

---

## 🛠️ Technology Stack

### Frontend
- **React** + **Vite** - Modern React build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing

### Database
- **MongoDB Atlas** - Cloud database service

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git**

---

## 📁 Project Structure

```
Vitric Client Project Tracking/
├── backend/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/       # Route controllers
│   │   ├── adminController.js
│   │   ├── clientController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/            # MongoDB schemas
│   │   ├── Admin.js
│   │   ├── Client.js
│   │   └── Project.js
│   ├── routes/            # API routes
│   │   ├── adminRoutes.js
│   │   ├── clientRoutes.js
│   │   └── projectRoutes.js
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── .env               # Backend environment variables
│
└── client/                # Frontend (React + Vite)
    ├── public/
    ├── src/
    │   ├── Admin/
    │   │   └── AdminLogin.jsx
    │   ├── components/    # Reusable components
    │   ├── context/       # React Context (Auth)
    │   ├── Pages/         # Main pages
    │   │   ├── Dashboard.jsx
    │   │   ├── Clients.jsx
    │   │   └── Projects.jsx
    │   ├── utils/         # API service utilities
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env               # Frontend environment variables
```

---

## 🔐 Environment Variables Setup

### Step 1: Backend Environment Variables

Create a `.env` file in the `backend/` folder with the following variables:

```env
MONGODB_URI=mongodb+srv://VitricCPT:VitricCPT123@cluster0.dov59b8.mongodb.net/client-tracker?appName=Cluster0
PORT=5000
NODE_ENV=development
JWT_SECRET=8debbfc6dd78f38e570f4142d4a4ae19ca59cca0e2a271497bf2a39f7ad8433a9161f0508cb9f764711f4f4f4ce0cb897d76a9c42ceac3b0cf7a406382e31df4
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important Notes:**
- **MongoDB Atlas**: To use your own MongoDB Atlas cluster:
  1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a new cluster
  3. Create a database user and get the connection string
  4. Replace the `MONGODB_URI` with your connection string
  5. Add your IP address to the Atlas whitelist (or use `0.0.0.0/0` for all IPs during development)

### Step 2: Frontend Environment Variables

Create a `.env` file in the `client/` folder with the following variable:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

**Note:** If you're running the backend on a different port, update this URL accordingly.

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd "Vitric Client Project Tracking"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required backend packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- express-validator

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

This will install all required frontend packages:
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- recharts
- And other dependencies

### Step 4: Configure Environment Variables

1. **Backend**: Create `.env` file in `backend/` folder (see [Environment Variables Setup](#environment-variables-setup))
2. **Frontend**: Create `.env` file in `client/` folder (see [Environment Variables Setup](#environment-variables-setup))

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
node index.js
or
nodemon
# Or for development with auto-reload:
# nodemon index.js
```

The backend server will run on `http://localhost:5000`

**Verify**: Open `http://localhost:5000` in your browser. You should see:
```json
{
  "message": " Client Project Tracker API",
  "version": "1.0.0",
  "status": "Running",
  "endpoints": {
    "clients": "/api/clients",
    "projects": "/api/projects",
    "admin": "/api/admin"
  }
}
```

### Start Frontend Development Server

Open a new terminal and run:

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

**Note:** Make sure the backend server is running before starting the frontend.

### Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Documentation

All API endpoints are prefixed with `/api`. Base URL: `http://localhost:5000/api`

### Authentication

Some endpoints require authentication. Include the JWT token in the request header:
```
Authorization: Bearer <your-token>
```

### 1. POST /api/clients

**Description:** Add a new client (Admin only)

**Endpoint:** `POST /api/clients`

**Authentication:** Required (JWT token)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+1234567890"}'
```

---

### 2. GET /api/clients

**Description:** Get all clients

**Endpoint:** `GET /api/clients`

**Authentication:** Not required (Public)

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "projects": [...],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

**Usage Example:**
```bash
curl http://localhost:5000/api/clients
```

---

### 3. POST /api/projects

**Description:** Add a new project (Admin only)

**Endpoint:** `POST /api/projects`

**Authentication:** Required (JWT token)

**Request Body:**
```json
{
  "name": "Website Redesign",
  "description": "Complete website redesign project",
  "client": "CLIENT_ID_HERE",
  "status": "Pending",
  "progress": 0,
  "deadline": "2024-12-31",
  "tasks": [
    {
      "name": "Design mockups",
      "completed": false
    }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "...",
    "name": "Website Redesign",
    "description": "...",
    "client": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "status": "Pending",
    "progress": 0,
    "deadline": "...",
    "tasks": [...],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Website Redesign","description":"...","client":"CLIENT_ID","status":"Pending","progress":0,"deadline":"2024-12-31"}'
```

---

### 4. GET /api/projects

**Description:** Get all projects with populated client information

**Endpoint:** `GET /api/projects`

**Authentication:** Not required (Public)

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "name": "Website Redesign",
      "description": "...",
      "client": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "status": "In Progress",
      "progress": 45,
      "deadline": "...",
      "tasks": [...],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

**Usage Example:**
```bash
curl http://localhost:5000/api/projects
```

---

### 5. PUT /api/projects/:id

**Description:** Update project status and other fields (Admin only)

**Endpoint:** `PUT /api/projects/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` - Project ID

**Request Body:**
```json
{
  "name": "Website Redesign",
  "description": "Updated description",
  "client": "CLIENT_ID_HERE",
  "status": "In Progress",
  "progress": 50,
  "deadline": "2024-12-31",
  "tasks": [...]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "_id": "...",
    "name": "Website Redesign",
    "status": "In Progress",
    "progress": 50,
    "client": {...},
    ...
  }
}
```

**Usage Example:**
```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"In Progress","progress":50}'
```

---

### 6. DELETE /api/projects/:id

**Description:** Delete a project (Admin only)

**Endpoint:** `DELETE /api/projects/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` - Project ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Usage Example:**
```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Additional Endpoints

#### Admin Authentication

- **POST /api/admin/login** - Admin login
  ```json
  {
    "email": "admin@example.com",
    "password": "password"
  }
  ```

- **GET /api/admin/profile** - Get admin profile (Protected)

#### Client Management

- **GET /api/clients/:id** - Get single client by ID
- **PUT /api/clients/:id** - Update client (Protected)
- **DELETE /api/clients/:id** - Delete client (Protected)

#### Project Management

- **GET /api/projects/:id** - Get single project by ID
- **GET /api/projects/client/:clientId** - Get projects by client ID

---

## ✨ Features

### Core Features

1. **Dashboard Page**
   - Total clients count
   - Total projects count
   - Project status summary (Active, Completed, Pending)
   - Recent projects display

2. **Clients Page**
   - Add new clients (Admin only)
   - List all clients
   - View client details
   - Edit clients (Admin only)
   - Delete clients (Admin only)
   - Search clients by name, email, or phone

3. **Projects Page**
   - Add new projects (Admin only)
   - List all projects with client information
   - Update project status (Admin only)
   - Update project progress (Admin only)
   - Delete projects (Admin only)
   - Filter projects by status (All, In Progress, Completed, Pending)
   - Search projects by name or client name

4. **Navigation**
   - Responsive navbar
   - Easy navigation between pages
   - Mobile-friendly menu

### Bonus Features ✅

1. **JWT-based Admin Authentication**
   - Secure admin login
   - Protected routes for admin operations
   - Token-based session management

2. **Search & Filter Functionality**
   - Search clients by name, email, or phone
   - Filter projects by status
   - Search projects by name or client name

3. **Charts for Project Status Visualization** (Ready for implementation)
   - Recharts library installed
   - Can be added to Dashboard for visual status representation

4. **Deployment**
   - Frontend deployed on Vercel
   - Live demo available

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is deployed on Vercel:
**Live URL:** [https://vitric-client-project-tracking-app.vercel.app/](https://vitric-client-project-tracking-app.vercel.app/)

**Deployment Steps:**
1. Push code to GitHub
2. Connect GitHub repository to Vercel
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` - Your backend API URL
5. Deploy

### Backend Deployment (Recommended: Render or Railway)

1. Push backend code to GitHub
2. Connect to Render/Railway
3. Set environment variables:
   - `MONGODB_URI`
   - `PORT`
   - `JWT_SECRET`
   - `FRONTEND_URL` (your deployed frontend URL)
4. Deploy

**Note:** Update `VITE_API_URL` in frontend `.env` to point to deployed backend URL.

---

## 🗄️ Database Collections

### Client Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Collection
```javascript
{
  name: String (required),
  description: String (required),
  client: ObjectId (reference to Client),
  status: String (enum: 'Pending', 'In Progress', 'Completed'),
  progress: Number (0-100),
  deadline: Date (required),
  tasks: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Collection (Optional)
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes for admin operations
- CORS configuration
- Input validation
- Error handling

---

## 📝 Project Structure Details

### Backend Architecture
- **MVC Pattern**: Models, Views (API responses), Controllers
- **Middleware**: Authentication, error handling
- **Routes**: Separated route files for each resource
- **Models**: Mongoose schemas with validation

### Frontend Architecture
- **Component-based**: Reusable React components
- **Context API**: Global state management for authentication
- **Service Layer**: Centralized API calls
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user credentials are correct

2. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env` matches frontend URL
   - Check CORS middleware configuration

3. **Token Authentication Fails**
   - Verify `JWT_SECRET` is set correctly
   - Check token expiration
   - Ensure token is sent in `Authorization: Bearer <token>` format

4. **Port Already in Use**
   - Change `PORT` in backend `.env`
   - Update `VITE_API_URL` in frontend `.env` accordingly

---

## 👨‍💻 Development Notes

- **Backend**: Server runs on port 5000 by default
- **Frontend**: Vite dev server runs on port 5173 by default
- **Database**: MongoDB Atlas cluster (free tier available)
- **Authentication**: JWT tokens expire in 30 days

---

## 📄 License

This project is created as part of an internship/hiring task.

---

## 👤 Author

Created for Vitric Internship/Hiring Task

**Company Address:**  
99 West, 5th Floor, Above Aromas Cafe,  
Pratap Nagar Main Road, Nagpur, 440010

---

## 🎯 Assignment Requirements Checklist

- ✅ React + Vite frontend
- ✅ Node.js + Express backend
- ✅ MongoDB with Mongoose
- ✅ All 6 required API endpoints
- ✅ Dashboard page with stats
- ✅ Clients page (Add/List)
- ✅ Projects page (Add/List/Update)
- ✅ Navigation/Navbar
- ✅ JWT-based admin login (Bonus)
- ✅ Search/Filter functionality (Bonus)
- ✅ Charts library installed (Recharts - ready for use)
- ✅ Deployment on Vercel (Bonus)
- ✅ README with setup instructions and API list

---

**Last Updated:** December 2025

For issues or questions, please refer to the API documentation above or check the code comments.