import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
export const processPayment = catchAsyncErrors(async (req, res, next) => {
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'ron',
    
            metadata: { integration_check: 'accept_a_payment' }
        });
    
        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        })
    
    }
)

// Send stripe API Key   =>   /api/v1/stripeapi
export const sendStripApi = catchAsyncErrors(async (req, res, next) => {
        
            res.status(200).json({
                stripeApiKey: process.env.STRIPE_API_KEY
            })
        
        }
    )