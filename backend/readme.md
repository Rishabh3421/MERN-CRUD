# Backend API Documentation

This document outlines the API endpoints and functionality for the backend service.

## Authentication

### Register User
- **Route:** `POST /auth/register`
- **Description:** Register a new user
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Success (201): User registered successfully
  - Error (400): Missing fields or user already exists
  - Error (500): Internal server error

### Login User
- **Route:** `POST /auth/login` 
- **Description:** Authenticate existing user
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Success (200): Login successful, returns user data
  - Error (400): Missing fields
  - Error (403): Wrong password
  - Error (404): User not found
  - Error (500): Internal server error

## Products

### Create Product
- **Route:** `POST /products/create/:userID`
- **Description:** Create a new product
- **Parameters:**
  - userID: ID of user creating the product
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string", 
    "price": "number",
    "image": "string"
  }
  ```
- **Response:**
  - Success (201): Product created successfully
  - Error (400): Missing required fields
  - Error (500): Internal server error

### Update Product
- **Route:** `PUT /products/update`
- **Description:** Update an existing product
- **Request Body:**
  ```json
  {
    "id": "string",
    "title": "string (optional)",
    "description": "string (optional)",
    "price": "number (optional)",
    "image": "string (optional)"
  }
  ```
- **Response:**
  - Success (200): Product updated successfully
  - Error (400): Product ID required
  - Error (404): Product not found
  - Error (500): Internal server error

## Models

### User Model
- **Fields:**
  - name (String, required)
  - email (String, required, unique)
  - password (String, required)
  - role (String, enum: ["user", "admin"], default: "user")
  - timestamps: true

### Product Model
- **Fields:**
  - title (String, required)
  - description (String, required)
  - price (Number, required)
  - image (String, required)
  - UserID (ObjectId, required, ref: "User")
  - timestamps: true
