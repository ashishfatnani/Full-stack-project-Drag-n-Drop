# Drag and Drop Form Builder Application

This is a full-stack **Drag-and-Drop Form Builder** application that allows users to create, edit, view, and delete forms. The project is built using **React.js** for the frontend and **Node.js/Express.js** for the backend, with JWT authentication implemented for secure access.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Future Enhancements](#future-enhancements)

---

## Features

### Backend

- JWT-based authentication (Login & Register).
- CRUD operations for forms (Create, Read, Update, Delete).
- Form ownership validation to ensure users can only edit/delete their own forms.
- MongoDB database to store forms and user details.
- Token verification middleware.

### Frontend

- User-friendly drag-and-drop interface for form creation.
- Form fields include text inputs, emails, numbers, etc.
- Users can register, login, and manage their forms.
- Protected routes ensure only authenticated users access specific pages.
- Integration with the backend APIs for form management.

---

## Technologies Used

### Backend:

- **Node.js** with **Express.js** - Backend framework.
- **MongoDB** - Database to store user and form data.
- **Mongoose** - ODM for MongoDB.
- **jsonwebtoken** - Authentication using JWT.
- **bcrypt.js** - Password hashing for secure storage.
- **cors** - Enable cross-origin requests.

### Frontend:

- **React.js** - Frontend library.
- **React Router** - Routing for navigation.
- **Axios** - HTTP requests to communicate with the backend.
- **Ant Design** - UI components for better user experience.
- **CSS** - Custom styling for pages.

---

## Screenshots

Add relevant screenshots here:

- **Login Page**
- **Registration Page**
- **Dashboard with Forms**
- **Drag-and-Drop Form Builder**

---

## Folder Structure

### Backend (`dnd-backend`)

dnd-backend/ ├── controllers/ │ ├── authController.js │ └── formController.js ├── models/ │ ├── User.js │ └── Form.js ├── routes/ │ ├── authRoutes.js │ └── formRoutes.js ├── middleware/ │ └── authMiddleware.js ├── config/ │ └── db.js ├── .env ├── server.js └── package.json

### Frontend (`dnd-frontend`)

dnd-frontend/ ├── src/ │ ├── api/ │ │ └── apiService.js │ ├── components/ │ │ ├── LoginForm.js │ │ ├── RegisterForm.js │ │ ├── FormBuilder.js │ │ └── ProtectedRoute.js │ ├── pages/ │ │ ├── Dashboard.js │ │ └── Home.js │ ├── App.js │ ├── index.js │ └── App.css ├── package.json └── public/ └── index.html
