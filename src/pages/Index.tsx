import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const sampleProducts = [
  { id: 1, name: "Modern Wireless Headphones", price: 129.99, image: "https://placehold.co/600x400/black/white?text=Headphones" },
  { id: 2, name: "Classic Leather Watch", price: 249.50, image: "https://placehold.co/600x400/gray/white?text=Watch" },
  { id: 3, name: "Smart Fitness Tracker", price: 79.00, image: "https://placehold.co/600x400/blue/white?text=Tracker" },
  { id: 4, name: "Ergonomic Office Chair", price: 350.00, image: "https://placehold.co/600x400/green/white?text=Chair" },
  { id: 5, name: "Portable Bluetooth Speaker", price: 59.99, image: "https://placehold.co/600x400/orange/white?text=Speaker" },
  { id: 6, name: "Minimalist Desk Lamp", price: 45.00, image: "https://placehold.co/600x400/yellow/black?text=Lamp" },
  { id: 7, name: "Insulated Travel Mug", price: 25.00, image: "https://placehold.co/600x400/purple/white?text=Mug" },
  { id: 8, name: "Professional Camera Drone", price: 899.99, image: "https://placehold.co/600x400/red/white?text=Drone" },
];

const Index = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sampleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
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