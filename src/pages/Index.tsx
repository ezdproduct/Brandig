import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, WCProduct } from "@/lib/wooClient";

const Index = () => {
  const { data: products, isLoading, isError, error } = useQuery<WCProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts, // Use the new centralized API function
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="text-center py-16 md:py-24 bg-secondary">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Summer Collection is Here</h1>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              Discover the latest trends and refresh your style for the new season.
            </p>
            <Button size="lg" className="mt-8">Shop Now</Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
            
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;