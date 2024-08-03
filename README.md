# NxtTrendz-App

Welcome to the E-Commerce Website project, an online shopping platform built with a variety of technologies and featuring essential functionalities, including authentication and authorization, product listing with filters, shopping cart, and checkout. This README file will guide you through the setup, features, and technologies used in this project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Product Listing](#product-listing)
  - [Filters](#filters)
  - [Shopping Cart](#shopping-cart)
  - [Checkout](#checkout)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

The E-Commerce Website is a full-fledged online shopping platform designed to provide users with an immersive shopping experience. This project combines various technologies and features to create a functional and user-friendly e-commerce site.

## Features

### Authentication and Authorization

- **User Login**: Registered users can log in using their email and password.
- **JWT Token**: Authentication is handled using JSON Web Tokens (JWT) to securely manage user sessions.
- **Authorization**: Certain functionalities are restricted to authenticated users, such as adding items to the shopping cart and proceeding to checkout.

### Product Listing

- **Display Products**: Display a wide range of products with essential information, including images, product names, prices, and "Add to Cart" buttons.
- **Category and Rating Filters**: Users can filter products by category and sort them by ratings.

### Filters

- **Category Filter**: Users can select specific product categories to narrow down their search.
- **Rating Filter**: Users can sort products by ratings to find the highest-rated items.

### Shopping Cart

- **Add and Remove Items**: Users can add products to their shopping cart and remove items as needed.
- **Quantity Control**: Users can increase or decrease the quantity of items in their cart.
- **Real-time Updates**: The cart's total cost and item count are updated in real-time as users interact with it.

### Checkout

- **Total Cost Calculation**: Calculate the total cost of items in the cart during the checkout process.
- **Shipping Information**: Users can provide shipping details, including address and payment information.
- **Order Confirmation**: Provide an order confirmation page for users to review their order before finalizing the purchase.

## Technologies Used

This project is built using the following technologies:

- Front-end:
  - React JS
  - JavaScript (ES6+)
  - CSS
  - Bootstrap for styling
  - React Router for routing
  - REST API calls to interact with the server
  - Local Storage for cart management
  - JWT Token for user authentication

- Back-end:
  - Node.js
  - Express.js for creating RESTful APIs
  - SQLite for database storage

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/e-commerce-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce-website
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and visit `http://localhost:3000` to view the project.

## Usage

Once the project is set up, users can:

- Register for an account or log in.
- Browse the product listings, filter products by category and rating.
- Add products to their shopping cart and adjust quantities.
- Proceed to checkout, enter shipping details, and complete the purchase.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the project on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and concise commit messages.
4. Push your changes to your forked repository.
5. Open a pull request, describing the changes you've made.

## License

This project is licensed under the [MIT License](LICENSE), which means you are free to use and modify it for your purposes. Please refer to the license file for more details.

## Acknowledgments

If you used any external resources, libraries, or tutorials during the development of this project, acknowledge and give credit to them here.

Enjoy building and customizing your own e-commerce website using this project as a starting point!

