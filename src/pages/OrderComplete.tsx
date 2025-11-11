import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderComplete = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-16">
        <div className="text-center max-w-lg mx-auto">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
          <p className="text-muted-foreground mb-6">
            Your order <span className="font-semibold text-foreground">#{id}</span> has been placed successfully.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderComplete;