const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-8 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-bold text-lg mb-2 text-foreground">Dyad Store</h3>
          <p className="text-sm">Your one-stop shop for everything.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Shop</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">New Arrivals</a></li>
            <li><a href="#" className="hover:underline">Best Sellers</a></li>
            <li><a href="#" className="hover:underline">Sale</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 border-t pt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Dyad Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;