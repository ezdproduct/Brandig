/// <reference types="@vercel/node" />
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { WC_API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;

  if (!WC_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return res.status(500).json({ error: "API credentials are not configured." });
  }

  const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

  try {
    const orderData = req.body;

    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error from WooCommerce API:", responseData);
      throw new Error(responseData.message || 'Failed to create order');
    }

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating WooCommerce order:", error);
    const errorMessage = error instanceof Error ? error.message : 'An internal error occurred.';
    res.status(500).json({ error: errorMessage });
  }
}