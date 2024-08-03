
# E-commerce Frontend

This repository contains the frontend code for an e-commerce platform built using React, Stripe for payment integration, and deployed on Netlify.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js v20.13.1
- pnpm (Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Vigneshkumar-D/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install --no-frozen-lockfile
   ```

## Running the Project

To start the development server:

```bash
pnpm start
```

The application will be available at `http://localhost:3000`.

## Deployment

This project is set up for deployment on Netlify. Follow these steps to deploy:

1. **Create a `netlify.toml` file** in the root of your project with the following content:

   ```toml
   [build]
   command = "pnpm install --no-frozen-lockfile && pnpm build"
   publish = "build"
   
   [build.environment]
   NODE_VERSION = "20.13.1"
   ```

2. **Connect your repository to Netlify** and follow the deployment steps on the Netlify dashboard.

3. If you encounter issues with dependencies, ensure your `pnpm` version matches the one specified in the `netlify.toml` file.

## Project Structure

```
ecommerce-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Payments/
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── index.css
│   │   │   └── Payments.jsx
│   │   ├── ProductCard/
│   │   │   ├── index.jsx
│   │   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── ...
├── .gitignore
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Usage

### Payments Integration

This project includes integration with Stripe for handling payments. The `Payments` component provides options for various payment methods including credit/debit cards and digital wallets like Google Pay and Apple Pay.

#### Example Usage

```jsx
import React from 'react';
import { Elements, useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';

const stripePromise = loadStripe('your-public-key-here'); // Your Stripe public key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Process paymentMethod.id on the server
    }
  };

  const handlePaymentRequest = async () => {
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: 1000, // e.g. $10.00
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const result = await paymentRequest.canMakePayment();

    if (result) {
      const elements = stripe.elements();
      const prButton = elements.create('paymentRequestButton', {
        paymentRequest,
      });

      prButton.mount('#payment-request-button');
      paymentRequest.on('paymentmethod', async (event) => {
        // Confirm payment on the server
        const { error } = await stripe.confirmCardPayment(
          'client-secret-from-your-server',
          { payment_method: event.paymentMethod.id }
        );

        if (error) {
          console.error(error);
        } else {
          event.complete('success');
        }
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement id="card-element" className="card-element" />
        </div>
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      <div id="payment-request-button"></div>
    </div>
  );
};

const Payments = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="payments-container">
        <h2>Make a Payment</h2>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Payments;
```

### Registration Component

You can create a registration component to handle user sign-ups.

```jsx
import React, { useState } from 'react';
import './index.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License.
```

Make sure to replace placeholder values (like `"your-public-key-here"`) with actual values from your Stripe account or other relevant services. This `README.md` provides a comprehensive overview of the project, including setup, usage, and deployment instructions.
