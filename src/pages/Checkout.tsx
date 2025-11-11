import { useCartStore } from "@/store/cartStore";
import { createOrder, WCNewOrder } from "@/lib/wooClient";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate(`/order-complete/${data.id}`);
    },
    onError: (error) => {
      toast.error(`Checkout failed: ${error.message}`);
    },
  });

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData: WCNewOrder = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market St",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555",
      },
      shipping: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market St",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
      },
      line_items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    mutation.mutate(orderData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">John Doe</p>
                <p>969 Market St</p>
                <p>San Francisco, CA 94103</p>
                <p>United States</p>
                <p className="mt-2 text-sm text-muted-foreground">(Using demo data)</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {mutation.isError && (
                  <Alert variant="destructive" className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {mutation.error.message}
                    </AlertDescription>
                  </Alert>
                )}
                <Button 
                  className="w-full mt-6" 
                  disabled={mutation.isPending || items.length === 0}
                  onClick={handleCheckout}
                >
                  {mutation.isPending ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;