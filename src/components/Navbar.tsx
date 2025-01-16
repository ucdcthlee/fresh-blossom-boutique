import { ShoppingBag, User } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="font-display text-2xl">
            GlowyBloom
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/shop" className="text-foreground/80 hover:text-foreground">Shop All</a>
            <a href="/category/cleansers" className="text-foreground/80 hover:text-foreground">Cleansers</a>
            <a href="/category/toners" className="text-foreground/80 hover:text-foreground">Toners</a>
            <a href="/category/moisturizers" className="text-foreground/80 hover:text-foreground">Moisturizers</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;