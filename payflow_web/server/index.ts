import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET!, { apiVersion: '2024-06-20' });

app.post('/api/topup', async (req, res) => {
  const pi = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    automatic_payment_methods: { enabled: true }
  });
  res.json({ clientSecret: pi.client_secret });
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));