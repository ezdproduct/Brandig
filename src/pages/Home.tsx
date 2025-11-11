import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, WCProduct } from "@/lib/wooClient";

const Home = () => {
  const { data: products, isLoading, isError, error } = useQuery<WCProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
        
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500">
            <p>Failed to load products.</p>
            <p className="text-sm text-muted-foreground">{(error as Error)?.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image: product.images[0]?.src || 'https://placehold.co/600x400'
              }} 
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;