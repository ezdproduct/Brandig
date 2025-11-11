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
  description: string;
  // Add other properties as needed
}

/**
 * Fetches all products from our secure serverless proxy.
 * @returns A promise that resolves to an array of products.
 */
export const getProducts = async (): Promise<WCProduct[]> => {
  const response = await fetch('/api/products');
  
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || 'Failed to fetch products');
  }
  
  return response.json();
};

/**
 * Fetches a single product by its ID using our secure serverless proxy.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to a single product.
 */
export const getProduct = async (id: string | undefined): Promise<WCProduct> => {
  if (!id) {
    throw new Error("Product ID is required.");
  }
  const response = await fetch(`/api/product?id=${id}`);
  
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || `Failed to fetch product with id ${id}`);
  }
  
  return response.json();
};