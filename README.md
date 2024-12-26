# Ecommerce App

This is a full-stack ecommerce application built with Node.js, Express, MongoDB for the backend, and React for the frontend.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [API Examples](#api-examples)

## Installation

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/ecommerce-app.git
    cd ecommerce-app/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [backend](http://_vscodecontentref_/0) directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the [frontend](http://_vscodecontentref_/1) directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## API Endpoints

### User Authentication

- **Register User**
    - `POST /api/users/register`
    - Request Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
    - Response: `{ "token": "jwt_token" }`

- **Login User**
    - `POST /api/users/login`
    - Request Body: `{ "email": "john@example.com", "password": "password123" }`
    - Response: `{ "token": "jwt_token", "user": { "id": "user_id", "name": "John Doe", "email": "john@example.com" } }`

### Products

- **Get All Products**
    - `GET /api/products`
    - Response: `[{ "id": "product_id", "name": "Product Name", "price": 100, ... }]`

- **Get Product by ID**
    - `GET /api/products/:id`
    - Response: `{ "id": "product_id", "name": "Product Name", "price": 100, ... }`

- **Add Product**
    - `POST /api/products`
    - Request Body: `{ "name": "Product Name", "price": 100, ... }`
    - Response: `{ "id": "product_id", "name": "Product Name", "price": 100, ... }`

- **Update Product**
    - `PUT /api/products/:id`
    - Request Body: `{ "name": "Updated Product Name", "price": 150, ... }`
    - Response: `{ "id": "product_id", "name": "Updated Product Name", "price": 150, ... }`

- **Delete Product**
    - `DELETE /api/products/:id`
    - Response: `{ "message": "Product deleted" }`

### Cart

- **Add to Cart**
    - `POST /api/cart/cart`
    - Request Body: `{ "productId": "product_id", "quantity": 1, "color": "red", "size": "M" }`
    - Response: `{ "message": "Product added to cart" }`

- **Get Cart Items**
    - `GET /api/cart/getCartItem`
    - Response: `[{ "productId": "product_id", "quantity": 1, "color": "red", "size": "M", ... }]`

- **Remove from Cart**
    - `DELETE /api/cart/remove/:cartItemId/:productId`
    - Response: `{ "message": "Product removed from cart" }`

- **Update Cart Item**
    - `PATCH /api/cart/update/:cartItemId/:productId`
    - Request Body: `{ "quantity": 2, "color": "blue", "size": "L" }`
    - Response: `{ "message": "Cart item updated" }`

    ## API Endpoints

### Banners
- **Create Banner**
    - `POST /api/banners/upload`
    - Request Body: 
    ```json
    {
      "title": "Banner Title",
      "imageUrl": ["image_url1", "image_url2"]
    }
    ```
    - Response: 
    ```json
    {
      "message": "Banner created successfully"
    }
    ```

- **Update Banner**
    - `PUT /api/banners/:id`
    - Request Body: 
    ```json
    {
      "title": "Updated Banner Title",
      "imageUrl": ["updated_image_url1"]
    }
    ```
    - Response: 
    ```json
    {
      "message": "Banner updated successfully"
    }
    ```

- **Get Banners**
    - `GET /api/banners`
    - Response: 
    ```json
    [
      {
        "id": "banner_id",
        "title": "Banner Title",
        "imageUrl": ["image_url1", "image_url2"],
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    ]
    ```

### Checkout

- **Create Checkout**
    - `POST /api/checkout`
    - Request Body: `{ "userId": "user_id", "products": [{ "productId": "product_id", "quantity": 1, "color": "red", "size": "M" }], "address": { "fullName": "John Doe", "phone": "1234567890", "addressLine1": "123 Main St", "city": "City", "state": "State", "pinCode": "123456" }, "paymentMethod": "COD", "totalPrice": 100 }`
    - Response: `{ "message": "Checkout successful", "checkout": { "id": "checkout_id", ... } }`

- **Get Checkout by ID**
    - `GET /api/checkout/orders`
    - Response: `[{ "id": "checkout_id", "userId": "user_id", "products": [{ "productId": "product_id", "quantity": 1, "color": "red", "size": "M" }], "totalPrice": 100, ... }]`

- **Get All Orders**
    - `GET /api/checkout/all`
    - Response: `[{ "id": "checkout_id", "userId": "user_id", "products": [{ "productId": "product_id", "quantity": 1, "color": "red", "size": "M" }], "totalPrice": 100, ... }]`

## Features

- User authentication (register, login)
- Product management (CRUD operations)
- Cart management (add, update, remove items)
- Checkout process
- Order management
- Responsive frontend with React and Tailwind CSS

## API Examples

### Register User

**Request:**
```sh
curl -X POST http://localhost:5000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}'
{
  "token": "jwt_token"
}


**Request:**

curl -X GET http://localhost:5000/api/products

 - Response:

 [
  {
    "id": "product_id",
    "name": "Product Name",
    "price": 100,
    "discountedPrice": 80,
    "stock": 10,
    "image": "image_url",
    "categories": ["Category1", "Category2"],
    "tags": ["Tag1", "Tag2"],
    "brand": "Brand Name",
    "rating": 4.5,
    "reviews": [
      {
        "user": "user_id",
        "rating": 5,
        "comment": "Great product!",
        "date": "2023-10-01T00:00:00.000Z"
      }
    ],
    "colors": ["red", "blue"],
    "sizes": ["S", "M", "L"],
    "features": ["Feature1", "Feature2"],
    "details": "Product details",
    "specifications": {
      "weight": "1kg",
      "dimensions": "10x10x10cm",
      "material": "Plastic",
      "other": "Other specifications"
    }
  }
]


Create Checkout

Request:

curl -X POST http://localhost:5000/api/checkout \
-H "Content-Type: application/json" \
-d '{
  "userId": "user_id",
  "products": [
    {
      "productId": "product_id",
      "quantity": 1,
      "color": "red",
      "size": "M"
    }
  ],
  "address": {
    "fullName": "John Doe",
    "phone": "1234567890",
    "addressLine1": "123 Main St",
    "city": "City",
    "state": "State",
    "pinCode": "123456"
  },
  "paymentMethod": "COD",
  "totalPrice": 100
}'

- Response:

{
  "message": "Checkout successful",
  "checkout": {
    "id": "checkout_id",
    "userId": "user_id",
    "products": [
      {
        "productId": "product_id",
        "quantity": 1,
        "color": "red",
        "size": "M"
      }
    ],
    "totalPrice": 100,
    "address": {
      "fullName": "John Doe",
      "phone": "1234567890",
      "addressLine1": "123 Main St",
      "addressLine2": "",
      "city": "City",
      "state": "State",
      "pinCode": "123456"
    },
    "paymentMethod": "COD",
    "status": "Pending",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}


