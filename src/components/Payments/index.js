import './index.css'
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import Header from '../Header';

const stripePromise = loadStripe('pk_test_51Pir7lRrnSc5vbApGqSJk2gnL7YOTlZU8h0n8tWsBLNvTprVKxruRB5J6cUKLudKOH0rthfRoqaU3rEspo9x4sHm00tWPnVpKT');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        } else {
            console.log(paymentMethod);
            await processPayment(paymentMethod.id);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
                <label htmlFor="card-element">Credit or debit card</label>
                <CardElement id="card-element" className="card-element" />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button disabled={isProcessing || !stripe || !elements} className="submit-button">
                {isProcessing ? 'Processing…' : 'Pay'}
            </button>
        </form>
    );
};

const Payments = () => {
    return (
        <div style={{minHeight:'100vh'}}>
            <Header />
            <Elements className='payments-main-container' stripe={stripePromise}>
                <div className="payments-container">
                    <h2>Make a Payment</h2>
                    <CheckoutForm />
                </div>
            </Elements>
        </div>
    );
};

export default Payments;
