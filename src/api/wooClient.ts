// Define the structure of a product from the WooCommerce API
export interface WCProduct {
  id: number;
  name: string;
  price: string;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  // Add other properties as needed
}

/**
 * Fetches all products from our secure serverless proxy.
 * @returns A promise that resolves to an array of products.
 */
export const getProducts = async (): Promise<WCProduct[]> => {
  const response = await fetch('/api/products');
  
  if (!response.ok) {
    // You can add more sophisticated error handling here
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || 'Failed to fetch products');
  }
  
  return response.json();
};

/**
 * Fetches a single product by its ID.
 * Note: This requires creating a corresponding serverless function e.g., /api/product?id=[productId]
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to a single product.
 */
export const getProduct = async (id: number): Promise<WCProduct> => {
  const response = await fetch(`/api/product?id=${id}`); // Assuming this endpoint will be created
  
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || `Failed to fetch product with id ${id}`);
  }
  
  return response.json();
};