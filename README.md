# Products REST API

## 1. Project Overview

This project was developed as part of my Codveda Technologies Full-Stack Development Internship.

It is a simple REST API built using Node.js, Express.js, and PostgreSQL. The API allows users to retrieve existing products from the database and create new products through HTTP requests.

The project mainly focuses on database connectivity and implementing GET and POST routes.

## 2. Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv
- Postman (API testing tool)

## 3. Installation

Make sure you have Node.js and PostgreSQL installed on your computer.

### Clone the repository

```bash
git clone https://github.com/yohannesdaniel042/REST-API-PRODUCT.git codveda-rest-api
```

### Navigate into the project folder

```bash
cd codveda-rest-api
```

### Install project dependencies

```bash
npm install
```

Create a `.env` file in the project root and configure your database connection as described in the Environment Variables section.

## 4. Database Setup

This project uses PostgreSQL as its database.

### Create the database

```sql
CREATE DATABASE api_project;
```

Connect to the `api_project` database and create the products table:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    price DECIMAL(10,2)
);
```

### Table Columns

- `id`: Automatically generates a unique ID for each product.
- `product_name`: Stores the product name.
- `price`: Stores the product price with two decimal places.

## 5. Environment Variables

The project uses a `.env` file to store sensitive database connection information, such as the username and password.

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=api_project
DB_PORT=5432
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

Replace `YOUR_DATABASE_PASSWORD` with your own PostgreSQL password.

**Important:** Never upload your actual `.env` file to GitHub. Make sure it is included in your `.gitignore` file.

## 6. Running the Project

Start the server using:

```bash
node server.js
```

The application connects to the PostgreSQL database and starts the Express server after a successful database connection.

The server runs at:

`http://localhost:3000`

## 7. API Endpoints

### GET /products

**Method:** GET

**URL:** `http://localhost:3000/products`

**Description:** Retrieves all products stored in the database.

**Example Response:**

```json
[
    {
        "id": 1,
        "product_name": "Laptop",
        "price": "25000.00"
    }
]
```

**Status Code:** `200 OK`

### POST /products

**Method:** POST

**URL:** `http://localhost:3000/products`

**Description:** Creates a new product and inserts it into the database.

**Request Header:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
    "product_name": "Laptop",
    "price": 25000
}
```

**Successful Response:**

```json
{
    "id": 1,
    "product_name": "Laptop",
    "price": "25000.00"
}
```

**Status Code:** `201 Created`

The API also validates product names and prices. If the submitted data is invalid, it returns:

**Status Code:** `400 Bad Request`

## 8. Author

**Developer:** Yohannes Daniel

Developed as part of the Codveda Technologies Full-Stack Development Internship.