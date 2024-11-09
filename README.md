# Project Management Dashboard

## Project Setup

### Database Setup

For this project I used SQL Express.

#### 1 Install Express

Please download SQL server express from the following link:
https://www.microsoft.com/en-gb/sql-server/sql-server-downloads

Follow the setup wizard.

#### 2 Verify server is running

Open SQl server configuration manager 2022 and under SQL Server Services make sure "SQL Server" has the state "Running".

### Frontend Setup

from the root folder of the project run the following commands:

cd frontend
npm install
npm run start

## Backend Setup

From the root folder of the project run the following commands:

cd backend/productMangementDashboard
dotnet restore
dotnet ef database update
dotnet run

## API Documentation

### Get
#### Method
Get
#### Description
The Get method retrieves all Product entities from the database and returns them as a list.
#### Method Signature
[HttpGet]
public ActionResult<IEnumerable<Product>> Get()
#### Response
200 OK: Returns a list of all products in the database.
#### Example Request
GET /api/products
#### Example Response
[{"productCode":"331s","name":"White top","category":2,"price":12.00,"stockQuantity":108,"dateAdded":"2024-11-07T20:40:56.5427692"}]

### Register Product
#### Method
Post
#### Description
The RegisterProduct method registers a new Product entity by adding it to the database. It validates the input and sets the current date as the DateAdded property before saving the product.
#### Method Signature
[HttpPost]
public ActionResult<Product> RegisterProduct([FromBody] Product productToRegister)
#### Parameters
Product productToRegister: The product entity to be registered, passed in the request body.
#### Response
200 OK: Returns the newly created product.
400 Bad Request: Returns if the input is invalid or null.
#### Example Request
POST /api/products
Content-Type: application/json
{
    "name": "New Product",
    "price": 79.9
    ...
}

