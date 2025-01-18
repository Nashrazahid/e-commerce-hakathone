# Avion technical foundation
# Backend Documentation for E-commerce Website

## Overview
This document outlines the backend implementation details for the e-commerce website developed on [date/project details].

## Technologies Used
- **Backend Framework:** Node.js with Express.js
- **Database:** Sanity CMS
- **Authentication:** JWT-based authentication
- **Deployment:** Hosted via Sanity

## API Endpoints
The following API endpoints have been set up to handle various operations:

### User Management
- **POST /api/register**: Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User registered successfully",
      "userId": "ObjectId"
    }
    ```
- **POST /api/login**: User login and JWT token generation.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "JWT-Token"
    }
    ```
- **GET /api/user**: Fetch user profile details (requires authentication).
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer <JWT-Token>"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "email": "string"
    }
    ```

### Product Management
- **GET /api/products**: Fetch all products.
  - **Response:**
    ```json
    [
      {
        "_id": "ObjectId",
        "name": "string",
        "description": "string",
        "price": "number",
        "stock": "number"
      }
    ]
    ```
- **GET /api/products/:id**: Fetch a single product by ID.
  - **Response:**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number"
    }
    ```
- **POST /api/products**: Add a new product (Admin only).
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Product added successfully",
      "productId": "ObjectId"
    }
    ```

### Order Management
- **POST /api/orders**: Place a new order.
  - **Request Body:**
    ```json
    {
      "userId": "ObjectId",
      "products": [
        { "productId": "ObjectId", "quantity": "number" }
      ]
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Order placed successfully",
      "orderId": "ObjectId"
    }
    ```
- **GET /api/orders**: Fetch all orders (Admin only).
  - **Response:**
    ```json
    [
      {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "products": [
          { "productId": "ObjectId", "quantity": "number" }
        ],
        "totalPrice": "number",
        "status": "string",
        "createdAt": "Date"
      }
    ]
    ```

## Database Structure
- **Users Collection:**
  ```json
  {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "password": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  ```
- **Products Collection:**
  ```json
  {
    "_id": "ObjectId",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  ```
- **Orders Collection:**
  ```json
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "products": [
      { "productId": "ObjectId", "quantity": "number" }
    ],
    "totalPrice": "number",
    "status": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  ```


## Deployment
The website is hosted on [Sanity] with CI/CD pipelines set up for seamless updates.

## Future Enhancements
- Implement role-based access control for admins and users.
- Add advanced filtering options for products.
- Integrate payment gateway APIs for secure transactions.

---
This document serves as a guide to understanding and working with the backend of the e-commerce website. For questions or contributions, please refer to the project repository or contact the development team.


