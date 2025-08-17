'use client'
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function TopUpForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/success' }
    });
    if (error) alert(error.message);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      <PaymentElement />
      <button disabled={!stripe} className="bg-blue-600 px-4 py-2 rounded text-white">Add Money</button>
    </form>
  );
}

export default function TopUpPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/topup', { method: 'POST' }).then(r => r.json()).then(d => setClientSecret(d.clientSecret));
  }, []);
  if (!clientSecret) return <div>Loading...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <TopUpForm clientSecret={clientSecret} />
    </Elements>
  );
}