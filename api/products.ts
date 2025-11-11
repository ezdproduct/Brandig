import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { WC_API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;

  if (!WC_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return res.status(500).json({ error: "API credentials are not configured on the server." });
  }

  // Encode credentials for Basic Authentication
  const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

  try {
    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/products`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      console.error("Error from WooCommerce API:", await response.text());
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    // Set cache headers to allow caching on the browser and Vercel's CDN
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from WooCommerce:", error);
    res.status(500).json({ error: 'An internal error occurred while fetching products.' });
  }
}