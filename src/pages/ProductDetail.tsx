import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, WCProduct } from "@/lib/wooClient";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useQuery<WCProduct>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="container my-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <div className="text-center py-10">Failed to load product details.</div>;
  }
  
  const productDataForCart = {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price),
    image: product.images[0]?.src || 'https://placehold.co/600x400'
  };

  const handleAddToCart = () => {
    addItem(productDataForCart);
    toast.success(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container my-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-6 hover:underline">
          <ArrowLeft size={16} />
          Back to products
        </Link>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <img
            src={product.images[0]?.src || 'https://placehold.co/600x400'}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary mb-4">${parseFloat(product.price).toFixed(2)}</p>
            <div
              className="prose prose-sm max-w-none text-muted-foreground mb-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <Button size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;